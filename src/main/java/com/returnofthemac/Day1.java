package com.returnofthemac;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Day1 implements FileInput {
    private String data;

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void loadInputFile() throws IOException, URISyntaxException {
        this.setData(this.readLines("day1.txt").findFirst().orElse("No input!"));
    }

    public int solveCaptcha() {
        class AccResult {
            public int lastDigit;
            public int currentSum;
        }

        final int[] lastDigit = {-1};

        List<String> chars = new ArrayList<>(Arrays.asList(this.data.split("")));
        chars.add(chars.get(0));

        return chars.stream()
                .map((s -> Integer.parseInt(s)))
                .reduce(0, (acc, n) -> {
                    System.out.println(String.format("acc: %s, n: %s", acc, n));

                    if (lastDigit[0] == n) {
                        lastDigit[0] = n;
                        return acc + n;
                    } else {
                        lastDigit[0] = n;
                        return acc;
                    }
                });
    }
}
