package aoc2017;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {

    public static void day3() {
        Day3 day3 = new Day3("part1");

        day3.generateCoordsMap(571);

        System.out.println(day3.manhattanDistance(325489));
        System.out.println(day3.stressTest(325489));
    }

    public static void day6() {
        ArrayList<Integer> initialMemory = new ArrayList(Arrays.asList(5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6 ));
        Day6 day6 = new Day6(initialMemory);
        System.out.println(day6.countRedistributions());
    }

    public static void main(String[] args) throws IOException, URISyntaxException {
        day6();
    }
}
