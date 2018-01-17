package aoc2017

import org.junit.Before
import org.junit.Test
import kotlin.test.*
import java.util.*
import kotlin.collections.ArrayList

class Day16Test {
    var day16: Day16 = Day16(ArrayList())

    @Before
    fun setup() {
        day16 = Day16(ArrayList(Arrays.asList('a', 'b', 'c', 'd', 'e')))
    }

    @Test
    fun testSpin() {
        assertTrue{
            day16.spin(1)
            println("programs: ${day16.display()}")
            day16.programs.contentEquals(arrayOf('e', 'a', 'b', 'c', 'd'))
        }

        assertTrue {
            day16.spin(7)
            println("programs: ${day16.display()}")
            day16.programs.contentEquals(arrayOf('c', 'd', 'e', 'a', 'b'))
        }
    }

    @Test
    fun testPart1() {
        day16.perform("s1")
        day16.perform("x3/4")
        day16.perform("pe/b")
        assertTrue { arrayOf('b', 'a', 'e', 'd', 'c').contentEquals(day16.programs) }
    }
}