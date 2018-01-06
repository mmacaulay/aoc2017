package aoc2017

import akka.actor.{Props, Actor, ActorSystem}
import akka.pattern.ask
import akka.util.Timeout
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ Future, Promise }
import scala.io.Source

case class AddToLists(line: String)
case class GetGroup(vertex: Int)
case object CountGroups

trait Graph {
  // Part 1:
  // 1. build adjacency lists for all nodes in input
  // 2. starting at 0, visit all adjacent nodes recursively,
  // keeping a list of unique programs encountered
  // (use an akka actor to store the list of unique programs,
  // and to determine if a program's adjacency list has been visited)

  // takes input such as "2 <-> 0, 3, 4"
  // and returns (0, 2), (3, 2), (4, 2)
  def buildAdjacencyLists(line: String): List[Tuple2[Int, Int]] = {
    val strs = line.split("<->").map(_.trim)
    val first = strs(0).toInt
    strs(1).split(",").map(_.trim.toInt).zipAll(List(first), first, first).toList
  }

  def addToAdjacencyList(adjacencyLists: Map[Int, Set[Int]], edge: Tuple2[Int, Int]): Map[Int, Set[Int]] = {
    val (first, second) = edge
    val firstSet = adjacencyLists.getOrElse(first, Set.empty[Int])
    val secondSet = adjacencyLists.getOrElse(second, Set.empty[Int])
    adjacencyLists ++ List(first -> (firstSet + second), second -> (secondSet + first))
  }

  def getGroup(adjLists: Map[Int, Set[Int]], vertex: Int, group: Set[Int] = Set.empty): Set[Int] = {
    group.contains(vertex) match {
      case true => group
      case false => {
        adjLists.getOrElse(vertex, Set.empty[Int])
          .map(v => getGroup(adjLists, v, group + vertex))
          .reduce((g1, g2) => g1 ++ g2)
      }
    }
  }

  // Part 2:
  // iterate over the keys in adjacency lists
  // maintain a set of elements that have been seen before
  // also maintain a count of groups that have been calculated
  // every time we encounter a key that is not in our set,
  // generate the group for that key, then add all of it's elements
  // to our set, and increment the group count
  def countGroups(adjLists: Map[Int, Set[Int]], keys: List[Int], elements: Set[Int] = Set.empty, count: Int = 0): Int = {
    keys.headOption match {
      case Some(key) => {
        elements.contains(key) match {
          case true => count + countGroups(adjLists, keys.tail, elements, count)
          case false => {
            val group = getGroup(adjLists, key)
            count + 1 + countGroups(adjLists, keys.tail, elements ++ group, count)
          }
        }
      }
      case None => count
    }
  }
}

class Day12 extends Actor with Graph {
  implicit val timeout = Timeout(5 seconds)
  var adjacencyLists: Map[Int, Set[Int]] = Map.empty

  def receive = {
    case AddToLists(line) => {
      buildAdjacencyLists(line).foreach(edge => {
        adjacencyLists = addToAdjacencyList(adjacencyLists, edge)
      })
      sender ! None
    }

    case GetGroup(vertex) => {
      sender ! getGroup(adjacencyLists, vertex)
    }

    case CountGroups => {
      sender ! countGroups(adjacencyLists, adjacencyLists.keys.toList)
    }

    case x => println("Unhandled message: " + x)
  }
}

object Main extends App {
  implicit val timeout = Timeout(5 seconds)

  val system = ActorSystem("Day12")

  val day12 = system.actorOf(Props(new Day12))
  Thread.sleep(2000)

  val filename = "day12.txt"
  val futures = Source.fromResource(filename).getLines.map(line => {
    day12 ? AddToLists(line)
  })

  Future.sequence(futures).map(_ => {
    (day12 ? GetGroup(0))
      .mapTo[Set[Int]]
      .map(g => {

        println("")
        println("************ SO NOISY JEEZ")
        println("************ Group size: " + g.size)
        println("************")
        println("")
      })

    (day12 ? CountGroups)
      .mapTo[Int]
      .map(c => {
        println("")
        println("************ SO NOISY JEEZ")
        println("************ Group count: " + c)
        println("************")
        println("")
      })
  })
}