import React from "react"
import styled from "styled-components"
import { ButtonCustom } from "../../../components/ButtonCustom"

const Outer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const Inner = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #bbbbbb;
`

export function Alert({ text, hideAlert }) {
  return (
    <Outer>
      <Inner>
        <h1>{text}</h1>
        <ButtonCustom backgroundColor="#20e7c1" onClick={hideAlert}>
          Ok
        </ButtonCustom>
      </Inner>
    </Outer>
  )
}
