import Morph from 'src/components/widgets/lively-morph.js';
import babelDefault from 'systemjs-babel-build';
const babel = babelDefault.babel;
import SyntaxChecker from 'src/client/syntax.js'
import sourcemap from 'src/external/source-map.min.js'
import { uuid as generateUUID, debounce, flatmap, executeAllTestRunners, promisedEvent } from 'utils';

export default class PluginExplorer extends Morph {

  static get defaultPluginURL() { return lively4url + "/src/components/tools/lively-ast-explorer-example-plugin.js"; }

  static get defaultWorkspacePath() { return "/src/components/tools/lively-plugin-explorer-playground.workspace"; }

  /*MD ## UI Accessing MD*/

  get container() { return this.get("#content"); }

  get executionConsole() { return this.get("#executionConsole"); }

  get sourceLCM() { return this.get("#source"); }
  get sourceCM() { return this.sourceLCM.editor; }
  get sourceText() { return this.sourceCM.getValue(); }

  get sourceAstInspector() { return this.get("#sourceAst"); }
  
  get pluginEditor() { return this.get("#plugin"); }
  get pluginLCM() { return this.pluginEditor.livelyCodeMirror(); }
  get pluginCM() { return this.pluginEditor.currentEditor(); }
  get pluginSource() { return this.pluginCM.getValue(); }

  async getPlugin() {
    const url = this.fullUrl(this.pluginURL) || "";
    const module = await System.import(url);
    // url +=  "?" + Date.now(); // #HACK, we thought we don't have this to do any more, but ran into a problem when dealing with syntax errors...
    // assumend problem: there is a bad version of the code in either the browser or system.js cache
    // idea: we have to find and flush it...
    // wip: the browser does not cache it, but system.js does...
    return module.default;
  }
  
  get transformedSourceLCM() { return this.get("#transformedSource"); }
  get transformedSourceCM() { return this.transformedSourceLCM.editor; }
  
  get pluginURL() { return this.pluginEditor.getURLString(); }

  get workspacePathInput() { return this.get("#workspace-path"); }
  get workspaceURL() { return this.workspacePathInput.value; }
  set workspaceURL(urlString) { this.workspacePathInput.value = urlString; }
  onWorkspacePathInputEntered(urlString) { this.loadWorkspaceFile(urlString); }
  
  /*MD ## Workspace Options MD*/

  get saveWorkspaceButton() { return this.get("#saveWorkspace"); }
  get autoSaveWorkspace() { return false; } //TODO
  set autoSaveWorkspace(bool) {
    this.saveWorkspaceButton.classList.toggle("on", bool);
  }
  onSaveWorkspace(evt) {
    if (evt.button === 2) {
      this.toggleOption("autoSaveWorkspace");
    } else {
      this.saveWorkspace();
    }
  }

  get updateASTButton() { return this.get("#updateAST"); }
  get autoUpdateAST() { return this.getOption("autoUpdateAST"); }
  set autoUpdateAST(bool) {
    this.updateASTButton.classList.toggle("on", bool);
    this.updateASTButton.querySelector("i").classList.toggle("fa-spin", bool);
  }
  onUpdateAST(evt) {
    if (evt.button === 2) {
      this.toggleOption("autoUpdateAST");
    } else {
      this.updateAST();
    }
  }

  get updateTransformationButton() { return this.get("#updateTransformation"); }
  get autoUpdateTransformation() { return this.getOption("autoUpdateTransformation"); }
  set autoUpdateTransformation(bool) {
    this.updateTransformationButton.classList.toggle("on", bool);
    this.updateTransformationButton.querySelector("i").classList.toggle("fa-spin", bool);
  }
  onUpdateTransformation(evt) {
    if (evt.button === 2) {
      this.toggleOption("autoUpdateTransformation");
    } else {
      this.updateTransformation();
    }
  }

  get runTestsButton() { return this.get("#runTests"); }
  get autoRunTests() { return this.getOption("autoRunTests"); }
  set autoRunTests(bool) {
    this.runTestsButton.classList.toggle("on", bool);
  }
  onRunTests(evt) {
    if (evt.button === 2) {
      this.toggleOption("autoRunTests");
    } else {
      this.runTests();
    }
  }

  get executeButton() { return this.get("#execute"); }
  get autoExecute() { return this.getOption("autoExecute"); }
  set autoExecute(bool) {
    this.executeButton.querySelector("i").classList.toggle("fa-spin", bool);
    this.executeButton.classList.toggle("on", bool);
  }
  onExecute(evt) {
    if (evt.button === 2) {
      this.toggleOption("autoExecute");
    } else {
      this.execute();
    }
  }
  
  get systemJSButton() { return this.get("#toggleSystemJS"); }
  get systemJS() { return this.getOption("systemJS"); }
  set systemJS(bool) {
    this.systemJSButton.classList.toggle("on", bool);
  }
  onToggleSystemJS() { this.toggleOption("systemJS"); }
  
  /*MD ## Options MD*/

  setOption(option, value) {
    this.workspace.options[option] = value;
    this[option] = value;
  }

  getOption(option) {
    if (option in this.workspace.options) {
      return this.workspace.options[option];
    } else {
      return this.optionDefaults[option];
    }
  }

  toggleOption(option) {
    this.setOption(option, !this.getOption(option));
  }

  loadOptions(options) {
    for (const [option, value] of Object.entries(options)) {
      this.setOption(option, value);
    }
  }

  initOptions() {
    for (const [option, value] of Object.entries(this.optionDefaults)) {
      this[option] = value;
    }
  }

  get optionDefaults() {
    return {
      "systemJS": false,
      "autoExecute": true,
      "autoRunTests": false,
      "autoUpdateAST": true,
      "autoUpdateTransformation": true,
      "autoSaveWorkspace": true, 
    }
  }

  /*MD ## Initialization MD*/

  fullUrl(urlString) {
    try {
      return lively.paths.normalizePath(urlString, "");
    } catch(e) {
      return null;
    }
  }

  async initialize() {
    this.windowTitle = "Plugin Explorer";
    this.registerButtons();

    this.workspace = {
      options: {}
    };

    this.initOptions();

    this.getAllSubmorphs("button").forEach(button => {
      button.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.dispatchEvent(new MouseEvent("click", {button: 2}));
      });
    });

    this.debouncedUpdateAST = this.updateAST::debounce(500);
    this.debouncedUpdateTransformation = this.updateTransformation::debounce(500);
    
    function enableSyntaxCheckForEditor(editor) {
      editor.addEventListener("change", (evt => SyntaxChecker.checkForSyntaxErrors(editor.editor))::debounce(200));
    }

    this.pluginEditor.awaitEditor().then(() => {
      this.pluginEditor.hideToolbar();
      this.pluginLCM.doSave = async () => {
        await this.pluginEditor.saveFile();

        await lively.reloadModule("" + this.pluginURL);
        this.updateAST();
      };
      enableSyntaxCheckForEditor(this.pluginLCM);
      // this.pluginLCM.addEventListener("change", evt => {if (this.autoUpdate) this.debouncedUpdateTransformation()});
      this.transformedSourceCM.on("beforeSelectionChange", evt => this.onTransformedSourceSelectionChanged(evt));
    });

    this.sourceLCM.editorLoaded().then(() => {
      this.sourceAstInspector.connectLivelyCodeMirror(this.sourceLCM);
      this.sourceLCM.doSave = async () => {
        // TODO: Save source
        this.updateAST();
      };
      enableSyntaxCheckForEditor(this.sourceLCM);
      this.sourceLCM.addEventListener("change", evt => {if (this.autoUpdateAST) this.debouncedUpdateAST()});
      this.sourceCM.on("beforeSelectionChange", evt => this.onSourceSelectionChanged(evt));
    });

    this.workspacePathInput.addEventListener("keyup", evt => {
      if (evt.code == "Enter") this.onWorkspacePathInputEntered(this.workspacePathInput.value);
    });

    await Promise.all([
      this.pluginEditor.awaitEditor(),
      this.sourceLCM.editorLoaded(),
      this.transformedSourceLCM.editorLoaded(),
    ]);
    
    this.dispatchEvent(new CustomEvent("initialize"));
  }

  async loadFile(urlString) {
    try {
      const url = new URL(this.fullUrl(urlString));
      const response = await fetch(url);
      return response.text();
    } catch (e) {
      lively.error(`Failed to load file '${url}'`);
      return null;
    }
  }

  async saveFile(urlString, contents) {
    try {
      const url = new URL(this.fullUrl(urlString));
      await fetch(url, {
        method: 'PUT', 
        body: contents,
      });
    } catch (e) {
      lively.error(`Failed to save file '${url}'`);
    }
  }

  async loadWorkspaceFile(urlString) {
    try {
      const text = await this.loadFile(urlString);
      const ws = JSON.parse(text);
      this.workspacePathInput.value = urlString;
      this.loadWorkspace(ws);
    } catch (e) {
      lively.error(`Failed to load workspace '${urlString}'`);
    }
  }

  async loadWorkspace(ws) {
    this.workspace = ws;
    this.loadOptions(ws.options);
    this.pluginEditor.setURL(new URL(this.fullUrl(ws.plugin)));
    this.pluginEditor.loadFile();
    //TODO
    this.sourceLCM.value = ""; //new URL(this.fullUrl(ws.source))
  }

  async saveWorkspaceFile(urlString) {
    try {
      const text = JSON.stringify(this.workspace);
      this.saveFile(urlString, text);
    } catch (e) {
      lively.error(`Failed to save workspace '${urlString}'`);
    }
  }

  async saveWorkspace() {
    this.pluginEditor.saveFile();
    this.saveWorkspaceFile(this.workspaceURL);
  }

  /*MD ## Execution MD*/

  async updateAST() {
    try {
      this.ast = this.sourceText.toAST();
      this.sourceAstInspector.inspect(this.ast);
      if (this.autoUpdateTransformation) this.updateTransformation();
    } catch (e) {
      this.ast = null;
      this.sourceAstInspector.inspect({Error: e.message});
    }
  }

  async updateTransformation() {
    const plugin = await this.getPlugin();
    
    try {
      console.group("PLUGIN TRANSFORMATION");
      if (!this.ast) return;
      if (this.systemJS) {
        // use SystemJS config do do a full transform
        if (!self.lively4lastSystemJSBabelConfig) {
          lively.error("lively4lastSystemJSBabelConfig missing");
          return;
        }
        let config = Object.assign({}, self.lively4lastSystemJSBabelConfig);
        let url = this.fullUrl(this.pluginURL) || "";
        let originalPluginURL = url.replace(/-dev/,""); // name of the original plugin .... the one without -dev
        // replace the original plugin with the one under development.... e.g. -dev
        config.plugins = config.plugins.filter(ea => !ea.livelyLocation || !(ea.livelyLocation == originalPluginURL))
                          .concat([plugin])
        let filename = "tempfile.js";
        config.filename = filename
        config.sourceFileName = filename
        config.moduleIds = false
        this.transformationResult = babel.transform(this.sourceText, config);
      } else {
        this.transformationResult = this.ast.transformAsAST(plugin);
      }
      
      this.transformedSourceLCM.value = this.transformationResult.code;
      
      if (this.autoExecute) this.execute();
      if (this.autoRunTests) runTests();
    } catch(err) {
      console.error(err);
      this.transformedSourceLCM.value = "Error: " + err.message;
    } finally {
      console.groupEnd();
    }
  }

  async execute() {
    const log = this.executionConsole;
    log.innerHTML = "";
    log.textContent = "";
    
    const oldLog = console.log
    try {
      console.group("[Plugin Explorer] EXECUTE REWRITTEN FILE");
      console.log = (...fragments) => {
        oldLog.call(console, ...fragments)
        log.textContent += fragments.join(', ') + "\n"
      }
      // #TODO active expressions...
      var transformedSource = this.transformedSourceCM.getValue()
      if (this.systemJS) {
        // use systemjs to load it's module without any further transformation
        var url = "tmp://" + filename // replace this with local TMP 
        
        var modURL = lively.swxURL(url)
        await lively.unloadModule(modURL)
        await fetch(url, {
          method: "PUT",
          body: transformedSource 
        })
        await System.import(modURL)
      } else {
        var result ='' + (await this.transformedSourceLCM.boundEval(transformedSource)).value;
      }
      
      // var result ='' + eval(this.outputEditor.editor.getValue());
      this.executionConsole.textContent += "-> " + result;       
    } catch(e) {
      console.error(e);
      this.executionConsole.textContent += "Error: " + e
    } finally {
      console.log = oldLog
      console.groupEnd();
    }
  }

  runTests() {
    executeAllTestRunners();
  }

  /*MD ## Mapping Sources MD*/

  originalPositionFor(line, column) {
    var smc =  new sourcemap.SourceMapConsumer(this.transformationResult.map)
    return smc.originalPositionFor({
      line: line,
      column: column
    })
  }
  
  generatedPositionFor(line, column) {
    if (!this.transformationResult || !this.transformationResult.map) return; 
    var smc =  new sourcemap.SourceMapConsumer(this.transformationResult.map)
    return smc.generatedPositionFor({
      source: "tempfile.js",
      line: line,
      column: column
    });
  }
  
  mapEditorsFromToPosition(fromTextEditor, toTextEditor, backward) {
    if (backward == true) {
      var method = "originalPositionFor"
    } else {
      method = "generatedPositionFor"
    }
    var range = fromTextEditor.listSelections()[0]
    var start = this[method](range.anchor.line + 1, range.anchor.ch + 1)
    var end = this[method](range.head.line + 1, range.head.ch + 1)

    //lively.notify(`start ${range.anchor.line} ch ${range.anchor.ch} ->  ${start.line} ch ${start.column} / end ${range.head.line} ch ${range.head.ch} -> ${end.line} c ${end.column}`)
    if (!start || !end) return;

    toTextEditor.setSelection(
      {line: start.line - 1, ch:start.column - 1}, {line: end.line -  1, ch: end.column - 1})
  }
  
  onSourceSelectionChanged(evt) {
    setTimeout(() => {
      if(this.sourceLCM.isFocused()) {
        this.mapEditorsFromToPosition(
          this.sourceCM, this.transformedSourceCM, false)
      }
    }, 0);
  }
  onTransformedSourceSelectionChanged(evt) {
    setTimeout(() => {
      if(this.transformedSourceLCM.isFocused()) {
        this.mapEditorsFromToPosition(
          this.transformedSourceCM, this.sourceCM, true)
      }
    }, 0);
  }

  /*MD ## Lively Integration MD*/

  livelyPrepareSave() {
    this.setAttribute('workspace', BabelWorkspace.serialize(this.workspace));
    console.log("PREPARE SAVE (Plugin Explorer)");
  }
  
  livelyMigrate(other) {
    // #TODO: do we still need this?
    this.addEventListener("initialize", () => {
      this.loadWorkspace(other.workspace);
      // this.transformedSourceCM.setValue(other.transformedSourceCM.getValue()); 
      // this.transformationResult = other.transformationResult;
      // this.runsTests = other.runTests;
      // this.updateAST();
    });
  }

  livelyExample() {
    this.loadWorkspaceFile(PluginExplorer.defaultWorkspacePath);
  }
}

class Source {
  get name() {
    return this._name;
  }

  set name(str) {
    return this._name = str;
  }
}

class LocalSource extends Source {
  constructor() {
    super();
  }

  async getContent() {
    return this.content || "";
  }

  async setContent(str) {
    this.content = str;
  }
}

class FileSource extends Source {
  constructor() {
    super();
  }

  fullUrl() {
    const normalizedPath = lively.paths.normalizePath(this.url, "");
    return new URL(normalizedPath);
  }

  async getContent() {
    try {
      const url = this.fullUrl();
      const response = await fetch(url);
      return response.text();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async setContent(text) {
    try {
      const url = this.fullUrl();
      const response = await fetch(url, {
        method: 'PUT', 
        body: text,
      });
      return response.ok;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  get name() {
    return this._name || this.url;
  }
}

class BabelWorkspace {
  static deserialize(json) {
    return JSON.parse(json, ([key, value]) => {
      if (value.type === "local") {
        return Object.assign(new LocalSource(), value);
      } else if (value.type === "file") {
        return Object.assign(new FileSource(), value);
      }
      return value;
    });
  }

  static serialize(ws) {
    return JSON.stringify(ws);
  }
}