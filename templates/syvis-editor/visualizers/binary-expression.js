import operatorMap from '../operatorMap.js'
import walkTree from '../walkTree.js'

export default (node) => {
  const classes = [
    'binaryExpression',
    'operator-' + (operatorMap.binary[node.operator] || ''),
  ]

  return [
    'span',
    {class: classes.join(' ')},
    ['span.left', walkTree(node.left)],
    ['span.right', walkTree(node.right)],
  ]
}
