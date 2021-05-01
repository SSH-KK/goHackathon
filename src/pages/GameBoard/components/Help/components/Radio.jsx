import React, { useEffect } from 'react'

export const Radio = ({ variants, setValue }) => {
  const handleChange = (e) => setValue(e.target.value)

  useEffect(() => variants.length && setValue(variants[0]), [])

  return (
    <>
      {variants.map((variant) => (
        <input
          key={variant}
          type="radio"
          value={variant}
          onChange={handleChange}
        />
      ))}
    </>
  )
}
