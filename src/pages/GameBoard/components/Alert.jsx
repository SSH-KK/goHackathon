import React from 'react'
import styled from 'styled-components'
import { ButtonCustom } from '../../../components/ButtonCustom'

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
  background-color: rgba(255, 255, 255, 0.5);
`

const Inner = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #292929;
`

export function Alert({ children, okCallback, close }) {
  return (
    <Outer>
      <Inner>
        {children}
        <ButtonCustom
          mb={10}
          mt={10}
          backgroundColor="#292929"
          hvbg='rgba(32,231,193,0.6)'
          textColor="#20E7C1"
          onClick={() => {
            if (okCallback) okCallback()
            close()
          }}
        >
          OK
        </ButtonCustom>
        <ButtonCustom
          backgroundColor="#292929"
          hvbg='rgba(32,231,193,0.6)'
          textColor="#20E7C1"
          onClick={() => close()}
        >
          Отметить
        </ButtonCustom>
      </Inner>
    </Outer>
  )
}
