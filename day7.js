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
  weight: 67
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

const testTree = makeTree(testData)
console.log(`Test root: ${Object.keys(testTree)}`)

const realTree = makeTree(realData)
console.log(`Real root: ${Object.keys(realTree)}`)
