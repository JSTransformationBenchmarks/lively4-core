"enable aexpr";

import AbstractAstNode from './abstract-ast-node.js'

export default class AstNodeTryStatement extends AbstractAstNode {
  async initialize() {
    await super.initialize();
    this.windowTitle = "AstNodeTryStatement";
  }
  
  async updateProjection() {
    await this.createSubElementForPath(this.path.get('block'), 'block');
    
    this.classList.toggle('has-handler', this.node.handler)
    if (this.node.handler) {
      await this.createSubElementForPath(this.path.get('handler'), 'handler');
    } else {
      this.removeSubElementInSlot('handler');
    }
    
    this.classList.toggle('has-finalizer', this.node.finalizer)
    if (this.node.finalizer) {
      await this.createSubElementForPath(this.path.get('finalizer'), 'finalizer');
    } else {
      this.removeSubElementInSlot('finalizer');
    }
  }
  
}