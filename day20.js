const fs = require('fs')
const lines = fs.readFileSync('day20.txt', { encoding: 'utf8' }).split('\n')

class Particle {
  constructor (data) {
    this.parseInput(data)
  }

  parseInput (data) {
    ;['position', 'velocity', 'acceleration'].forEach(n => {
      const re = new RegExp(`${n.substring(0, 1)}=<(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)>`)
      const match = data.match(re)
      this[n] = {
        x: parseInt(match[1], 10),
        y: parseInt(match[2], 10),
        z: parseInt(match[3], 10)
      }
    })
  }

  tick () {
    ;['x', 'y', 'z'].forEach(d => {
      this.velocity[d] += this.acceleration[d]
      this.position[d] += this.velocity[d]
    })
  }

  manhattanDistance () {
    return ['x', 'y', 'z'].reduce((sum, d) => {
      return sum + Math.abs(this.position[d])
    }, 0)
  }
}

function test () {
  const p = new Particle('p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>')
  console.log(`Position: `, p.position)
  console.log(`Velocity: `, p.velocity)
  console.log(`Acceleration: `, p.acceleration)
}

function part1 () {
  const particles = lines.map(line => {
    return new Particle(line)
  })

  let lowestAccel = Number.MAX_SAFE_INTEGER
  let index = -1
  particles.forEach((p, i) => {
    let absAccel = Math.abs(p.acceleration.x) + Math.abs(p.acceleration.y) + Math.abs(p.acceleration.z)
    if (absAccel < lowestAccel) {
      lowestAccel = absAccel
      index = i
    }
  })

  console.log(`Part 1: lowest acceleration is ${lowestAccel}, from index ${index}`)
}

function part2 () {
  const particles = lines.map(line => {
    return new Particle(line)
  })

  for (let i = 0; i < 10000; i++) {
    let coordMap = {}
    particles.forEach((p, i) => {
      if (p.deleted) return
      p.tick()
      let coordVal = `${p.position.x}-${p.position.y}-${p.position.z}`
      if (!coordMap[coordVal]) coordMap[coordVal] = []
      coordMap[coordVal].push(i)
    })
    Object.keys(coordMap).forEach(key => {
      if (coordMap[key].length > 1) {
        coordMap[key].forEach(index => {
          particles[index].deleted = true
        })
      }
    })
  }

  const remaining = particles.filter(p => !p.deleted)
  console.log(`Part 2: ${remaining.length}`)
}

test()
part1()
part2()
