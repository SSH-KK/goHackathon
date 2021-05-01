const toKey = (x, y) => `${x}/${y}`

function dfs(x, y, field, size, mask, group, color) {
  if (field[y][x] !== color) return
  const key = toKey(x, y)
  if (mask.has(key)) return
  mask.add(key)
  if (color !== 0) group.push([x, y])
  if (x > 0) {
    dfs(x - 1, y, field, size, mask, group, color)
  }
  if (x < size - 1) {
    dfs(x + 1, y, field, size, mask, group, color)
  }
  if (y > 0) {
    dfs(x, y - 1, field, size, mask, group, color)
  }
  if (y < size - 1) {
    dfs(x, y + 1, field, size, mask, group, color)
  }
}

function searchGroups(field) {
  const size = field.length
  const groups = []
  const mask = new Set()
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const group = []
      dfs(x, y, field, size, mask, group, field[y][x])
      if (group.length > 0) groups.push(group)
    }
  }
  return groups
}

function countNearZeros(group, field) {
  const size = field.length
  let result = new Set()
  for (let [x, y] of group) {
    if (x > 0 && field[y][x - 1] === 0) {
      result.add(toKey(x - 1, y))
    }
    if (x < size - 1 && field[y][x + 1] === 0) {
      result.add(toKey(x + 1, y))
    }
    if (y > 0 && field[y - 1][x] === 0) {
      result.add(toKey(x, y - 1))
    }
    if (y < size - 1 && field[y + 1][x] === 0) {
      result.add(toKey(x, y + 1))
    }
  }
  return result.size
}

export function calculatePowers(field) {
  const result = field.map((row) => row.map((_) => 0))
  const groups = searchGroups(field)
  const groupsPower = groups.map((group) => countNearZeros(group, field))
  groups.forEach((group, i) =>
    group.forEach(([x, y]) => (result[y][x] = groupsPower[i]))
  )
  return result
}
