const letters = 'abcdefghjklmn'

export function coord2yx(coord) {
  const letter = coord.substring(0, 1)
  const digit = parseInt(coord.substring(1, 10))
  return [letters.indexOf(letter.toLowerCase()), parseInt(digit) - 1]
}
