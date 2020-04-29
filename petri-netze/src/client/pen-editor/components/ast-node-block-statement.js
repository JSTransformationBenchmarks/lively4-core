"enable aexpr";

import AbstractAstNode from './abstract-ast-node.js'

export default class AstNodeBlockStatement extends AbstractAstNode {
  async initialize() {
    await super.initialize();
    this.windowTitle = "AstNodeBlockStatement";
  }
  
  async updateProjection() {
    await this.createSubElementForPaths(this.path.get('body'), 'body');
  }
  
}