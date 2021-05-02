import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from './components/Header'
import { Content } from './components/Content'
import styled from 'styled-components'
import { getProfile } from '../../store/Profile/actions'
import { getCurrentGame } from '../../store/GameCreate/actions'

const Wrapper = styled.div`
  width: 75vw;
  min-height: 100vh;
  margin: 0 auto;
`

const Main = ({ history, location }) => {
  const [searchType, setSearchType] = useState(
    location.state?.from ? location.state.from : ''
  )
  const dispatch = useDispatch()
  const playerInfo = useSelector(state => state.profile.userProfile.user)

  useEffect(() => {
    dispatch(getProfile())
    dispatch(getCurrentGame())
    // eslint-disable-next-line
  }, [])

  if (!playerInfo) {
    return null
  }

  return (
    <Wrapper>
      <Header
        history={history}
        setSearchType={setSearchType}
        searchType={searchType}
        nickname={playerInfo.nickname}
        pts={playerInfo.pts}
        avatar={playerInfo.avatar}
        winrate={playerInfo.winrate}
      />
      <Content
        history={history}
        searchType={searchType}
        setSearchType={setSearchType}
      />
    </Wrapper>
  )
}

export default Main
