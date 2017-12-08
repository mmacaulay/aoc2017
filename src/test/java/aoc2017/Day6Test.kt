package aoc2017

import org.junit.Before
import org.junit.Test
import kotlin.test.*
import java.util.*
import kotlin.collections.ArrayList

class Day6Test {
    var day6: Day6 = Day6(ArrayList())

    @Before
    fun setup() {
        day6 = Day6(ArrayList(Arrays.asList(0, 2, 7, 0)))
    }

    @Test
    fun testRedistribute() {
        assertTrue { arrayOf(2, 4, 1, 2).contentEquals(day6.redistribute(arrayOf(0, 2, 7, 0))) }
        assertTrue { arrayOf(3, 1, 2, 3).contentEquals(day6.redistribute(arrayOf(2, 4, 1, 2))) }
        assertTrue { arrayOf(0, 2, 3, 4).contentEquals(day6.redistribute(arrayOf(3, 1, 2, 3))) }
        assertTrue { arrayOf(1, 3, 4, 1).contentEquals(day6.redistribute(arrayOf(0, 2, 3, 4))) }
        assertTrue { arrayOf(2, 4, 1, 2).contentEquals(day6.redistribute(arrayOf(1, 3, 4, 1))) }
    }

    @Test
    fun testPt1() {
        assertEquals(5, day6.countRedistributions())
    }
}