import React, { useEffect } from 'react'

export const Range = ({ from = 1, to, step = 1, value, setValue }) => {
  useEffect(() => setValue(from), [])
  const handleChange = (e) => setValue(parseInt(e.target.value))

  return (
    <>
      <span>{value}</span>
      <input
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
