const fs = require('fs')
const lines = fs.readFileSync('day7.txt', { encoding: 'utf8' }).split('\n')

const testData = [{
  name: 'pbga',
  weight: 66
}, {
  name: 'xhth',
  weight: 57
}, {
  name: 'ebii',
  weight: 61
}, {
  name: 'havc',
  weight: 66
}, {
  name: 'ktlj',
  weight: 57
}, {
  name: 'fwft',
  weight: 72,
  children: { ktlj: {}, cntj: {}, xhth: {} }
}, {
  name: 'qoyq',
  weight: 66
}, {
  name: 'padx',
  weight: 45,
  children: { pbga: {}, havc: {}, qoyq: {} }
}, {
  name: 'tknk',
  weight: 41,
  children: { ugml: {}, padx: {}, fwft: {} }
}, {
  name: 'jptl',
  weight: 61
}, {
  name: 'ugml',
  weight: 68,
  children: { gyxo: {}, ebii: {}, jptl: {} }
}, {
  name: 'gyxo',
  weight: 61
}, {
  name: 'cntj',
  weight: 57
}]

const realData = lines.map(line => {
  const re = line.match(/([a-z]+) \((\d+)\)( -> ([a-z,].*))?/)
  let result = {
    name: re[1],
    weight: parseInt(re[2], 10)
  }

  if (re[4]) {
    const children = re[4].split(', ')
    result.children = {}
    children.forEach(child => {
      result.children[child] = {}
    })
  }

  return result
})

function makeTree (nodes) {
  const tree = {}
  const orphanedChildren = {}
  nodes.forEach(node => {
    // check for parent in orphanedChildren
    // if node is found in orphanedChildren, attach node to parent (reference in orphanedChildren)
    // else leave it at the root level of tree

    // if we have seen node before (as a child of another node)
    const parent = orphanedChildren[node.name]
    if (parent) {
      // update the parent's reference to this object
      parent.children[node.name] = node
    } else {
      tree[node.name] = node
    }

    // if node has children
      // search the root level of the tree for each child
      // if it is found, remove it from the root of the tree
      // and update the child node on the parent with the root object's instance,
      // so that it will have the real child object with weight and potentially it's own children.
    // else add the child to orphanedChildren with the value being node (parent)
    if (node.children) {
      Object.keys(node.children).forEach(key => {
        const child = tree[key]
        if (child) {
          delete tree[key]
          node.children[key] = child
        } else {
          orphanedChildren[key] = node
        }
      })
    }
  })

  return tree
}

function calcWeight (root) {
  if (!root.children) return root.weight
  return Object.keys(root.children).map(key => {
    return calcWeight(root.children[key])
  }).reduce((a, b) => a + b) + root.weight
}

function checkTowerWeights (root) {
  if (!root.children) return
  const childWeights = Object.keys(root.children).map(name => {
    return {
      name,
      weight: root.children[name].weight,
      towerWeight: calcWeight(root.children[name])
    }
  })
  const towerWeights = childWeights.map(c => c.towerWeight)
  if (Math.max(...towerWeights) !== Math.min(...towerWeights)) {
    console.log(`Uneven weights for node ${root.name}!`)
    console.log(childWeights)
  }

  Object.keys(root.children).forEach(key => checkTowerWeights(root.children[key]))
}

const testTree = makeTree(testData)
const testRootKey = Object.keys(testTree)[0]
console.log(`Test root: ${testRootKey}`)
console.log(`Test tower weights:`)
checkTowerWeights(testTree[testRootKey])

const realTree = makeTree(realData)
const realRootKey = Object.keys(realTree)[0]
console.log(`Real root: ${realRootKey}`)
console.log(`Real tower weights:`)
checkTowerWeights(realTree[realRootKey])
