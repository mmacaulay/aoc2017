package aoc2017;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

public class Day01 extends Base implements FileInput {
    public Day01(String part) {
        super(part);
    }

    public boolean considerDigit(int index, List<String> chars) {
        String c = chars.get(index);
        String next= "";
        if (this.part == "part2") {
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
}
