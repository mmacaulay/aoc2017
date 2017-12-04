package com.returnofthemac;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

public class Day1 implements FileInput {
    private String data;
    private String mode;

    public Day1(String mode) {
        this.mode = mode;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void loadInputFile() throws IOException, URISyntaxException {
        this.setData(this.readLines("day1.txt").findFirst().orElse("No input!"));
    }

    public boolean considerDigit(int index, List<String> chars) {
        String c = chars.get(index);
        String next= "";
        if (this.mode == "part2") {
            int nextIndex = index + ((chars.size() - 1) / 2);
            if (nextIndex > chars.size() - 2) {
                nextIndex -= (chars.size() - 1);
            }
            System.out.println(String.format("index: %s, nextIndex: %s, size: %s", index, nextIndex, chars.size()));
            next = chars.get(nextIndex);
        } else {
            next = chars.get(index + 1);
        }

        return c.compareTo(next) == 0;
    }

    public int solveCaptcha() {
        List<String> chars = new ArrayList<>(Arrays.asList(this.data.split("")));
        chars.add(chars.get(0));

        int[] res = IntStream.range(0, chars.size() - 1)
                .filter(i -> considerDigit(i, chars)).toArray();

        System.out.println(String.format("res: %s", res.length));

        return IntStream.range(0, chars.size() - 1)
                .filter(i -> considerDigit(i, chars))
                .map(i -> Integer.parseInt(chars.get(i)))
                .reduce(0, (acc, n) -> acc + n);
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
}
