import HaloItem from './HaloItem.js';
import componentLoader from "src/client/morphic/component-loader.js";

export default class HaloInspectItem extends HaloItem {
  
    onClick() {
      var inspectTarget = window.that;
      var editor = componentLoader.createComponent('lively-object-editor');
      var objectEditorWindow  = document.createElement('lively-window');

      editor.targetElement    = inspectTarget;

      componentLoader.openInWindow(editor).then((objectEditorWindow) => {
        if (objectEditorWindow.centerInWindow)
          objectEditorWindow.centerInWindow(); // #TODO loading async??? Problem
      });
  
      this.hideHalo();
    }
}