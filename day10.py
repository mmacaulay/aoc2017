import unittest

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

class Day10(object):
  def __init__(self, input):
    self.position = 0
    self.skipsize = 0
    self.input = input

  def hash(self, lengths):
    for length in lengths:
      self.knot(length)

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

def runrealdata():
  input = range(0, 256)

  day10 = Day10(input)
  day10.hash([165, 1, 255, 31, 87, 52, 24, 113, 0, 91, 148, 254, 158, 2, 73, 153])
  firsttwo = day10.input[:2]
  print(str(firsttwo[0]) + ' * ' + str(firsttwo[1]) + ' = ' + str(firsttwo[0] * firsttwo[1]))

if __name__ == '__main__':
  # unittest.main()
  # runtestdata()
  runrealdata()
