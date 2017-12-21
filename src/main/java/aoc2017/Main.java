package aoc2017;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {

    public static void day3() {
        Day03 day03 = new Day03("part1");

        day03.generateCoordsMap(571);

        System.out.println(day03.manhattanDistance(325489));
        System.out.println(day03.stressTest(325489));
    }

    public static void day6() {
        ArrayList<Integer> initialMemory = new ArrayList(Arrays.asList(5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6 ));
        Day06 day06 = new Day06(initialMemory);
        System.out.println(day06.countRedistributions());
    }

    public static void main(String[] args) throws IOException, URISyntaxException {
        day6();
    }
}
