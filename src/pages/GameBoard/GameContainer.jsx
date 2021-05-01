import Board from './components/Board'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import history from '../../history'

let timesPlayerOneCall = null
let timesPlayerTwoCall = null

const PlayerInfo = styled.div`
  display: flex;
  justify-content: space-around;
  height: 10vh;
  align-items: center;
`
const BaseInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
`
const PlayerP = styled.p`
  font-size: 2rem;
  margin-right: 1rem;
  width: 45%;
  text-align: right;
`
const PlayerCircle = styled.div`
  background-color: ${(props) =>
    props.color === 'black' ? '#292929;' : '#F0F0F0;'};
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  border: ${(props) =>
    props.stepColor === props.color
      ? '3px solid #20E7C1;'
      : props.color === 'black'
      ? '3px solid #F0F0F0;'
      : '3px solid #292929;'};
  border-radius: 50%;
`
const MyButton = styled.div`
  height: 5vh;
  border: 3px solid #20e7c1;
  border-radius: 2rem;
  color: ${(props) => (props.active ? '#FFFFFF' : '#20e7c1')};
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  background-color: ${(props) => (props.active ? '#20e7c1' : 'inherit')};
  &:hover {
    background-color: #20e7c1;
    color: #ffffff;
    cursor: pointer;
  }
`

const EmptyButton = styled.div`
  height: 5vh;
  width: ${(props) => props.width};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const GameContainer = ({ passFn, resignFn, ...args }) => {
  const [timerParseOne, setTimerParseOne] = useState('')
  const [timerParseTwo, setTimerParseTwo] = useState('')

  const timesPlayerOne = (t, start) => {
    if (t >= 0) {
      timesPlayerOneCall = setTimeout(() => {
        const time = t - 1
        const hours = Math.floor(t / 60 / 60)
        const minutes = Math.floor(t / 60) - hours * 60
        const seconds = Math.floor(t % 60)
        setTimerParseOne(
          `${
            hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''
          }${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
        )
        if (start) {
          timesPlayerOne(time, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerOneCall)
    }
  }

  const timesPlayerTwo = (t, start) => {
    if (t >= 0) {
      timesPlayerTwoCall = setTimeout(() => {
        const time = t - 1
        const hours = Math.floor(t / 60 / 60)
        const minutes = Math.floor(t / 60) - hours * 60
        const seconds = Math.floor(t % 60)
        setTimerParseTwo(
          `${
            hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''
          }${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
        )
        if (start) {
          timesPlayerTwo(time, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerTwoCall)
    }
  }

  useEffect(() => {
    async function fn() {
      await clearTimeout(timesPlayerOneCall)
      await clearTimeout(timesPlayerTwoCall)
      timesPlayerOne(args.times.playerOne, args.stepColor === 'black')
      timesPlayerTwo(args.times.playerTwo, args.stepColor === 'white')
    }
    fn()
    // eslint-disable-next-line
  }, [args.times])

  return (
    <Wrapper>
      <PlayerInfo>
        <MyButton width={'10%'} onClick={() => history.push('/')}>
          <p style={{ 'font-size': '1rem' }}>Home</p>
        </MyButton>
        <MyButton
          active={args.showTerritory}
          width={'5vh'}
          onClick={() => args.setShowTerritory((prev) => !prev)}
        >
          <p style={{ 'font-size': '1rem' }}>T</p>
        </MyButton>
        <MyButton
          active={args.showDead}
          width={'5vh'}
          onClick={() => args.setShowDead((prev) => !prev)}
        >
          <p style={{ 'font-size': '1rem' }}>D</p>
        </MyButton>
        <BaseInfo>
          <PlayerP>{args.opponent.nickname}</PlayerP>
          <PlayerCircle
            stepColor={args.stepColor}
            color={args.yourColor === 'black' ? 'white' : 'black'}
          ></PlayerCircle>
          <PlayerP>{timerParseTwo}</PlayerP>
        </BaseInfo>
        <MyButton width={'10%'} onClick={resignFn}>
          <p style={{ 'font-size': '1rem' }}>Resign</p>
        </MyButton>
      </PlayerInfo>

      <Board
        lastMarkers={args.lastMarkers}
        setHint={args.setHint}
        currentColor={args.currentColor}
        setCurrentColor={args.setCurrentColor}
        yourColor={args.yourColor}
        helpType={args.helpType}
        setMultipleHint={args.setMultipleHint}
        coordinates={args.coordinates}
        setHelpType={args.setHelpType}
        setMultipleType={args.setMultipleType}
        setActiveHelpId={args.setActiveHelpId}
        setStonePosition={args.setStonePosition}
        mapStones={args.mapStones}
        pSum={args.pSum}
      />

      <PlayerInfo>
        <EmptyButton width={'10%'}></EmptyButton>
        <EmptyButton width={'5vh'}></EmptyButton>
        <EmptyButton width={'5vh'}></EmptyButton>
        <BaseInfo>
          <PlayerP>{args.self.nickname}</PlayerP>
          <PlayerCircle
            stepColor={args.stepColor}
            color={args.yourColor}
          ></PlayerCircle>
          <PlayerP>{timerParseOne}</PlayerP>
        </BaseInfo>
        <MyButton width={'10%'} onClick={passFn}>
          <p style={{ 'font-size': '1rem' }}>Pass</p>
        </MyButton>
      </PlayerInfo>
    </Wrapper>
  )
}
