package aoc2017;

import java.util.stream.IntStream;

public class Day03 extends Base {
    private Coordinate[] coordsMap;

    public Day03(String part) {
        super(part);
        coordsMap = new Coordinate[0];
    }

    public Coordinate[] getCoordsMap() {
        return coordsMap;
    }

    public void generateCoordsMap(int size) {
        this.coordsMap = new Coordinate[size * size];
        int currentRadius = 1, value = 1, maxValue = size * size;
        Coordinate location = new Coordinate(0, 0);
        String direction = "right";

        while(value <= maxValue) {
            coordsMap[value - 1] = new Coordinate(location.x, location.y);

            switch(direction) {
                case "left":
                    if (location.x > -currentRadius) {
                        location.x--;
                    } else {
                        direction = "down";
                        location.y--;
                    }
                    break;
                case "right":
                    if (location.x < currentRadius) {
                        location.x++;
                    } else {
                        direction = "up";
                        location.y++;
                    }
                    break;
                case "up":
                    if (location.y < currentRadius) {
                        location.y++;
                    } else {
                        direction = "left";
                        location.x--;
                    }
                    break;
                case "down":
                    if (location.y > -currentRadius) {
                        location.y--;
                    } else {
                        direction = "right";
                        currentRadius++;
                        location.x++;
                    }
                    break;
            }

            value++;
        }
    }

    public int manhattanDistance(int value) {
        Coordinate coordinate = this.coordsMap[value - 1];
        return Math.abs(coordinate.x) + Math.abs(coordinate.y);
    }

    public void moveLeft(Coordinate c) {
        c.x--;
    }

    public void moveRight(Coordinate c) {
        c.x++;
    }

    public void moveUp(Coordinate c) {
        c.y--;
    }

    public void moveDown(Coordinate c) {
        c.y++;
    }

    public int stressTest(int size) {
        int gridSize = 1024;
        int[][] grid = new int[gridSize][gridSize];

        int currentRadius = 1, value = 1, maxRadius = gridSize / 2;
        Coordinate location = new Coordinate(maxRadius, maxRadius), middle = new Coordinate(maxRadius, maxRadius);
        String direction = "right";

        while(value <= size) {
            grid[location.y][location.x] = value;

            switch(direction) {
                case "left":
                    if (location.x > middle.x - currentRadius) {
                        this.moveLeft(location);
                    } else {
                        direction = "down";
                        this.moveDown(location);
                    }
                    break;
                case "right":
                    if (location.x < middle.x + currentRadius) {
                        this.moveRight(location);
                    } else {
                        direction = "up";
                        this.moveUp(location);
                    }
                    break;
                case "up":
                    if (location.y > middle.y - currentRadius) {
                        this.moveUp(location);
                    } else {
                        direction = "left";
                        this.moveLeft(location);
                    }
                    break;
                case "down":
                    if (location.y < middle.y + currentRadius) {
                        location.y++;
                    } else {
                        direction = "right";
                        currentRadius++;
                        location.x++;
                    }
                    break;
            }

            value = this.sumNeighbours(grid, location);
        }
        return value;
    }

    public int sumNeighbours(int[][] grid, Coordinate location) {
        Coordinate[] possibleNeighbours = new Coordinate[] {
                new Coordinate(location.x - 1, location.y + 1),
                new Coordinate(location.x, location.y + 1),
                new Coordinate(location.x + 1, location.y + 1),
                new Coordinate(location.x + 1, location.y),
                new Coordinate(location.x + 1, location.y - 1),
                new Coordinate(location.x, location.y - 1),
                new Coordinate(location.x - 1, location.y - 1),
                new Coordinate(location.x - 1, location.y),
        };

        return IntStream.range(0, possibleNeighbours.length)
                .reduce(0, (acc, index) -> {
                    Coordinate c = possibleNeighbours[index];
                    return acc + grid[c.y][c.x];
                });
    }
}
