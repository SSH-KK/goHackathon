const distThesh = 3

export function prepareProbability(prob, currMap) {
  const size = currMap.length
  const stones = []
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (currMap[y][x] === 0) {
        continue
      }
      stones.push([x, y])
    }
  }

  const dist = (x1, x2, y1, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      let min = 10000
      stones.forEach(([sx, sy]) => {
        const d = dist(x, sx, y, sy)
        if (d < min) min = d
      })
      if (min > distThesh) prob[y][x] = 0
    }
  }
  return prob
}
