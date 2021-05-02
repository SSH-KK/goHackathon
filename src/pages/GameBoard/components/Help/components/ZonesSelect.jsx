import React, { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  padding: 10px;
`

const CustomRadio = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  &+label{
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  &+label::before{
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    flex-grow: 0;
    border: 2px solid #F0F0F0;
    border-radius: 50%;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    cursor: pointer;
    transition: all .3s;
  }
  &:not(:disabled):not(:checked)+label:hover::before{
    border-color: #20E7C1;
  }
  &:not(:disabled):checked+label::before{
    background-color:#20E7C1;
  }
`

export const ZonesSelect = ({ setValue }) => {
  const handleChange = e => setValue(e.target.value)

  // eslint-disable-next-line
  useEffect(() => setValue(1), [])

  return (
    <Wrapper>
      {[2, 1, 3, 4].map(index => (
        <div key={index}>
          <CustomRadio
            key={index}
            id={index}
            type="radio"
            value={index}
            name={'radio'}
            onChange={handleChange}
          />
          <label htmlFor={index}>{index}</label>
        </div>
      ))}
    </Wrapper>
  )
}
