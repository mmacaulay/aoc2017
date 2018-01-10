const fs = require('fs')
const lines = fs.readFileSync('day13.txt', { encoding: 'utf8' }).split('\n')

class Firewall {
  constructor (layers) {
    this.originalLayers = layers
    this.initialize()
  }

  initialize () {
    this.layers = []
    this.packetIndex = -1
    this.tripSeverity = 0
    this.caught = false

    const re = /(\d+): (\d+)/
    this.originalLayers.forEach(layer => {
      const matches = layer.match(re)
      const depth = parseInt(matches[1], 10)
      const range = parseInt(matches[2], 10)
      this.layers[depth] = Array(range).fill('*')
    }, [])
  }

  moveScanners () {
    this.layers.forEach(layer => {
      if (!layer) return
      if (typeof layer.scannerIndex === 'undefined') {
        layer.scannerIndex = 0
        layer.scannerDirection = 'up'
      } else {
        if (layer.scannerDirection === 'up') {
          layer.scannerIndex++
          if (layer.scannerIndex === layer.length - 1) layer.scannerDirection = 'down'
        } else {
          layer.scannerIndex--
          if (layer.scannerIndex === 0) layer.scannerDirection = 'up'
        }
      }
      layer.fill('*')
      layer[layer.scannerIndex] = 'o'
    })
  }

  movePacket () {
    this.packetIndex++
    const layer = this.layers[this.packetIndex]
    if (layer) layer[0] = 'p'
    if (layer && layer.scannerIndex === 0) {
      console.log(`Caught at depth ${this.packetIndex}. Range: ${layer.length}`)
      this.tripSeverity += this.packetIndex * layer.length
      this.caught = true
      layer[0] = '!'
    }
  }

  part1 (breakWhenCaught = false) {
    while (this.packetIndex < this.layers.length) {
      this.moveScanners()
      this.movePacket()
      if (breakWhenCaught && this.caught) break
      // this.display()
    }
  }

  part2 () {
    let delay = 1
    while (true) {
      let caught = false
      for (let i = 0; i < this.layers.length; i++) {
        const layer = this.layers[i]
        if (!layer) continue
        const time = delay + i
        const range = layer.length

        if (time % ((range - 1) * 2) === 0) {
          caught = true
          break
        }
      }
      if (!caught) break
      delay++
      // if (delay % 10000 === 0) console.log(`Delay: ${delay}`)
    }
    console.log(`Final delay: ${delay}`)
  }

  display () {
    console.log('\n\n *** ELITE FIREWALL CONSOLE *** \n\n')
    for (let i = 0; i < this.layers.length; i++) {
      console.log(`${i}: ${this.layers[i]}`)
    }
  }
}

function testData () {
  const fw = new Firewall(['0: 3', '1: 2', '4: 4', '6: 4'])

  console.log('\n\nTest data\n\n')

  fw.part1()
  console.log(`Final trip severity: ${fw.tripSeverity}`)

  fw.part2()
}

function part1 () {
  console.log('\n\nPart 1\n\n')

  const fw = new Firewall(lines)
  fw.part1()
  console.log(`Final trip severity: ${fw.tripSeverity}`)
}

function part2 () {
  console.log('\n\nPart 2\n\n')

  const fw = new Firewall(lines)
  fw.part2()
}

testData()
part1()
part2()
