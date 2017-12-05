package com.returnofthemac;

import java.io.IOException;
import java.net.URISyntaxException;

public class Main {

    public static void main(String[] args) throws IOException, URISyntaxException {
        Day2 day2 = new Day2("part2");

        System.out.println(day2.getData());

        String[] lines = day2.readLines("day2.txt").toArray(String[]::new);

        System.out.println(day2.calcChecksum(lines));
    }
}
