import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Goban } from 'react-goban'
import styled from 'styled-components'
import { markersClear, setMapStones } from '../../../store/Board/actions'
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
  border-radius: var(--gap);
  margin: var(--gap);
  border: 3px solid #212529;
  position: relative;
`
const LeftBarProgress = styled.div`
  border-radius: var(--gap);
  position: absolute;
  height: ${(props) => props.height};
  width: 100%;
  background-color: #f0f0f0;
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
}) => {
  const dispatch = useDispatch()
  const markers = useSelector((state) => state.board.markers)
  const classNamesMapStones = useSelector(
    (state) => state.board.classNamesMapStones
  )

  const handleTurn = (stonePosition) => {
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
      dispatch(markersClear())
      setHelpType('')
      setActiveHelpId('')
      setMultipleType(false)
    }
  }

  const handleMultipleTurn = (stonePosition) => {
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
  }

  let className
  if (currentColor !== yourColor) {
    className = 'disabled'
  } else {
    className = ''
  }

  return (
    <Wrapper className={className}>
      <LeftBar>
        <LeftBarProgress height={'55%'}></LeftBarProgress>
      </LeftBar>
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
    </Wrapper>
  )
}

export default Board
