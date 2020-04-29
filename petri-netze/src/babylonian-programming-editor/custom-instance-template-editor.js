import Morph from 'src/components/widgets/lively-morph.js';
import { debounce } from "utils";
import InstanceList from "./ui/instance-list.js";
import { AddButton, MinusButton } from "./ui/buttons.js";
import CustomInstance from "./utils/custom-instance.js";

const DEFAULT_CODE = "return null;";

export default class CustomInstanceTemplateEditor extends Morph {

  initialize() {
    this.windowTitle = "Custom Instance Template Editor";

    this._instances = [];
    this._activeInstance = null;
    this._callback = new Function();

    this.initInstanceList();
    this.initEditor();
    this.initButtons();
  }
  
  /*example:*/initInstanceList/*{"id":"3d56_9324_7687","name":{"mode":"input","value":""},"color":"hsl(290, 30%, 70%)","values":{},"instanceId":{"mode":"connect","value":"3d56_9324_7687_this"},"prescript":"","postscript":""}*/() {
    /*probe:*/this._instanceList/*{}*/ = new InstanceList(
      this.get("#instance-list"),
      this._instances,
      (instance) => this.activeInstance = instance
    );
  }
  
  initEditor() {
    this._editor = this.get("#editor");
    this._editor.addEventListener("editor-loaded", () => {
      // Disable linting and syntax checking (otherwise it warns about 'return outside of funcion')
      this._editor.editor.setOption("lint", false);
      this._editor.checkSyntax = new Function();

      // Send feedback to editor on change
      this._editor.editor.on("change", ((value) => {
        if(this._activeInstance) {
          this._activeInstance.code = this._editor.value;
        }
        if(this._callback) {
          this._callback();
        }
      })::debounce(1000));
    });
    
    this._nameInput = this.get("#name-input");
    this._nameInput.addEventListener("change", () => {
      if(this._activeInstance) {
        this._activeInstance.name = this._nameInput.value;
      }
      if(this._callback) {
        this._callback();
      }
      this._instanceList.render();
    });
  }
  
  initButtons() {
    const buttons = this.get("#buttons");
    buttons.innerHTML = "";
    
    buttons.appendChild(AddButton(() => {
      this._instances.push(new CustomInstance("New instance"));
      this._instanceList.render();
    }));
    
    buttons.appendChild(MinusButton(() => {
      if(this._activeInstance) {
        this._instances.splice(this._instances.indexOf(this._activeInstance), 1);
        
        this.activeInstance = null;
        this._instanceList.render();
        
        if(this._callback) {
          this._callback();
        }
      }
    }));
  }
  
  

  setup(instances, callback) {
    this._callback = callback;
    this._instances = instances;
    this._instanceList.instances = instances;
    this.activeInstance = this._instances[0];
  }

  get activeInstance() {
    return this._activeInstance;
  }

  set activeInstance(instance) {
    if(instance && this._instances.includes(instance)) {
      this._activeInstance = instance;
      this._nameInput.value = this._activeInstance.name;
      this._editor.editor.setOption("readonly", false);
      if(this._activeInstance.code && this._activeInstance.code.length) {
        this._editor.value = this._activeInstance.code;
      } else {
        this._editor.value = DEFAULT_CODE;
      }
    } else {
      this._nameInput.value = "";
      this._editor.value = "";
      this._editor.editor.setOption("readonly", true);
    }
    this._instanceList.activeInstance = this._activeInstance;
  }

}
/* Context: {"context":{"prescript":"","postscript":""},"customInstances":[{"id":"cca8_9ef5_45ae","name":"Test Person","code":"return null;"}]} */