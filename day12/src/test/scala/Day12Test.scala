package aoc2017

import org.scalatest._

class TestGraph extends Graph

class GraphSpec extends FunSpec with Matchers {
  describe("Graph") {
    it("builds adjacency lists") {
      val test = new TestGraph()
      val result = test.buildAdjacencyLists("2 <-> 0, 3, 4")
      result should equal(List((0, 2), (3, 2), (4, 2)))
    }

    it("adds edges to adjacency lists") {
      val test = new TestGraph()
      var result = Map.empty[Int, Set[Int]]

      result = test.addToAdjacencyList(result, (0, 2))
      result should equal(Map(0 -> Set(2), 2 -> Set(0)))

      result = test.addToAdjacencyList(result, (3, 2))
      result should equal(Map(0 -> Set(2), 2 -> Set(0, 3), 3 -> Set(2)))

      result = test.addToAdjacencyList(result, (4, 2))
      result should equal(Map(0 -> Set(2), 2 -> Set(0, 3, 4), 3 -> Set(2), 4 -> Set(2)))
    }
  }
}