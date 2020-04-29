"enable aexpr";

import AbstractAstNode from './abstract-ast-node.js'

import babelDefault from 'systemjs-babel-build';
const babel = babelDefault.babel;

export default class AstNodeProgram extends AbstractAstNode {
  async initialize() {
    await super.initialize();
    this.windowTitle = "AstNodeProgram";
  }
  
  async updateProjection(babelASTNode) {
    await this.createSubElementForPaths(this.path.get('directives'), 'directives');
    await this.createSubElementForPaths(this.path.get('body'), 'body');
  }

}