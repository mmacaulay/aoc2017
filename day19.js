const fs = require('fs')
const realData = fs.readFileSync('day19.txt', { encoding: 'utf8' }).split('\n')

let testData = `
     |
     |  +--+
     A  |  C
 F---|----E|--+
     |  |  |  D
     +B-+  +--+
`.split('\n')

testData.shift()

class RoutingDiagram {
  constructor (data) {
    this.diagram = data
    this.location = { x: 0, y: 0 }
    this.letters = []
    this.direction = 'down'
  }

  trace () {
    this.location.y = 0
    this.location.x = this.diagram[0].indexOf('|')
    let moveCount = 1
    while (this.move()) moveCount++
    console.log(`Move count: ${moveCount}`)
    console.log(`Letters: ${this.letters.join('')}`)
  }

  move () {
    console.log(`Moving ${this.direction}`)
    switch (this.direction) {
      case 'up':
        this.location.y--
        break
      case 'down':
        this.location.y++
        break
      case 'left':
        this.location.x--
        break
      case 'right':
        this.location.x++
        break
    }

    const moveCharsRe = /[-|A-Z]/
    console.log(`Fetching value at [${this.location.x}, ${this.location.y}]`)
    const next = this.diagram[this.location.y][this.location.x]
    if (next === '+') {
      console.log('Encountered intersection')
      // determine new direction
      const options = {
        up: { inverse: 'down', value: this.diagram[this.location.y + 1][this.location.x] },
        down: { inverse: 'up', value: this.diagram[this.location.y - 1][this.location.x] },
        left: { inverse: 'right', value: this.diagram[this.location.y][this.location.x + 1] },
        right: { inverse: 'left', value: this.diagram[this.location.y + 1][this.location.x - 1] }
      }
      const newDirection = Object.keys(options).find((k) => {
        const o = options[k]
        return k !== this.direction && o.inverse !== this.direction && !(moveCharsRe.test(o.value))
      })
      if (!newDirection) {
        console.log('Unable to find new direction!')
        return false
      }
      console.log('Switching direction: ' + newDirection)
      this.direction = newDirection
    } else if (/[A-Z]/.test(next)) {
      console.log(`Encountered letter ${next}`)
      this.letters.push(next)
    } else if (!moveCharsRe.test(next)) {
      console.log(`Encountered ${next}, exiting`)
      return false
    } else {
      console.log(`New coords: [${this.location.x}, ${this.location.y}]`)
    }
    return true
  }
}

function test () {
  const rd = new RoutingDiagram(testData)
  testData.forEach(line => console.log(line.length))
  rd.trace()
}

function part1 () {
  const rd = new RoutingDiagram(realData)
  rd.trace()
}

test()
part1()
