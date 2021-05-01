import deadstones from '@sabaki/deadstones'

deadstones.useFetch('deadstones_bg.wasm')

export const formatTurn = data => ({
  timeStamp: data.time,
  name: data.payload.move.split('(')[0],
  color: data.payload.turn === 'black' ? 'white' : 'black',
  place: data.payload.place || undefined,
})

export const convertCoord = str => {
  return [str[0].charCodeAt(0) - 'A'.charCodeAt(0), 11 - parseInt(str[1])]
}

export const countTerritories = territory => {
  let whiteSum = 0,
    blackSum = 0

  territory.forEach(row =>
    row.forEach(probability => {
      if (probability > 0) whiteSum++
      else if (probability < 0) blackSum++
    })
  )

  return [whiteSum, blackSum]
}

export const countDiff = async (currentMap, enemyMove, myColor) => {
  const newMap = currentMap.map(row => [...row])
  const pos = convertCoord(enemyMove)

  newMap[pos[0]][pos[1]] = myColor === 'black' ? -1 : 1

  const currentTerritory = await deadstones.getProbabilityMap(currentMap, 150)
  const afterPassTerritory = await deadstones.getProbabilityMap(newMap, 150)

  const [currentWhite, currentBlack] = countTerritories(currentTerritory)
  const [newWhite, newBlack] = countTerritories(afterPassTerritory)

  return (
    (newBlack - newWhite - (currentBlack - currentWhite)) *
    (myColor === 'black' ? -1 : 1)
  )
}
