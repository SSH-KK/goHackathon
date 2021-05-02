import React, { useEffect } from 'react'
import styled from 'styled-components'

const RangeSpan = styled.span`
  margin-bottom: 1vh;
  font-size: 1.5rem;
`

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 1vh;
  margin-bottom: 1.5vh;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.3s;
  transition: opacity 0.3s;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #20E7C1;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
`

export const Range = ({ from = 1, to, step = 1, value, setValue }) => {
  // eslint-disable-next-line
  useEffect(() => setValue(from), [])
  const handleChange = e => setValue(parseInt(e.target.value))

  return (
    <>
      <RangeSpan>{value}</RangeSpan>
      <RangeInput
        type="range"
        min={from}
        max={to}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}
