package com.returnofthemac;

import java.io.IOException;
import java.net.URISyntaxException;

public class Main {

    public static void main(String[] args) throws IOException, URISyntaxException {
        Day1 day1 = new Day1("part2");
        day1.loadInputFile();

        System.out.println(day1.getData());

        System.out.println(day1.solveCaptcha());
    }
}
