import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Goban } from 'react-goban'
import styled from 'styled-components'
import { setMapStones } from '../../../store/Board/actions'
import { client } from '../../../Socket'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 80vh;
  & > div {
    width: 100%;
    height: 100%;
  }
  & svg {
    width: 100%;
    height: 100%;
  }
`

const LeftBar = styled.div`
  background-color: #212529;
  width: 5% !important;
  border-radius: 2rem;
  margin: var(--gap);
  border: 3px solid #212529;
  position: relative;
`
const LeftBarProgress = styled.div`
  top: 0;
  left: 0;
  border-radius: 2rem;
  position: absolute;
  height: ${props => props.height};
  width: 100%;
  background-color: #f0f0f0;
`

const LeftBarCount = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  font-size: 1.5rem;
  left: 150%;
  color: #20e7c1;
  top: ${props => props.top};
`

const Board = ({
  lastMarkers,
  setHint,
  currentColor,
  setCurrentColor,
  yourColor,
  helpType,
  setMultipleHint,
  coordinates,
  setHelpType,
  setMultipleType,
  setActiveHelpId,
  setStonePosition,
  mapStones,
  pSum,
}) => {
  const dispatch = useDispatch()
  const markers = useSelector(state => state.board.markers)
  const classNamesMapStones = useSelector(
    state => state.board.classNamesMapStones
  )

  const handleTurn = useCallback(
    stonePosition => {
      client.send(
        JSON.stringify([
          7,
          'go/game',
          {
            command: 'move',
            token: '1cfc52aacaba0507e66d74cd878020f071457220',
            place: stonePosition.toString().toLowerCase(),
            game_id: 8,
          },
        ])
      )
      let valid = true
      for (const key in coordinates) {
        if (key === stonePosition) {
          valid = false
        }
      }
      if (valid && currentColor === yourColor) {
        setStonePosition(stonePosition)
        setCurrentColor(currentColor === 'white' ? 'black' : 'white')
        setHint(false)
        // dispatch(markersClear())
        setHelpType('')
        setActiveHelpId('')
        setMultipleType(false)
      }
    },
    // eslint-disable-next-line
    [coordinates, currentColor, dispatch, yourColor]
  )

  const handleMultipleTurn = useCallback(
    stonePosition => {
      let valid = true
      for (const key in coordinates) {
        if (key === stonePosition) {
          valid = false
        }
      }
      if (valid) {
        dispatch(setMapStones({ ...mapStones, [stonePosition]: 'circle' }))
        setMultipleHint(stonePosition)
      }
    },
    // eslint-disable-next-line
    [coordinates, mapStones, dispatch]
  )

  let className
  if (currentColor !== yourColor) {
    className = 'disabled'
  } else {
    className = ''
  }

  return (
    <Wrapper className={className}>
      <LeftBar>
        <LeftBarCount top={'0%'}>{pSum.white.toFixed(0)}</LeftBarCount>
        <LeftBarCount top={'calc(100% - 1.5rem);'}>
          {pSum.black.toFixed(0)}
        </LeftBarCount>
        <LeftBarProgress height={pSum.all}></LeftBarProgress>
      </LeftBar>
      {useMemo(
        () => (
          <Goban
            theme={'new_night'}
            stones={coordinates}
            markers={markers}
            lastMarkers={lastMarkers}
            mapStones={mapStones}
            classNamesMapStones={classNamesMapStones}
            onIntersectionClick={
              helpType !== 'multiple' ? handleTurn : handleMultipleTurn
            }
            nextToPlay={yourColor}
          />
        ),
        [
          coordinates,
          markers,
          lastMarkers,
          mapStones,
          classNamesMapStones,
          helpType,
          yourColor,
          handleTurn,
          handleMultipleTurn,
        ]
      )}
    </Wrapper>
  )
}

export default Board
