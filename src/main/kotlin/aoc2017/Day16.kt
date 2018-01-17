package aoc2017

import java.util.*

class Day16(initialPrograms: ArrayList<Char>) {
    companion object: FileInput {
        fun testData() {
            println("*** Test data:")

            val initialPrograms = ArrayList(Arrays.asList('a', 'b', 'c', 'd', 'e'))
            val day16 = Day16(initialPrograms)

            day16.perform("s1")
            day16.perform("x3/4")
            day16.perform("pe/b")

            println(day16.display())
        }

        fun part1() {
            println("*** Part 1:")

            val initialPrograms = ArrayList(Arrays.asList(
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'))

            val day16 = Day16(initialPrograms)
            val input = loadInputFile("day16.txt")

            day16.performMoves(input)

            println(day16.display())
        }

        fun part2() {
            println("*** Part 2:")

            var states = setOf<String>()
            var permutations = listOf<String>()

            val initialPrograms = ArrayList(Arrays.asList(
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'))

            val day16 = Day16(initialPrograms)
            val input = loadInputFile("day16.txt")

            for (i in 0..999999999) {
                if (i % 10000 == 0) println(i)

                day16.performMoves(input)

                val key = day16.programs.joinToString("")
                if (states.contains(key)) {
                    println(permutations[(1000000000 - 1) % permutations.size])
                    break
                }

                states = states + key
                permutations = permutations + key
            }
        }
    }

    var programs = initialPrograms.toTypedArray()

    fun performMoves(moves: String) {
        for (s in moves.split(",")) {
            perform(s)
        }
    }

    fun perform(danceMove: String) {
        val instruction = danceMove[0]
        val move = danceMove.drop(1)

        when(instruction) {
            's' -> {
                val spinSize = move.toInt()
                spin(spinSize)
            }
            'x' -> {
                val cmd = move.split('/')
                swapByIndex(cmd[0].toInt(), cmd[1].toInt())
            }
            'p' -> {
                val cmd = move.split('/')
                swapByName(cmd[0][0], cmd[1][0])
            }
            else -> throw Exception("Unknown instruction: $danceMove")
        }
    }

    fun spin(size: Int) {
        val splitIndex = programs.size - (size % programs.size)
        val partA = programs.slice(IntRange(splitIndex, programs.size - 1))
        val partB = programs.slice(IntRange(0, splitIndex - 1))

        programs = (partA + partB).toTypedArray()
    }

    fun swapByIndex(i: Int, j: Int) {
        val tmp = programs[i]
        programs[i] = programs[j]
        programs[j] = tmp
    }

    fun swapByName(a: Char, b: Char) {
        val i = programs.lastIndexOf(a)
        val j = programs.lastIndexOf(b)
        swapByIndex(i, j)
    }

    fun display(): String {
        return programs.joinToString("")
    }
}