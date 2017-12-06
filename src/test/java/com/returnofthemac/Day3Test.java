package com.returnofthemac;

import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.*;

public class Day3Test {
    private Day3 day3;

    @Before
    public void setUp() throws Exception {
        day3 = new Day3("part1");
        day3.generateCoordsMap(32);
    }

    @Test
    public void testGenerateCoordsMap() {
        day3.generateCoordsMap(3);
        Coordinate[] coordsMap = day3.getCoordsMap();
        assertThat(coordsMap[0].equals(new Coordinate(0, 0))).isTrue();
        assertThat(coordsMap[1].equals(new Coordinate(1, 0))).isTrue();
        assertThat(coordsMap[2].equals(new Coordinate(1, 1))).isTrue();
        assertThat(coordsMap[3].equals(new Coordinate(0, 1))).isTrue();
        assertThat(coordsMap[4].equals(new Coordinate(-1, 1))).isTrue();
        assertThat(coordsMap[5].equals(new Coordinate(-1, 0))).isTrue();
        assertThat(coordsMap[6].equals(new Coordinate(-1, -1))).isTrue();
        assertThat(coordsMap[7].equals(new Coordinate(0, -1))).isTrue();
        assertThat(coordsMap[8].equals(new Coordinate(1, -1))).isTrue();
    }

    @Test
    public void testEx1() {
        assertThat(day3.manhattanDistance(1)).isEqualTo(0);
    }

    @Test
    public void testEx2() {
        assertThat(day3.manhattanDistance(12)).isEqualTo(3);
    }

    @Test
    public void testEx3() {
        assertThat(day3.manhattanDistance(23)).isEqualTo(2);
    }

    @Test
    public void testEx4() {
        assertThat(day3.manhattanDistance(1024)).isEqualTo(31);
    }

    @Test
    public void testPt2Ex1() {
        assertThat(day3.stressTest(1)).isEqualTo(2);
    }

    @Test
    public void testPt2Ex3() {
        assertThat(day3.stressTest(2)).isEqualTo(4);
    }

    @Test
    public void testPt2Ex4() {
        assertThat(day3.stressTest(4)).isEqualTo(5);
    }
}