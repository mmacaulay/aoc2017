const fs = require('fs')
const lines = fs.readFileSync('day8.txt', { encoding: 'utf8' }).split('\n')

const testLines = [
  'b inc 5 if a > 1',
  'a inc 1 if b < 5',
  'c dec -10 if a >= 1',
  'c inc -20 if c == 10'
]

function parseInstruction (instruction) {
  const tokens = instruction.split(' ')
  return {
    operationRegister: tokens[0],
    operation: tokens[1],
    operationValue: parseInt(tokens[2], 10),
    conditionRegister: tokens[4],
    condition: tokens[5],
    conditionValue: parseInt(tokens[6], 10)
  }
}

function initRegister (value, registers) {
  if (!registers[value]) registers[value] = 0
}

function testCondition (tokens, registers) {
  initRegister(tokens.conditionRegister, registers)
  const conditionRegister = registers[tokens.conditionRegister]
  const conditionValue = tokens.conditionValue

  switch (tokens.condition) {
    case '>':
      return conditionRegister > conditionValue
    case '<':
      return conditionRegister < conditionValue
    case '>=':
      return conditionRegister >= conditionValue
    case '<=':
      return conditionRegister <= conditionValue
    case '==':
      return conditionRegister === conditionValue
    case '!=':
      return conditionRegister !== conditionValue
    default:
      throw new Error('Unknown condition: ' + tokens.condition)
  }
}

function execOperation (tokens, registers) {
  initRegister(tokens.operationRegister, registers)
  const operationValue = tokens.operationValue

  switch (tokens.operation) {
    case 'inc':
      registers[tokens.operationRegister] += operationValue
      break
    case 'dec':
      registers[tokens.operationRegister] -= operationValue
      break
    default:
      throw new Error('Unknown operation: ' + tokens.operation)
  }

  if (registers[tokens.operationRegister] > registers.maxValue) {
    registers.maxValue = parseInt(registers[tokens.operationRegister].toString(), 10)
  }
}

function execRegisterInstructions (instructions) {
  const registers = { maxValue: 0 }

  instructions.forEach(instruction => {
    const tokens = parseInstruction(instruction)

    if (testCondition(tokens, registers)) {
      execOperation(tokens, registers)
    }
  })

  console.log('Max: ', Math.max(...(Object.keys(registers).filter(key => key !== 'maxValue').map(key => registers[key]))))
  console.log('Max ever: ', registers.maxValue)
}

console.log('Test data:')
execRegisterInstructions(testLines)

console.log('Real data:')
execRegisterInstructions(lines)
