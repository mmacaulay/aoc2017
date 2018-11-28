const fs = require('fs')
const assert = require('assert')
const lines = fs.readFileSync('day21.txt', { encoding: 'utf8' }).split('\n')

const startPattern = [
  '.#.',
  '..#',
  '###']

function test () {
  testRotate()
  testFlip()
  testGetSquares()
  testFindMatchingRule()
  testCombineSquares()
}

function testRotate () {
  let result = rotate(startPattern)
  let expected = [
    '#..',
    '#.#',
    '##.'
  ]
  assert.deepEqual(result, expected)

  result = rotate(result)
  expected = [
    '###',
    '#..',
    '.#.'
  ]
  assert.deepEqual(result, expected)

  result = rotate(result)
  expected = [
    '.##',
    '#.#',
    '..#'
  ]
  assert.deepEqual(result, expected)

  result = rotate(result)
  assert.deepEqual(result, startPattern)

  const test2x2 = [
    '..',
    '.#'
  ]

  result = rotate(test2x2)
  expected = [
    '..',
    '#.'
  ]
  assert.deepEqual(result, expected)

  result = rotate(result)
  expected = [
    '#.',
    '..'
  ]
  assert.deepEqual(result, expected)

  result = rotate(result)
  expected = [
    '.#',
    '..'
  ]
  assert.deepEqual(result, expected)

  result = rotate(result)
  assert.deepEqual(result, test2x2)
}

function testFlip () {
  let pattern = [
    '.#.',
    '..#',
    '###'
  ]
  let expected = [
    '.#.',
    '#..',
    '###'
  ]

  assert.deepEqual(flip(pattern), expected)

  pattern = [
    '#.',
    '..'
  ]

  expected = [
    '.#',
    '..'
  ]

  assert.deepEqual(flip(pattern), expected)
}

function testGetSquares () {
  let pattern = [
    '#..#',
    '....',
    '....',
    '#..#'
  ]

  let squares = getSquares(pattern)
  let expected = [
    [
      '#.',
      '..'
    ], [
      '.#',
      '..'
    ], [
      '..',
      '#.'
    ], [
      '..',
      '.#'
    ]
  ]
  assert.deepEqual(squares, expected)

  pattern = startPattern.slice()

  squares = getSquares(pattern)
  expected = [[
    '.#.',
    '..#',
    '###']]
  assert.deepEqual(squares, expected)

  pattern = [
    '##.##.',
    '#..#..',
    '......',
    '##.##.',
    '#..#..',
    '......'
  ]

  squares = getSquares(pattern)

  expected = [
    [
      '##',
      '#.'
    ], [
      '.#',
      '.#'
    ], [
      '#.',
      '..'
    ], [
      '..',
      '##'
    ], [
      '..',
      '.#'
    ], [
      '..',
      '#.'
    ], [
      '#.',
      '..'
    ], [
      '.#',
      '..'
    ], [
      '..',
      '..'
    ]
  ]

  assert.deepEqual(squares, expected)

}

function testCombineSquares () {
  let squares = [
    [
      '#.',
      '..'
    ], [
      '.#',
      '..'
    ], [
      '..',
      '#.'
    ], [
      '..',
      '.#'
    ]
  ]

  let pattern = combineSquares(squares)

  let expected = [
    '#..#',
    '....',
    '....',
    '#..#'
  ]

  assert.deepEqual(pattern, expected)

  squares = [
    [
      '##.',
      '#..',
      '...'
    ], [
      '##.',
      '#..',
      '...'
    ], [
      '##.',
      '#..',
      '...'
    ], [
      '##.',
      '#..',
      '...'
    ]
  ]

  pattern = combineSquares(squares)

  expected = [
    '##.##.',
    '#..#..',
    '......',
    '##.##.',
    '#..#..',
    '......'
  ]
  
  assert.deepEqual(pattern, expected)

  squares = [
    [
      '##',
      '#.'
    ], [
      '.#',
      '.#'
    ], [
      '#.',
      '..'
    ], [
      '..',
      '##'
    ], [
      '..',
      '.#'
    ], [
      '..',
      '#.'
    ], [
      '#.',
      '..'
    ], [
      '.#',
      '..'
    ], [
      '..',
      '..'
    ]
  ]

  pattern = combineSquares(squares)

  expected = [
    '##.##.',
    '#..#..',
    '......',
    '##.##.',
    '#..#..',
    '......'
  ]

  assert.deepEqual(pattern, expected)
}

function testFindMatchingRule () {
  let rules = {
    '../.#': '##./#../...',
    '.#./..#/###': '#..#/..../..../#..#'
  }

  let square = [
    '.#.',
    '..#',
    '###'
  ]

  let result = findMatchingRule(square, rules)

  assert.equal(result, '#..#/..../..../#..#')

  let squares = [
    [
      '#.',
      '..'
    ], [
      '.#',
      '..'
    ], [
      '..',
      '#.'
    ], [
      '..',
      '.#'
    ]
  ]

  squares.forEach(square => {
    let result = findMatchingRule(square, rules)
    assert.equal(result, '##./#../...')
  })

  square = [
    '.#.',
    '..#',
    '###'
  ]

  rules = loadRules()

  result = findMatchingRule(square, rules)
  assert.equal(result, '##.#/...#/..../##.#')
}

function rotate (pattern) {
  const result = pattern.slice().map(row => row.split(''))
  for (let x = 0; x < result.length; x++) {
    for (let y = 0; y < result.length; y++) {
      result[x][y] = pattern[result.length - y - 1][x]
    }
  }

  return result.map(row => row.join(''))
}

function flip (pattern) {
  let result = []
  for (let i = 0; i < pattern.length; i++) {
    result[i] = ''
    for (let j = 0; j < pattern.length; j++) {
      result[i] += pattern[i][(pattern.length - 1) - j]
    }
  }
  return result
}

function getSquares (pattern) {
  const size = pattern[0].length % 2 === 0 ? 2 : 3
  let squares = []
  for (let y = 0; y < pattern.length; y += size) {
    for (let x = 0; x < pattern.length; x += size) {
      const square = []
      for (let i = 0; i < size; i++) {
        let row = ''
        for (let j = 0; j < size; j++) {
          row += pattern[y + i][x + j]
        }
        square.push(row)
      }
      squares.push(square)
    }
  }
  return squares
}

function combineSquares (squares) {
  const squareLength = squares.length
  const segmentLength = squares[0].length

  const patternSize = squares.length * squares[0].length * squares[0][0].length
  const rowSize = Math.sqrt(patternSize)
  const segmentsPerRow = rowSize / segmentLength

  let pattern = []

  let k = 0
  let segmentCounter = 0
  for (let i = 0; i < rowSize; i++) {
    let row = ''
    for (let j = 0; j < segmentsPerRow; j++) {
      row += squares[k + j][i % segmentLength]
      segmentCounter++
    }
    pattern[i] = row
    if (segmentCounter === rowSize) {
      segmentCounter = 0
      k += segmentsPerRow
    }
  }

  return pattern
}

function toRule (square) {
  return square.join('/')
}

function toSquare (rule) {
  return rule.split('/')
}

function findMatchingRule (square, rules) {
  let rotations = 0
  let testSquare = square
  if (rules[toRule(testSquare)]) return rules[toRule(testSquare)]

  while (rotations <= 3) {
    testSquare = rotate(testSquare)
    if (rules[toRule(testSquare)]) return rules[toRule(testSquare)]

    rotations++
  }

  testSquare = flip(testSquare)
  if (rules[toRule(testSquare)]) return rules[toRule(testSquare)]

  rotations = 0
  while (rotations <= 3) {
    testSquare = rotate(testSquare)
    if (rules[toRule(testSquare)]) return rules[toRule(testSquare)]

    rotations++
  }
}

function countOnPixels (pattern) {
  let count = 0

  pattern.forEach(row => {
    row.split('').forEach(pixel => {
      if (pixel === '#') count++
    })
  })

  return count
}

function loadRules () {
  return lines.reduce((rules, line) => {
    let fields = line.split(' ')
    rules[fields[0]] = fields[2]
    return rules
  }, {})
}

function enhance (pattern) {
  const rules = loadRules()
  let squares = getSquares(pattern)
  return combineSquares(squares.map((square) => {
    return toSquare(findMatchingRule(square, rules))
  }))
}

function part1 () {
  let pattern = startPattern.slice()

  for (let i = 0; i < 5; i++) {
    pattern = enhance(pattern)
  }
  console.log('Part 1 =>')
  console.log('Final pattern:', pattern)
  console.log('Pixels on: ', countOnPixels(pattern))
}

// test()
part1()
