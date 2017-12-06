package com.returnofthemac;

public class Day3 extends Base {
    private int[][] grid;
    private Coordinate[] coordsMap;
    private Coordinate middle;

    public Day3(String part) {
        super(part);
        grid = new int[0][0];
        coordsMap = new Coordinate[0];
        middle = new Coordinate(0, 0);
    }

    public int[][] getGrid() {
        return grid;
    }

    public Coordinate[] getCoordsMap() {
        return coordsMap;
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

    public void generateGrid(int size) {
        this.grid = new int[size][size];

        int maxValue = size * size;
        int currentRadius = (size / 2); // find middle, odd numbers lose their decimal part
        Coordinate location = new Coordinate(currentRadius, currentRadius);
        this.middle = new Coordinate(currentRadius, currentRadius);
        int value = 1;
        String direction = "right";

        while(value <= maxValue) {
            grid[location.y][location.x] = value;

//            System.out.println(String.format("x: %s, y: %s, value: %s, dir: %s", location.x, location.y, value, direction));

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

            value++;
        }
    }

    public void generateCoordsMap(int size) {
        this.coordsMap = new Coordinate[size * size];
        int currentRadius = 1, value = 1, maxValue = size * size;
        Coordinate location = new Coordinate(0, 0);
        String direction = "right";

        while(value <= maxValue) {
            coordsMap[value - 1] = new Coordinate(location.x, location.y);

//            System.out.println(String.format("x: %s, y: %s, value: %s, dir: %s", location.x, location.y, value, direction));

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
}
