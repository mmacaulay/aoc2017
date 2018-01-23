let currentIndex = 0
let buffer = [0]
let counter = 0

function step (jumpCount) {
  let jumpIndex = currentIndex + jumpCount
  jumpIndex = (jumpIndex % buffer.length) + 1

  buffer.splice(jumpIndex, 0, ++counter)
  currentIndex = jumpIndex
}

function testData () {
  for (let i = 0; i < 9; i++) {
    step(3)
    console.log(`i: ${i}`)
    console.log(`currentIndex: ${currentIndex}`)
    console.log(`buffer: ${buffer}\n`)
  }
}

function part1 () {
  for (let i = 0; i < 2017; i++) {
    step(386)
  }
  console.log(`Part 1: ${buffer[buffer.indexOf(2017) + 1]}`)
}

function part2 () {
  let jumpCount = 386
  let bufferLength = 1
  let result = 0
  let position = 0

  for (let i = 0; i < 50000000; i++) {
    let jumpIndex = (position + jumpCount) % bufferLength

    if (jumpIndex === 0) {
      result = i
    }
    bufferLength++
    position = jumpIndex + 1
  }

  console.log(`Part 2: ${result + 1}`)
}

testData()
part1()
part2()
