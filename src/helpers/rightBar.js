export const formatTurn = (data) => ({
  timeStamp: data.time,
  name: data.payload.move.split("(")[0],
  color: data.payload.turn === 'black' ? 'white' : 'black',
  place: data.payload.place || undefined,
})