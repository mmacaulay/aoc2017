const fs = require('fs')
const lines = fs.readFileSync('day18.txt', { encoding: 'utf8' }).split('\n')

class Program {
  constructor (instructions) {
    this.instructions = instructions
    this.registers = {}
    this.lastFrequency = 0
    this.instructionPointer = 0
  }

  run () {
    while (this.instructionPointer < this.instructions.length) {
      let result = this.execute(this.instructions[this.instructionPointer])
      if (result) return result
    }
  }

  execute (instruction) {
    const params = instruction.split(' ')
    const cmd = params[0]
    const register = params[1]
    const registerValue = this.read(register)

    switch (cmd) {
      case 'snd':
        this.lastFrequency = registerValue
        break
      case 'set':
        this.registers[register] = this.readValue(params[2])
        break
      case 'add':
        this.registers[register] += this.readValue(params[2])
        break
      case 'mul':
        this.registers[register] *= this.readValue(params[2])
        break
      case 'mod':
        this.registers[register] %= this.readValue(params[2])
        break
      case 'rcv':
        if (registerValue !== 0) {
          return this.lastFrequency
        }
        break
      case 'jgz':
        let jumpValue = parseInt(register, 10)
        if (isNaN(jumpValue)) {
          jumpValue = registerValue
        }
        if (jumpValue > 0) {
          this.instructionPointer += this.readValue(params[2]) - 1
        }
        break
      default:
        console.log(`*** Unknown cmd: ${cmd}`)
        break
    }

    this.instructionPointer++
  }

  read (register) {
    this.registers[register] = this.registers[register] || 0
    return this.registers[register]
  }

  readValue (param) {
    let int = parseInt(param, 10)
    return isNaN(int)
      ? this.read(param)
      : int
  }
}

function testData () {
  const instructions = [
    'set a 1',
    'add a 2',
    'mul a a',
    'mod a 5',
    'snd a',
    'set a 0',
    'rcv a',
    'jgz a -1',
    'set a 1',
    'jgz a -2']

  const program = new Program(instructions)
  console.log(`Test data: ${program.run()}`)
}

function part1 () {
  const program = new Program(lines)
  console.log(`Part 1: ${program.run()}`)
}

testData()
part1()
