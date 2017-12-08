package aoc2017;

import java.io.IOException;
import java.net.URISyntaxException;

public class Main {

    public static void main(String[] args) throws IOException, URISyntaxException {
        Day3 day3 = new Day3("part1");

        day3.generateCoordsMap(571);

        System.out.println(day3.manhattanDistance(325489));
        System.out.println(day3.stressTest(325489));
    }
}
