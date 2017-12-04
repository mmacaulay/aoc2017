package com.returnofthemac;

import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.*;

public class Day2Test {
    private Day2 day2;
    String[] rows = new String[] {
            "5 1 9 5",
            "7 5 3",
            "2 4 6 8"
    };

    @Before
    public void setUp() throws Exception {
        day2 = new Day2();
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
}
