import unittest
from functools import reduce

class Day10Test(unittest.TestCase):
  def setUp(self):
    self.day10 = Day10([0, 1, 2, 3, 4])

  def testgetsection(self):
    section = self.day10.getsection(3)
    self.assertEqual(section, [0, 1, 2])

    section = self.day10.getsection(5)
    self.assertEqual(section, [0, 1, 2, 3, 4])

    self.day10.position = 3

    section = self.day10.getsection(2)
    self.assertEqual(section, [3, 4])

    section = self.day10.getsection(4)
    self.assertEqual(section, [3, 4, 0, 1])

    section = self.day10.getsection(1)
    self.assertEqual(section, [3])

  def testknot(self):
    self.day10.knot(3)
    self.assertEqual(self.day10.input, [2, 1, 0, 3, 4])
    self.assertEqual(self.day10.position, 3)
    self.assertEqual(self.day10.skipsize, 1)

    self.day10.knot(4)
    self.assertEqual(self.day10.input, [4, 3, 0, 1, 2])
    self.assertEqual(self.day10.position, 3)
    self.assertEqual(self.day10.skipsize, 2)

    self.day10.knot(1)
    self.assertEqual(self.day10.input, [4, 3, 0, 1, 2])
    self.assertEqual(self.day10.position, 1)
    self.assertEqual(self.day10.skipsize, 3)

    self.day10.knot(5)
    self.assertEqual(self.day10.input, [3, 4, 2, 1, 0])
    self.assertEqual(self.day10.position, 4)
    self.assertEqual(self.day10.skipsize, 4)

    self.day10.knot(0)
    self.assertEqual(self.day10.input, [3, 4, 2, 1, 0])
    self.assertEqual(self.day10.position, 3)
    self.assertEqual(self.day10.skipsize, 5)

  def testconverttoascii(self):
    self.assertEqual(self.day10.converttoascii('1,2,3'), [49, 44, 50, 44, 51])

  def testdensehash(self):
    res = self.day10.densehash([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22])
    self.assertEqual(next(res), 64)

  def testhash2_emptystring(self):
    self.day10.input = list(range(0, 256))
    self.assertEqual(self.day10.hash2(''), 'a2582a3a0e66e6e86e3812dcb672a272')

  def testhash2_aoc2017(self):
    self.day10.input = list(range(0, 256))
    self.assertEqual(self.day10.hash2('AoC 2017'), '33efeb34ea91902bb2f59c9920caa6cd')

  def testhash2_123(self):
    self.day10.input = list(range(0, 256))
    self.assertEqual(self.day10.hash2('1,2,3'), '3efbe78a8d82f29979031a4aa0b16a9d')

  def testhash2_124(self):
    self.day10.input = list(range(0, 256))
    self.assertEqual(self.day10.hash2('1,2,4'), '63960835bcdc130f0b66d7ff4f6a5a8e')

class Day10(object):
  def __init__(self, input):
    self.position = 0
    self.skipsize = 0
    self.input = input

  def hash(self, lengths):
    for length in lengths:
      self.knot(length)

  def hash2(self, lengths):
    lens = self.converttoascii(lengths) + [17, 31, 73, 47, 23]

    for i in range(0, 64):
      self.hash(lens)

    return reduce((lambda acc, output: str(acc) + '{:02x}'.format(output)), self.densehash(self.input), '')

  def densehash(self, input):
    for i in range(0, 16):
      start = i * 16
      end = (i+1) * 16
      section = input[start:end]
      if (len(section) > 0):
        yield reduce((lambda x, y: x ^ y), section)

  def converttoascii(self, lengths):
    return [ord(c) for c in lengths]

  def getsection(self, length):
    inputlen = len(self.input)

    # if section wraps around
    if (self.position + length > inputlen):
      remainder = (self.position + length) % inputlen
      section = self.input[self.position:] + self.input[:remainder]
      return section
    else:
      return self.input[self.position:self.position + length]

  def knot(self, length):
    section = self.getsection(length)
    section = section[::-1]

    inputlen = len(self.input)

    for i in range(0, length):
      index = (self.position + i) % inputlen
      self.input[index] = section[i]

    self.position += length + self.skipsize
    self.position = self.position % inputlen
    self.skipsize += 1

def runtestdata():
  day10 = Day10([0, 1, 2, 3, 4])
  day10.hash([3, 4, 1, 5])
  firsttwo = day10.input[:2]
  print(str(firsttwo[0]) + ' * ' + str(firsttwo[1]) + ' = ' + str(firsttwo[0] * firsttwo[1]))

def runhash():
  input = range(0, 256)

  day10 = Day10(list(input))
  day10.hash([165, 1, 255, 31, 87, 52, 24, 113, 0, 91, 148, 254, 158, 2, 73, 153])
  firsttwo = day10.input[:2]
  print('Part 1: ' + str(firsttwo[0]) + ' * ' + str(firsttwo[1]) + ' = ' + str(firsttwo[0] * firsttwo[1]))

def runhash2():
  input = range(0, 256)

  day10 = Day10(list(input))
  res = day10.hash2('165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153')
  print('Part 2: ' + res)

if __name__ == '__main__':
  # unittest.main()
  # runtestdata()
  runhash()
  runhash2()
