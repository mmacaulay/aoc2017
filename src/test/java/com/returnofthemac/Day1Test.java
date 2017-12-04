package com.returnofthemac;

import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.*;

public class Day1Test {
    private Day1 day1;

    @Before
    public void setUp() throws Exception {
        day1 = new Day1();
    }

    @Test
    public void testEx1() {
        day1.setData("1122");
        assertThat(day1.solveCaptcha()).isEqualTo(3);
    }

    @Test
    public void testEx2() {
        day1.setData("1111");
        assertThat(day1.solveCaptcha()).isEqualTo(4);
    }

    @Test
    public void testEx3() {
        day1.setData("1234");
        assertThat(day1.solveCaptcha()).isEqualTo(0);
    }

    @Test
    public void testEx4() {
        day1.setData("91212129");
        assertThat(day1.solveCaptcha()).isEqualTo(9);
    }
}