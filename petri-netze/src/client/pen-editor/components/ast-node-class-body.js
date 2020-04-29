"enable aexpr";

import AbstractAstNode from './abstract-ast-node.js'

export default class AstNodeClassBody extends AbstractAstNode {
  async initialize() {
    await super.initialize();
    this.windowTitle = "AstNodeClassBody";
  }
  
  async updateProjection() {
    this.innerHTML = '';

    await this.createSubElementForPaths(this.path.get('body'), 'body');
  }
  
}