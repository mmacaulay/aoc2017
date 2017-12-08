package aoc2017;

import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.*;

public class Day2Test {
    private Day2 day2;
    String[] rows = new String[] {
            "5 1 9 5",
            "7 5 3",
            "2 4 6 8"
    };

    String[] rows2 = new String[] {
            "5 9 2 8",
            "9 4 7 3",
            "3 8 6 5"
    };

    @Before
    public void setUp() throws Exception {
        day2 = new Day2("part1");
    }

    @Test
    public void testGetValues() {
        assertThat(day2.getValues(rows[0]).toArray()).isEqualTo(new int [] { 5, 1, 9, 5 });
    }

    @Test
    public void testSumRow() {
        assertThat(day2.sumRow(rows[0])).isEqualTo(8);
    }

    @Test
    public void calcChecksum() {
        assertThat(day2.calcChecksum(rows)).isEqualTo(18);
    }

    @Test
    public void part2() {
        day2.setPart("part2");
        assertThat(day2.calcChecksum(rows2)).isEqualTo(9);
    }
}
