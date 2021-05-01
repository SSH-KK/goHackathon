import React, { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  padding: 10px;
`

export const ZonesSelect = ({ setValue }) => {
  const handleChange = e => setValue(e.target.value)

  // eslint-disable-next-line
  useEffect(() => setValue(1), [])

  return (
    <Wrapper>
      {[2, 1, 3, 4].map(index => (
        <div key={index}>
          <input
            key={index}
            type="radio"
            value={index}
            name={'radio'}
            onChange={handleChange}
          />
          <span>{index}</span>
        </div>
      ))}
    </Wrapper>
  )
}
