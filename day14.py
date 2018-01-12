from functools import reduce
from day10 import Day10
import unittest
import binascii

class Day14Test(unittest.TestCase):
  def setUp(self):
    input = range(0, 256)

    self.day10 = Day10(list(input))

  def testknothash2bin(self):
    self.assertEqual(knothash2bin('a0c20170'), '10100000110000100000000101110000')

  def testfirst8(self):
    self.assertEqual(display(knothash2bin(self.day10.hash2('flqrgnkx-0'))[:8]), '##.#.#..')
    self.assertEqual(display(knothash2bin(self.day10.hash2('flqrgnkx-1'))[:8]), '.#.#.#.#')
    self.assertEqual(display(knothash2bin(self.day10.hash2('flqrgnkx-2'))[:8]), '....#.#.')
    self.assertEqual(display(knothash2bin(self.day10.hash2('flqrgnkx-3'))[:8]), '#.#.##.#')
    self.assertEqual(display(knothash2bin(self.day10.hash2('flqrgnkx-4'))[:8]), '.##.#...')
    self.assertEqual(display(knothash2bin(self.day10.hash2('flqrgnkx-5'))[:8]), '##..#..#')
    self.assertEqual(display(knothash2bin(self.day10.hash2('flqrgnkx-6'))[:8]), '.#...#..')
    self.assertEqual(display(knothash2bin(self.day10.hash2('flqrgnkx-7'))[:8]), '##.#.##.')

  def testpart1(self):
    self.assertEqual(part1('flqrgnkx'), 8108)

def display(row):
  return row.replace('1', '#').replace('0', '.')

def knothash2bin(s):
  return reduce((lambda acc, c: acc + (bin(int(c, 16))[2:]).zfill(4)), s, '')

def addrow(grid, s, i):
  input = range(0, 256)
  day10 = Day10(list(input))

  h = day10.hash2(s + '-' + str(i))
  grid.append(knothash2bin(h))
  return grid

class Part2(object):
  def __init__(self, grid):
    self.grid = grid
    self.groupmap = {}

  def countgroups(self):
    # loop over all cells in grid, by row then column
    # if a cell is a 1, check if there is already an entry for it in groupmap
    # if not, increment the group counter and recursively call addtogroup on neighbouring cells

    groupcounter = 0

    for y in range(0, len(self.grid)):
      for x in range(0, 128):
        if self.grid[y][x] == '1':
          if not self.cellhasgroup(x, y):
            groupcounter += 1
            self.addtogroup(x, y, groupcounter)

    return groupcounter

  def cellhasgroup(self, x, y):
    return (str(x) + '-' + str(y)) in self.groupmap

  def addtogroup(self, x, y, groupid):
    if self.cellhasgroup(x, y):
      return

    self.groupmap[str(x) + '-' + str(y)] = groupid

    # check cell to the right
    if ((x < 127) and (self.grid[y][x + 1] == '1')):
      self.addtogroup(x + 1, y, groupid)

    # # check cell to the left
    if ((x > 0) and (self.grid[y][x - 1] == '1')):
      self.addtogroup(x - 1, y, groupid)

    # # check cell above
    if ((y > 0) and (self.grid[y - 1][x] == '1')):
      self.addtogroup(x, y - 1, groupid)

    # check cell below
    if ((y < len(self.grid) - 1) and (self.grid[y + 1][x] == '1')):
      self.addtogroup(x, y + 1, groupid)


def part1(s):
  input = range(0, 256)

  day10 = Day10(list(input))

  usedcount = 0
  for i in range(0, 128):
    h = day10.hash2(s + '-' + str(i))
    usedcount += knothash2bin(h).count('1')
  return usedcount

def part2(s):
  input = range(0, 256)

  day10 = Day10(list(input))

  grid = reduce((lambda g, i: addrow(g, s, i)), range(0, 128), [])

  part2 = Part2(grid)
  return part2.countgroups()

if __name__ == '__main__':
  # unittest.main()
  print('Part 1: ' + str(part1('ugkiagan')))
  print('Part 2 test data: ' + str(part2('flqrgnkx')))
  print('Part 2: ' + str(part2('ugkiagan')))
