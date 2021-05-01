import { ButtonCustom } from '../../components/ButtonCustom'
import Board from './components/Board'
import {useEffect, useState} from 'react'
import styled from 'styled-components'

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
  justify-content: center;
  align-items: center;
  width:70%;
  // background-color: red;
`
const PlayerP = styled.p`
  font-size: 2rem;
  margin-right: 1rem;
`
const PlayerCircle = styled.div`
  background-color: ${(props) => (props.color === 'black' ? "#292929;" : "#F0F0F0;")}
  height:2rem;
  width:2rem;
  margin-right: 1rem;
  border: ${(props) => (props.stepColor === props.color ? '3px solid #20E7C1;' : props.color === 'black' ? "3px solid #F0F0F0;" : "3px solid #292929;")}
  border-radius:50%;
`
const MyButton = styled.div`
  height: 5vh;
  border: 3px solid #20E7C1;
  border-radius:2rem;
  color: #20E7C1;
  width:10%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .3s;
  &:hover{
    background-color:#20E7C1;
    color:#FFFFFF;
    cursor: pointer;
  }
`

const EmptyButton = styled.div`
height: 5vh;
width:10%;
`

export const GameContainer = ({ passFn, ...args }) => {
  const [timerParseOne, setTimerParseOne] = useState('')
  const [timerParseTwo, setTimerParseTwo] = useState('')

  const timesPlayerOne = (t, start) => {
    if (t >= 0) {
      timesPlayerOneCall = setTimeout(() => {
        const time = t - 1
        const hours = Math.floor(t / 60 / 60);
        const minutes = Math.floor(t / 60) - (hours * 60);
        const seconds = Math.floor(t % 60);
        setTimerParseOne(`${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
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
        const hours = Math.floor(t / 60 / 60);
        const minutes = Math.floor(t / 60) - (hours * 60);
        const seconds = Math.floor(t % 60);
        setTimerParseTwo(`${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
        if (start) {
          timesPlayerTwo(time, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerTwoCall)
    }
  }

  useEffect(async () => {
    await clearTimeout(timesPlayerOneCall)
    await clearTimeout(timesPlayerTwoCall)
    timesPlayerOne(args.times.playerOne, args.stepColor === 'black')
    timesPlayerTwo(args.times.playerTwo, args.stepColor === 'white')
  }, [args.times])

  return (
    <div style={{'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center'}}>
      <PlayerInfo>
        <MyButton>
          <p style={{'font-size':'1rem'}}>Home</p>
        </MyButton>
        <BaseInfo>
          <PlayerP>{args.opponent.nickname}</PlayerP>
          <PlayerCircle stepColor={args.stepColor} color={args.yourColor === 'black' ? 'white':'black'}></PlayerCircle>
          <PlayerP>{timerParseTwo}</PlayerP>
        </BaseInfo>
        <MyButton>
          <p style={{'font-size':'1rem'}}>Loose</p>
        </MyButton>
      </PlayerInfo>
      <Board {...args} />
      <PlayerInfo>
      <EmptyButton></EmptyButton>
        <BaseInfo>
          <PlayerP>{args.self.nickname}</PlayerP>
          <PlayerCircle stepColor={args.stepColor} color={args.yourColor}></PlayerCircle>
          <PlayerP>{timerParseOne}</PlayerP>
        </BaseInfo>
        <MyButton>
          <p style={{'font-size':'1rem'}}>Pass</p>
      </MyButton>
      </PlayerInfo>
      {/* <div style={{ bottom: 0, position: 'fixed' }}>
        <ButtonCustom onClick={passFn}>Pass</ButtonCustom>
      </div> */}
    </div>
  )
}
