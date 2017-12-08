package aoc2017;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Day2 extends Base implements FileInput {
    public Day2(String part) {
        super(part);
    }

    public IntStream getValues(String row) {
        return Arrays.stream(row.split("\\s+")).mapToInt(Integer::parseInt);
    }

    public int getRowChecksum(String row) {
        return this.part == "part1"
                ? this.sumRow(row)
                : this.divideRow(row);
    }

    public int sumRow(String row) {
        List<Integer> values = this.getValues(row).boxed().collect(Collectors.toList());
        int min = Collections.min(values);
        int max = Collections.max(values);
        return max - min;
    }

    public int divideRow(String row) {
        int[] values = this.getValues(row).toArray();
        int dividend = 1, divisor = 1;
        for(int i = 0; i < values.length; i++) {
            for(int j = 0; j < values.length; j++) {
                if (i == j) continue;
                if (values[i] % values[j] == 0) {
                    return values[i] / values[j];
                }
            }
        }
        return 0;
    }

    public int calcChecksum(String[] rows) {
        return IntStream.range(0, rows.length)
                        .reduce(0, (acc, i) -> acc + this.getRowChecksum(rows[i]));
    }
}
