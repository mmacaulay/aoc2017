package aoc2017;

import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.*;

public class Day03Test {
    private Day03 day03;

    @Before
    public void setUp() throws Exception {
        day03 = new Day03("part1");
        day03.generateCoordsMap(32);
    }

    @Test
    public void testGenerateCoordsMap() {
        day03.generateCoordsMap(3);
        Coordinate[] coordsMap = day03.getCoordsMap();
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
        assertThat(day03.manhattanDistance(1)).isEqualTo(0);
    }

    @Test
    public void testEx2() {
        assertThat(day03.manhattanDistance(12)).isEqualTo(3);
    }

    @Test
    public void testEx3() {
        assertThat(day03.manhattanDistance(23)).isEqualTo(2);
    }

    @Test
    public void testEx4() {
        assertThat(day03.manhattanDistance(1024)).isEqualTo(31);
    }

    @Test
    public void testPt2Ex1() {
        assertThat(day03.stressTest(1)).isEqualTo(2);
    }

    @Test
    public void testPt2Ex3() {
        assertThat(day03.stressTest(2)).isEqualTo(4);
    }

    @Test
    public void testPt2Ex4() {
        assertThat(day03.stressTest(4)).isEqualTo(5);
    }
}