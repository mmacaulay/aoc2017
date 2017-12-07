const fs = require('fs')
const offsets = fs.readFileSync('day5.txt', { encoding: 'utf8' }).split('\n')
offsets.splice(-1, 1)

function countJumps (offsets) {
  let index = 0
  let jumps = 0

  while (index >= 0 && index < offsets.length) {
    jumps++
    const offset = parseInt(offsets[index], 10)
    offsets[index]++
    index += offset
  }

  return jumps
}

function countJumpsPt2 (offsets) {
  let index = 0
  let jumps = 0

  while (index >= 0 && index < offsets.length) {
    jumps++
    const offset = parseInt(offsets[index], 10)
    if (offset >= 3) {
      offsets[index]--
    } else {
      offsets[index]++
    }
    index += offset
  }

  return jumps
}

console.log(`Test jumps: ${countJumps([0, 3, 0, 1, -3])}`)
console.log(`Real jumps: ${countJumps(offsets.slice())}`)

console.log(`Test jumps pt2: ${countJumpsPt2([0, 3, 0, 1, -3])}`)
console.log(`Real jumps pt2: ${countJumpsPt2(offsets.slice())}`)
