package com.returnofthemac;

import java.util.Arrays;
import java.util.stream.IntStream;

public class Day2 extends Base implements FileInput {
    public Day2(String part) {
        super(part);
    }

    public IntStream getValues(String row) {
        return Arrays.stream(row.split("\\s+")).mapToInt(Integer::parseInt);
    }

    public int sumRow(String row) {
        int max = this.getValues(row).max().orElse(0);
        int min = this.getValues(row).min().orElse(0);
        return max - min;
    }

    public int calcChecksum(String[] rows) {
        return IntStream.range(0, rows.length)
                        .reduce(0, (acc, i) -> acc + this.sumRow(rows[i]));
    }
}
