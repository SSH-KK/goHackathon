import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ButtonCustom } from '../../../components/ButtonCustom'
import { useSelector } from 'react-redux'

const Text = styled.p`
  font-size: 36px;
  line-height: 42px;
  text-align: center;
`

const ScoreText = styled.p`
  font-size: 36px;
  line-height: 42px;
  margin-top: 15px;
`

const Enemy = styled.div`
  margin-bottom: 20px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Name = styled.p`
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
`

const Score = styled.span`
  font-size: 36px;
  line-height: 42px;
  font-weight: 700;
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
`
const ScoreAfter = styled(Score)`
  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 3px;
    background: #20e7c1;
    bottom: 0;
  }
`

const ScoreWrapper = styled.div`
  display: flex;
`

const Pts = styled.p`
  font-size: 20px;
  color: #c1c1c1;
`

const Avatar = styled.img`
  border-radius: 100px;
  width: 150px;
`

const Right = styled.div``

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const Winner = ({ setSearchType }) => {
  const [player, setPlayer] = useState({})

  const userId = useSelector(state => state.profile.userProfile.user.id)
  const winner = useSelector(state => state.board.winner)
  const loser = useSelector(state => state.board.loser)

  if (!winner) {
    setSearchType('')
  }

  useEffect(() => {
    if (winner?.id === userId) {
      setPlayer(winner)
    } else {
      setPlayer(loser)
    }
    // eslint-disable-next-line
  }, [winner, loser])

  return (
    <Wrapper>
      <Enemy>
        <Info>
          <Avatar alt="avatar" src={player?.avatar} />
          <Name>{player?.nickname}</Name>
          <ScoreWrapper>
            <Pts>{player?.pts}</Pts>
            <Pts>\</Pts>
            <Pts>{player?.position + 'th'}</Pts>
          </ScoreWrapper>
        </Info>
        <Text>{winner?.id === userId ? '??????????????!' : '????????????????!'}</Text>
      </Enemy>
      <Right>
        <ScoreText>
          ????????: <ScoreAfter>{player?.finalScore}</ScoreAfter>
          {/*/ <ScoreBefore>10</ScoreBefore>*/}
        </ScoreText>
        <ScoreText>
          ???????? ???? ????????????????????: <ScoreAfter>{player?.hintScore}</ScoreAfter>
        </ScoreText>
        <ScoreText>
          ???????????????? ????????: <ScoreAfter>{player?.rpScore}</ScoreAfter>
        </ScoreText>

        <ButtonCustom
          width="100%"
          mt={30}
          mb={30}
          onClick={() => {
            setSearchType('')
          }}
        >
          ?? ????????
        </ButtonCustom>
        <ButtonCustom width="100%" onClick={() => setSearchType('')}>
          ???????????? ??????
        </ButtonCustom>
      </Right>
    </Wrapper>
  )
}
