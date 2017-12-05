package com.returnofthemac;

public class Coordinate {
    public int x;
    public int y;
    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || this.getClass() != other.getClass()) return false;

        Coordinate test = (Coordinate)other;
        return this.x == test.x && this.y == test.y;
    }

    public int hashCode() {
        int hash = 7;
        return 31 * hash * x * y;
    }
}
