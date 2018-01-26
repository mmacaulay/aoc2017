const fs = require('fs')
const lines = fs.readFileSync('day18.txt', { encoding: 'utf8' }).split('\n')

class Program {
  constructor (instructions, id) {
    this.instructions = instructions
    this.instructionPointer = 0

    this.registers = {}
    if (typeof id !== 'undefined') {
      this.registers['p'] = id
      this.part2 = true
      this.messageQueue = []
      this.sendCount = 0
      this.waiting = false
      this.id = id
    }
    this.lastFrequency = 0
  }

  run () {
    while (this.instructionPointer < this.instructions.length) {
      let result = this.execute(this.instructions[this.instructionPointer])
      if (result) return result
    }
  }

  next () {
    if (this.isComplete()) return
    this.execute(this.instructions[this.instructionPointer])
  }

  execute (instruction) {
    const params = instruction.split(' ')
    const cmd = params[0]
    const register = params[1]
    const registerValue = this.read(register)

    // console.log(`[${this.id}] - (${this.instructionPointer}) - ${instruction}`)

    if (this.waiting) return

    switch (cmd) {
      case 'snd':
        if (this.part2) {
          this.other.receive(registerValue)
          this.sendCount++
        } else {
          this.lastFrequency = registerValue
        }
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
        if (this.part2) {
          this.waitingRegister = register
          if (this.messageQueue.length) {
            this.handleRcv()
          } else {
            this.waiting = true
          }
        } else {
          if (registerValue !== 0) {
            return this.lastFrequency
          }
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

  receive (value) {
    this.messageQueue.push(value)
    if (this.waiting) this.handleRcv()
  }

  handleRcv () {
    this.registers[this.waitingRegister] = this.messageQueue.shift()
    this.waiting = false
    this.waitingRegister = null
  }

  isComplete () {
    return this.instructionPointer >= this.instructions.length
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

function part2 () {
  const program0 = new Program(lines, 0)
  const program1 = new Program(lines, 1)

  program0.other = program1
  program1.other = program0

  while (true) {
    program0.next()
    program1.next()

    if ((program0.waiting && program1.waiting) || // deadlock
      (program0.isComplete() && program1.isComplete())) { // both finished
      break
    }
  }

  console.log(`Part 2: ${program1.sendCount}`)
}

testData()
part1()
part2()
