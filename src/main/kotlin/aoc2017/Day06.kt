package aoc2017

class Day06(initialMemory: ArrayList<Int>) {
    val memoryBanks = initialMemory.toTypedArray()

    fun countRedistributions(): Int {
        var workingMemory = memoryBanks.copyOf()
        var count = 0
        val configurations = HashSet<String>()
        val cycleMap = HashMap<String, Int>()

        do {
            configurations.add(workingMemory.joinToString(","))
            cycleMap[workingMemory.joinToString(",")] = count + 1
            workingMemory = redistribute(workingMemory)
            count++
        } while(!configurations.contains(workingMemory.joinToString(",")))

        println("Cycle count ${count - cycleMap[workingMemory.joinToString(",")]!!}")
        return count
    }

    fun redistribute(memory: Array<Int>): Array<Int> {
        // find max
        var max = 0
        var index = 0
        for(i in memory.indices) {
            if(memory[i] > max) { // I *think* this should suffice to make the first elem with max win the tiebreaker...
                max = memory[i]
                index = i
            }
        }

        // loop over memory, redistributing values
        var blocks = memory[index]
        memory[index] = 0

        var i = index + 1
        if (i > memory.size - 1) i = 0
        while(blocks > 0) {
            memory[i]++
            blocks--
            i++
            if (i > memory.size - 1) i = 0
        }
        return memory
    }
}