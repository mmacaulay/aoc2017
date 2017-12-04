package com.returnofthemac;

import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.*;

public class Day1Test {
    private Day1 day1;

    @Before
    public void setUp() throws Exception {
        day1 = new Day1("part1");
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

    @Test
    public void testPt2Ext1() {
        day1.setPart("part2");
        day1.setData("1212");
        assertThat(day1.solveCaptcha()).isEqualTo(6);
    }

    @Test
    public void testPt2Ext2() {
        day1.setPart("part2");
        day1.setData("1221");
        assertThat(day1.solveCaptcha()).isEqualTo(0);
    }

    @Test
    public void testPt2Ext3() {
        day1.setPart("part2");
        day1.setData("123425");
        assertThat(day1.solveCaptcha()).isEqualTo(4);
    }

    @Test
    public void testPt2Ext4() {
        day1.setPart("part2");
        day1.setData("123123");
        assertThat(day1.solveCaptcha()).isEqualTo(12);
    }

    @Test
    public void testPt2Ext5() {
        day1.setPart("part2");
        day1.setData("12131415");
        assertThat(day1.solveCaptcha()).isEqualTo(4);
    }
}