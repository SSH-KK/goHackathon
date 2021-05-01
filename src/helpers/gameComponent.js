export const sumMap = territory => {
  let whiteSum = 0,
    blackSum = 0

  territory.forEach(row =>
    row.forEach(probability => {
      if (probability >= 0) blackSum += probability
      else whiteSum += -probability
    })
  )

  return [whiteSum, blackSum]
}

export const countPercentage = (territoryMap, who) => {
  const [whiteSum, blackSum] = sumMap(territoryMap)

  return (who === 'black' ? blackSum : whiteSum) / (blackSum + whiteSum)
}
