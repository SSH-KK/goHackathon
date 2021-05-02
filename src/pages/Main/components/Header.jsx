import React from 'react'
import styled from 'styled-components'
import Logo from '../../../assets/img/logo.png'
import { MAIN_URL, PROFILE_URL } from '../../../constants/routes'
import { ButtonCustom } from '../../../components/ButtonCustom'
import { Input } from '../../../components/InputCustom'

const Wrapper = styled.div`
  padding: 10px 0;
  display: flex;
  width: 100%;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 50%;
`
const Right = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const RightContent = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`

const RightSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: no-wrap;
  cursor: pointer;
  width: 100%;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Logotype = styled.img`
  height: auto;
  width: 100%;
`

const Name = styled.p`
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
`

const ScoreWrapper = styled.div`
  display: flex;
`

const Pts = styled.p`
  font-size: 20px;
  line-height: 23px;
  color: #5b5b5b;
`

const Avatar = styled.img`
  border-radius: 100px;
  margin-left: 20px;
  width: 115px;
`

export const Header = ({
  history,
  setSearchType,
  searchType,
  nickname,
  pts,
  winrate,
  avatar,
  profile,
  setNicknameFunc,
}) => (
  <Wrapper>
    <Left
      onClick={() => {
        if (searchType !== 'ConnectRandom' && searchType !== 'ConnectCode') {
          history.push(MAIN_URL)
          setSearchType('')
        }
      }}
    >
      <Logotype alt="logo" src={Logo} />
    </Left>
    {!profile ? (
      <Right>
        <RightContent
          onClick={() => {
            if (
              searchType !== 'ConnectRandom' &&
              searchType !== 'ConnectCode'
            ) {
              history.push(PROFILE_URL)
              setSearchType('')
            }
          }}
        >
          <Info>
            <Name>{nickname || ''}</Name>
            <ScoreWrapper>
              <Pts style={{ marginRight: 16 }}>{pts || 0}pts</Pts>
              <Pts>{winrate || ''}</Pts>
            </ScoreWrapper>
          </Info>
          <Avatar alt="avatar" src={avatar} />
        </RightContent>
      </Right>
    ) : (
      <RightSearch>
        <Input
          onChange={e => setNicknameFunc(e)}
          width="500px"
          mr={40}
          textAlign="left"
          placeholder="Введите ник или номер игрока"
        />
        <ButtonCustom
          width="auto"
          onClick={() => {
            history.push(MAIN_URL)
            setSearchType('')
          }}
          padding="0 20px"
        >
          Меню
        </ButtonCustom>
      </RightSearch>
    )}
  </Wrapper>
)
