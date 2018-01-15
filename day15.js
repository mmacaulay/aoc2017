
class Generator {
  constructor (startValue, factor, multiple) {
    this.previousValue = this.startValue = startValue
    this.factor = factor
    this.multiple = multiple
  }

  reset () {
    this.previousValue = this.startValue
  }

  nextValue () {
    this.previousValue = (this.previousValue * this.factor) % 2147483647
    if (this.multiple && this.previousValue % this.multiple !== 0) {
      return this.nextValue()
    } else {
      return this.previousValue
    }
  }
}

class Judge {
  constructor (a, b) {
    this.a = a
    this.b = b
  }

  countMatches (sampleSize) {
    let count = 0
    const mask = 65535

    for (let i = 0; i < sampleSize; i++) {
      const aval = this.a.nextValue()
      const bval = this.b.nextValue()

      if ((aval & mask) === (bval & mask)) {
        count++
      }
    }
    return count
  }
}

function testData () {
  console.log('*** Test Data Part 1\n\n')
  const a = new Generator(65, 16807)
  const b = new Generator(8921, 48271)

  a.reset()
  b.reset()

  const j = new Judge(a, b)
  const matchCount = j.countMatches(5)
  console.log(`Count: ${matchCount}`)
}

function testDataPart2 () {
  console.log('\n\n*** Test Data Part 2\n\n')

  const a = new Generator(65, 16807, 4)
  const b = new Generator(8921, 48271, 8)

  for (let i = 0; i < 5; i++) {
    console.log(`a: ${a.nextValue()} b: ${b.nextValue()}`)
  }
}

function part1 () {
  console.log('\n\n*** Part 1\n\n')

  const a = new Generator(512, 16807)
  const b = new Generator(191, 48271)

  const j = new Judge(a, b)
  const matchCount = j.countMatches(40000000)
  console.log(`Count: ${matchCount}`)
}

function part2 () {
  console.log('\n\n*** Part 2\n\n')

  const a = new Generator(512, 16807, 4)
  const b = new Generator(191, 48271, 8)

  const j = new Judge(a, b)
  const matchCount = j.countMatches(5000000)
  console.log(`Count: ${matchCount}`)
}

testData()
part1()

testDataPart2()
part2()
