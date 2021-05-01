import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  hintHeatmapFull,
  hintHeatmapZone,
  markersClear,
  multipleHelp,
  setWinnerUser,
  setLoserUser,
  setBlocked,
  hintShowBest,
  hintBestMoves,
  territoryDeadShow,
  getWorstEnemyStep,
  hintHeatmapQuarter,
} from '../../store/Board/actions'

import { calculatePowers } from '../../helpers/groupPower'
import { formatTurn } from '../../helpers/rightBar'

import { client, token } from '../../Socket.js'
import {
  HEATMAP_FULL,
  HEATMAP_QUARTER,
  HEATMAP_ZONE_QUARTER,
  SHOULD_PASS,
} from './components/Help/types'
import deadstones from '@sabaki/deadstones'

import { clearGameId } from '../../store/GameCreate/actions'

import { GameContainer } from './GameContainer'
import { RightPanel } from './RightPanel'
import { Alert } from './components/Alert'
import { prepareProbability } from '../../helpers/prepareProbability'
import { coord2yx } from '../../helpers/coords'
import { ButtonCustom } from '../../components/ButtonCustom'

deadstones.useFetch('deadstones_bg.wasm')

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: 0 auto;
  height: 100vh;
`
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 99;
`

const mapMap = map => {
  let coords = {}
  let alpha = 'ABCDEFGHJKLMNOPQRSTUV'
  map.forEach((row, rowId) =>
    row.forEach((cell, colId) => {
      if (cell !== 0) {
        let sign = alpha[rowId]
        coords[`${sign}${colId + 1}`] = cell === -1 ? 'white' : 'black'
      }
    })
  )
  return coords
}

const xyDist = (x1, x2, y1, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

const GameBoard = ({ history }) => {
  const game_id = useSelector(state => state.createGame.id)
  const blocked = useSelector(state => state.board.blocked)
  const mapStones = useSelector(state => state.board.mapStones)

  const [alert, setAlert] = useState(null)
  const [hintsShow, setHintsShow] = useState(false)
  const [enemyPass, setEnemyPass] = useState(false)
  const [lastMarkers, setLastMarkers] = useState(null)
  const [helpType, setHelpType] = useState('')
  const [activeHelpId, setActiveHelpId] = useState('')
  const [multipleType, setMultipleType] = useState(false)
  const [multipleHint, setMultipleHint] = useState({})
  const [multipleCount, setMultipleCount] = useState([])
  const [turns, setTurns] = useState([])
  const [selfColor, setSelfColor] = useState('white')
  const [currentMap, setCurrentMap] = useState([[]])
  const [self, setSelf] = useState({}) // self player object
  const [opponent, setOpponent] = useState({}) // opponent player object
  const [selfStonesCount, setSelfStonesCount] = useState(0)
  const [opponentStonesCount, setOpponentStonesCount] = useState(0)
  // @todo
  // eslint-disable-next-line
  const [selfDiedCount, setSelfDiedCount] = useState(0)
  // eslint-disable-next-line
  const [opponentDiedCount, setOpponentDiedCount] = useState(0)
  const [currentColor, setCurrentColor] = useState('white')
  const [times, setTimes] = useState({ playerOne: 0, playerTwo: 0 })
  const [showTerritory, setShowTerritory] = useState(false)
  const [showDead, setShowDead] = useState(false)
  const [probabilityMap, setProbabilityMap] = useState([[]])
  const [groupPowers, setGroupPowers] = useState([[]])
  const [pSum, setPSum] = useState('0%')
  const dispatch = useDispatch()

  const coordinates = mapMap(currentMap)

  useEffect(() => {
    let selfStones = 0
    let oppStones = 0
    const selfValue = selfColor === 'black' ? 1 : -1
    currentMap.forEach(row =>
      row.forEach(value => {
        if (value === selfValue) {
          selfStones += 1
        } else if (value !== 0) {
          oppStones += 1
        }
      })
    )
    if (selfStones < selfStonesCount) {
      setSelfDiedCount(n => n + (selfStonesCount - selfStones))
    }
    if (oppStones < opponentStonesCount) {
      setOpponentDiedCount(n => n + (opponentStonesCount - oppStones))
    }
    setSelfStonesCount(selfStones)
    setOpponentStonesCount(oppStones)

    deadstones
      .getProbabilityMap(currentMap, 150)
      .then(probabilities =>
        setProbabilityMap(prepareProbability(probabilities, currentMap))
      )
    // eslint-disable-next-line
  }, [currentMap])

  useEffect(() => {
    if (showDead) setGroupPowers(calculatePowers(currentMap))
  }, [currentMap, showDead])

  useEffect(() => {
    if (Object.keys(multipleHint).length === multipleCount) {
      dispatch(multipleHelp())
      deleteCoordinates(multipleHint)
      setHelpType('')
      setMultipleHint({})
    }
    // eslint-disable-next-line
  }, [multipleHint, multipleCount])

  if (game_id === null) {
    history.push('/')
  }

  useEffect(() => {
    if (game_id) {
      client.send(JSON.stringify([5, 'go/game']))
      client.send(
        JSON.stringify([
          7,
          'go/game',
          {
            command: 'auth',
            token: localStorage.getItem('GoGameToken'),
            game_id: game_id,
          },
        ])
      )
    }
    // eslint-disable-next-line
  }, [])

  client.onmessage = function (e) {
    setEnemyPass(false)
    if (typeof e.data === 'string') {
      let jsonData = JSON.parse(e.data)
      if (jsonData.error && jsonData.error.startsWith('illegal move')) {
        setAlert({ children: <h1>{jsonData.error}</h1> })
        setCurrentColor(currentColor === 'white' ? 'black' : 'white')
      }
      if (jsonData.payload) {
        if (jsonData.payload.currentMap) {
          const currentMap = jsonData.payload.currentMap
          setCurrentMap(currentMap)
        }
        if (jsonData.payload.type === 'currentMap') {
          setSelf(jsonData.payload.you)
          setOpponent(jsonData.payload.opponent)
        }
        if (jsonData.payload.player) {
          if (typeof jsonData.payload.player === 'string') {
            setSelfColor(jsonData.payload.player === 'w' ? 'white' : 'black')
          }
        }
        if (jsonData.payload.type && jsonData.payload.type === 'endGame') {
          let winner = jsonData.payload.winnerPlayer
          let loser = jsonData.payload.loserPlayer
          winner.finalScore = jsonData.payload.finalScore
          dispatch(setWinnerUser(winner))
          dispatch(setLoserUser(loser))
          history.push('/', { from: 'Win' })
          dispatch(clearGameId())
        }
        if (jsonData.payload.turn) {
          setCurrentColor(jsonData.payload.turn)
        }
        if (jsonData.payload.move) {
          setTurns(turns => [...turns, formatTurn(jsonData)])
        }
        if (jsonData.payload.type === 'newTurn') {
          setLastMarkers({ [jsonData.payload.place]: 'last_pos_marker' })
        }
        if (jsonData.payload.moveType === 'pass') {
          if (currentColor !== selfColor) {
            setEnemyPass(true)
          }
        }
        if (
          jsonData.payload.turnBlackEndedAt &&
          jsonData.payload.turnWhiteEndedAt
        ) {
          setTimes({
            playerOne: Math.floor(
              (Number(jsonData.payload.turnBlackEndedAt) -
                new Date().getTime()) /
                1000
            ),
            playerTwo: Math.floor(
              (Number(jsonData.payload.turnWhiteEndedAt) -
                new Date().getTime()) /
                1000
            ),
          })
        }
      }
    }
    dispatch(setBlocked(false))
  }

  const move = (coord, ignoreAlert = false) => {
    if (currentColor !== selfColor) return
    const [y, x] = coord2yx(coord)
    let showAlert = false
    const selfColorInt = selfColor === 'black' ? 1 : -1
    if (!ignoreAlert && currentMap[y][x] === 0) {
      const newMap = currentMap.map(row => [...row])
      newMap[y][x] = selfColorInt
      const powers = calculatePowers(newMap, true).map(row =>
        row.map(power => power === 1)
      )
      let minDist = 1000
      const size = powers.length
      for (let px = 0; px < size; px++) {
        for (let py = 0; py < size; py++) {
          if (!powers[py][px]) continue
          if (currentMap[py][px] !== selfColorInt) continue
          const d = xyDist(px, x, py, y)
          if (d < minDist) minDist = d
        }
      }
      showAlert = minDist <= 2
    }
    if (showAlert) {
      setAlert({
        children: (
          <>
            <h2>Nearly with your move will be akami</h2>
            <ButtonCustom
              onClick={() => {
                setCurrentColor(selfColor)
                setAlert(null)
              }}
            >
              Cancel
            </ButtonCustom>
          </>
        ),
        okCallback: () => move(coord, true),
        close: () => setAlert(null),
      })
      return
    }
    dispatch(markersClear())
    setActiveHelpId(null)
    setHelpType('')
    dispatch(setBlocked(true))
    client.send(
      JSON.stringify([
        7,
        'go/game',
        {
          command: 'move',
          token: token,
          place: coord.toString().toLowerCase(),
          game_id: game_id,
        },
      ])
    )
  }

  const passFn = () => {
    dispatch(markersClear())
    setActiveHelpId(null)
    setHelpType('')
    dispatch(setBlocked(true))
    client.send(
      JSON.stringify([
        7,
        'go/game',
        { command: 'pass', token: token, game_id: game_id },
      ])
    )
  }

  const resignFn = () => {
    dispatch(setBlocked(true))
    client.send(
      JSON.stringify([
        7,
        'go/game',
        { command: 'resign', token: token, game_id: game_id },
      ])
    )
  }

  const handleHelp = ({ type, multipleHandleCount, id, count, quarter }) => {
    dispatch(markersClear())
    setMultipleHint({})
    setActiveHelpId(id)
    if (type === 'single') {
      dispatch(setBlocked(true))
      setHelpType('single')
      dispatch(hintBestMoves(game_id, count))
    }
    if (type === 'multiple') {
      setHelpType('multiple')
      setMultipleType('multiple')
      setMultipleCount(multipleHandleCount)
    }
    if (type === 'map') {
      dispatch(setBlocked(true))
      setHelpType('map')
      switch (id) {
        case HEATMAP_FULL:
          dispatch(hintHeatmapFull(game_id))
          break
        case HEATMAP_ZONE_QUARTER:
          dispatch(hintHeatmapZone(game_id, true))
          break
        case HEATMAP_QUARTER:
          dispatch(hintHeatmapQuarter(game_id, quarter))
          break
        default:
          console.error('invalid id', id)
      }
    }
    if (type === 'score') {
      dispatch(setBlocked(true))
      switch (id) {
        case SHOULD_PASS:
          dispatch(getWorstEnemyStep(game_id, 'pass'))
          break
        default:
          console.error('invalid id', id)
      }
    }
  }

  useEffect(() => {
    let temp_white_sum = 0
    let temp_all_sum = 0
    probabilityMap.forEach(row =>
      row.forEach(col => {
        temp_white_sum += col < 0 ? Math.abs(col) : 0
        temp_all_sum += Math.abs(col)
      })
    )
    setPSum(
      temp_all_sum !== 0 ? `${(temp_white_sum / temp_all_sum) * 100}%` : '0%'
    )
    if (!hintsShow) {
      dispatch(markersClear())
      dispatch(
        territoryDeadShow(
          probabilityMap.map((row, rowId) =>
            row.map((col, colId) =>
              currentMap[rowId][colId] === 0 && col !== 0
                ? col + 0.35 * (col / Math.abs(col))
                : 0
            )
          ),
          showTerritory,
          groupPowers,
          showDead
        )
      )
    }
    // eslint-disable-next-line
  }, [probabilityMap, showTerritory, groupPowers, showDead])

  const deleteCoordinates = hints => {
    for (const key in coordinates) {
      for (const keyHint in hints) {
        if (key === keyHint) {
          delete coordinates[key]
        }
      }
    }
  }

  const setMultipleHintFunc = val => {
    if (Object.keys(mapStones).length === multipleCount - 2) {
      dispatch(markersClear())
      setActiveHelpId(null)
      setMultipleHint({})
      setHelpType('')
      dispatch(setBlocked(true))
      dispatch(
        hintShowBest(game_id, Object.keys({ ...mapStones, [val]: 'circle' }))
      )
    } else {
      setMultipleHint(mapStones)
    }
  }

  return (
    <Wrapper>
      {blocked && <Wrap />}
      <GameContainer
        lastMarkers={lastMarkers}
        hint={hintsShow}
        setHint={setHintsShow}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        yourColor={selfColor}
        stepColor={currentColor}
        helpType={helpType}
        setMultipleHint={val => setMultipleHintFunc(val)}
        multipleHint={multipleHint}
        multipleCount={multipleCount}
        coordinates={coordinates}
        setStonePosition={move}
        setHelpType={setHelpType}
        setMultipleType={setMultipleType}
        setActiveHelpId={setActiveHelpId}
        classNames={{}}
        self={self}
        times={times}
        opponent={opponent}
        mapStones={mapStones}
        passFn={passFn}
        resignFn={resignFn}
        setShowDead={setShowDead}
        setShowTerritory={setShowTerritory}
        probabilityMap={probabilityMap}
        pSum={pSum}
        showTerritory={showTerritory}
        showDead={showDead}
      />
      <RightPanel
        hint={hintsShow}
        you={self}
        opponent={opponent}
        stepColor={currentColor}
        yourColor={selfColor}
        turns={turns}
        enemyPass={enemyPass}
        stepMain={selfStonesCount}
        stepTwo={opponentStonesCount}
        currentColor={selfColor}
        setHint={setHintsShow}
        handleHelp={handleHelp}
        helpType={helpType}
        multipleType={multipleType}
        activeHelpId={activeHelpId}
        times={times}
        scores={currentColor !== selfColor ? false : true}
        currentMap={currentMap}
      />
      {alert && <Alert {...alert} close={() => setAlert(null)} />}
    </Wrapper>
  )
}

export default GameBoard
