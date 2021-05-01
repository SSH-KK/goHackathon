export const countPercentage = (territoryMap, who) => {
  let blackSum = 0
  let whiteSum = 0
  territoryMap.forEach((row) =>
    row.forEach((probability) => {
      if (probability > 0) blackSum += probability
      else whiteSum += -probability
    })
  )

  return (who === 'black' ? blackSum : whiteSum) / (blackSum + whiteSum)
}
