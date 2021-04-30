import React from "react"
import styled from "styled-components"
import Players from "./components/Players"
import Info from "./components/Info"

const Wrapper = styled.div`
  width: 100%;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
`

const GameInfo = ({
  stepColor,
  enemyPass,
  yourColor,
  you,
  opponent,
  turns,
  stepMain,
  stepTwo,
  times,
}) => {
  return (
    <Wrapper>
    </Wrapper>
  )
}

export default GameInfo
