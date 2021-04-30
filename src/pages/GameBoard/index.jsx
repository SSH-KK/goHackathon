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
  setScoresWinner,
  hintBestMoves,
} from "../../store/Board/actions"

import { formatTurn } from "../../helpers/rightBar"

import { client, token } from "../../Socket.js"
import { HEATMAP_FULL, HEATMAP_ZONE_QUARTER } from "./components/Help/types"
import deadstones from "@sabaki/deadstones"

import { clearGameId } from "../../store/GameCreate/actions"

import { GameContainer } from "./GameContainer"
import { RightPanel } from "./RightPanel"

deadstones.useFetch("deadstones_bg.wasm")

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
  z-index: 99999999;
`

const GameBoard = ({ history }) => {
  const game_id = useSelector(state => state.createGame.id)
  const blocked = useSelector(state => state.board.blocked)
  const mapStones = useSelector(state => state.board.mapStones)

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
  const [coordinates, setCoordinates] = useState({})
  const [self, setSelf] = useState({}) // self player object
  const [opponent, setOpponent] = useState({}) // opponent player object
  const [selfStonesCount, setSelfStonesCount] = useState(0)
  const [opponentStonesCount, setOpponentStonesCount] = useState(0)
  const [currentPlayerColor, setCurrentPlayerColor] = useState('white')
  const [times, setTimes] = useState({ playerOne: 0, playerTwo: 0 })
  const dispatch = useDispatch()

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
      if (jsonData.payload) {
        if (jsonData.payload.currentMap) {
          const currentMap = jsonData.payload.currentMap
          // const startTime = Date.now()
          // deadstones.getProbabilityMap(currentMap, 200).then(data => {
          //   console.group('here')
          //   console.log(currentMap)
          //   console.log(data)
          //   console.log(Date.now() - startTime)
          //   console.groupEnd()
          // })
          setCoordinates(mapMap(currentMap))
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
          setCurrentPlayerColor(jsonData.payload.turn)
        }
        if (jsonData.payload.move) {
          setTurns(turns => [...turns, formatTurn(jsonData)])
        }
        if (jsonData.payload.type === 'newTurn') {
          setLastMarkers({ [jsonData.payload.place]: 'last_pos_marker' })
        }
        if (jsonData.payload.moveType === 'pass') {
          if (currentPlayerColor !== selfColor) {
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
    let steMainTemp = 0
    let stepTwoTemp = 0
    Object.keys(coords).forEach(key => {
      if (String(selfColor) === String(coords[key])) {
        steMainTemp += 1
      } else {
        stepTwoTemp += 1
      }
    })
    setSelfStonesCount(steMainTemp)
    setOpponentStonesCount(stepTwoTemp)
    return coords
  }

  const move = coord => {
    if (currentPlayerColor === selfColor) {
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

  const resign = () => {
    dispatch(setBlocked(true))
    client.send(
      JSON.stringify([
        7,
        'go/game',
        { command: 'resign', token: token, game_id: game_id },
      ])
    )
  }

  const handleHelp = ({ type, multipleHandleCount, id, count }) => {
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
        default:
          console.error('invalid id', id)
      }
    }
    if (type === 'score') {
      dispatch(setBlocked(true))
      dispatch(setScoresWinner(game_id))
    }
  }

  const deleteCoordinates = hints => {
    for (const key in coordinates) {
      for (const keyHint in hints) {
        if (key === keyHint) {
          delete coordinates[key]
        }
      }
    }
  }

  const timeConverter = UNIX_timestamp => {
    let a = new Date(UNIX_timestamp)
    let year = a.getFullYear().toString().substr(-2)
    let month = ('0' + (a.getMonth() + 1)).slice(-2)
    let date = ('0' + a.getDate()).slice(-2)
    let hour = ('0' + a.getHours()).slice(-2)
    let min = ('0' + a.getMinutes()).slice(-2)
    let time = `${date}/${month}/${year} ${hour}:${min}`
    return time
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
        currentColor={currentPlayerColor}
        setCurrentColor={setCurrentPlayerColor}
        yourColor={selfColor}
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
        mapStones={mapStones}
        passFn={passFn}
      />
      <RightPanel
        hint={hintsShow}
        you={self}
        opponent={opponent}
        stepColor={currentPlayerColor}
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
        scores={currentPlayerColor !== selfColor ? false : true}
      />
    </Wrapper>
  )
}

export default GameBoard
