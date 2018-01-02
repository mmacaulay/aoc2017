require 'minitest/autorun'

describe 'HexGrid' do
  before do
    @hexgrid = HexGrid.new
  end

  describe 'test cases' do
    it 'ne,ne,ne' do
      @hexgrid.move(['ne', 'ne', 'ne'])
      assert_equal @hexgrid.location, { x: 3, y: 0, z: -3 }
      assert_equal @hexgrid.distance, 3
    end

    it 'ne,ne,sw,sw' do
      @hexgrid.move(['ne', 'ne', 'sw', 'sw'])
      assert_equal @hexgrid.location, { x: 0, y: 0, z: 0 }
      assert_equal @hexgrid.distance, 0
    end

    it 'ne,ne,s,s' do
      @hexgrid.move(['ne', 'ne', 's', 's'])
      assert_equal @hexgrid.location, { x: 2, y: -2, z: 0 }
      assert_equal @hexgrid.distance, 2
    end

    it 'se,sw,se,sw,sw' do
      @hexgrid.move(['se', 'sw', 'se', 'sw', 'sw'])
      assert_equal @hexgrid.location, { x: -1, y: -2, z: 3 }
      assert_equal @hexgrid.distance, 3
    end
  end
end

class HexGrid
  attr_accessor :location, :max_distance

  def initialize
    @location = { x: 0, y: 0, z: 0 }
    @max_distance = 0
  end
  # 1. find the final coordinate
  # 2. hex manhattan distance is (abs(x2 - x1) + abs(y2 - y1) + abs(z2 - z1)) / 2
  def move(directions)
    directions.each do |direction|
      case direction
      when 'nw'
        # +y, -x
        @location[:y] += 1
        @location[:x] -= 1
      when 'n'
        # +y, -z
        @location[:y] += 1
        @location[:z] -= 1
      when 'ne'
        # +x, -z
        @location[:x] += 1
        @location[:z] -= 1
      when 'se'
        # +x, -y
        @location[:x] += 1
        @location[:y] -= 1
      when 's'
        # +z, -y
        @location[:z] += 1
        @location[:y] -= 1
      when 'sw'
        # +z, -x
        @location[:z] += 1
        @location[:x] -= 1
      else
        raise StandardError.new("Unknown direction: #{direction}")
      end

      current_distance = self.distance
      @max_distance = current_distance > @max_distance ? current_distance : @max_distance
    end
  end

  def distance(point = { x: 0, y: 0, z: 0 })
    ((@location[:x] - point[:x]).abs + (@location[:y] - point[:y]).abs + (@location[:z] - point[:z]).abs) / 2
  end
end

directions = IO.read('day11.txt').split(',')

grid = HexGrid.new
grid.move(directions)
puts "Location: #{grid.location}"
puts "Distance: #{grid.distance}"
puts "Max Distance: #{grid.max_distance}"