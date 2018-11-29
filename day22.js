const fs = require('fs')
const assert = require('assert')
const realMap = fs.readFileSync('day22.txt', { encoding: 'utf8' }).split('\n')

const testMap = [
  '..#',
  '#..',
  '...'
]

function testCreateGrid () {
  const exampleGrid = createGrid(testMap, 9)

  const expected = [
    '.........',
    '.........',
    '.........',
    '.....#...',
    '...#.....',
    '.........',
    '.........',
    '.........',
    '.........'
  ]

  assert.deepEqual(exampleGrid.map(row => row.join('')), expected)
}

class Virus {
  constructor (grid) {
    this.grid = grid
    this.initialize()
  }

  initialize () {
    const gridMiddle = Math.floor(this.grid.length / 2)
    this.position = { x: gridMiddle, y: gridMiddle }
    this.direction = 'up'
    this.infectionCount = 0
  }

  rotate (direction) {
    switch (this.direction) {
      case 'up':
        this.direction = direction === 'left' ? 'left' : 'right'
        break
      case 'right':
        this.direction = direction === 'left' ? 'up' : 'down'
        break
      case 'down':
        this.direction = direction === 'left' ? 'right' : 'left'
        break
      case 'left':
        this.direction = direction === 'left' ? 'down' : 'up'
        break
    }
  }
  
  move () {
    switch (this.direction) {
      case 'up':
        this.position.x--
        break
      case 'right':
        this.position.y++
        break
      case 'down':
        this.position.x++
        break
      case 'left':
        this.position.y--
        break
    }
  }

  clean () {
    this.grid[this.position.x][this.position.y] = '.'
  }

  infect () {
    this.grid[this.position.x][this.position.y] = '#'
    this.infectionCount++
  }

  burst (count) {
    for (let i = 0; i < count; i++) {
      // current position infected
      if (this.grid[this.position.x][this.position.y] === '#') {
        this.rotate('right')
        this.clean()
    
      // current position clean
      } else {
        this.rotate('left')
        this.infect()
      }
      this.move()
    }
  }
}

function createGrid (map, gridSize) {
  const grid = []
  for (let i = 0; i < gridSize; i++) {
    grid[i] = []
    for (let j = 0; j < gridSize; j++) {
      grid[i].push('.')
    }
  }

  const emptyGridMiddle = Math.floor(gridSize / 2)
  const mapMiddle = Math.floor(map.length / 2)
  const offset = emptyGridMiddle - mapMiddle

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map.length; y++) {
      grid[offset + x][offset + y] = map[x][y]
    }
  }
  return grid
}

function test () {
  testCreateGrid()
}

function part1 () {
  const grid = createGrid(realMap, 10000)
  const virus = new Virus(grid)

  virus.burst(10000)
  console.log(`infection count`, virus.infectionCount)
}

// test()
part1()