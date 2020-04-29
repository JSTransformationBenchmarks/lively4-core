import Morph from 'src/components/widgets/lively-morph.js';
import paper from "src/external/paperjs/paper-core.js";

import ContextMenu from 'src/client/contextmenu.js';

import CommandHistory  from "src/client/command-history.js";

let Path = paper.Path,
	Point = paper.Point;


export default class LivelyPaper extends Morph {
  
  get colours() {
    return ['red', 'green', 'blue', 'yellow', 'black'];
  }
  
  getOffset(obj) {
    return  obj.getBoundingClientRect();
  } 
  
  initPaper() {
    if (this.paper) return this.paper;
    this.paper = new paper.PaperScope();
    this.canvas = this.get("#canvas");
    this.paper.setup(this.canvas);
  }
  
  initialize() {
    this.canv_points = [];
    this.canv_points_current_stroke = [];
    this.undone_canv_points = [];
    this.lastPath = {};
    this.initPaper();

    this.addEventListener('contextmenu',  evt => this.onContextMenu(evt), false);

    lively.addEventListener("drawboard", this.canvas, "pointerdown", 
      (e) => this.onPointerDown(e));

    lively.addEventListener("drawboard", this.canvas, "pointerup", 
      (e) => this.onPointerUp(e));
    
    lively.addEventListener("drawboard", this.canvas, "pointerleave",
      (e) => this.onPointerUp(e));
      
    this.strokes = new CommandHistory();
    
    this.registerButtons();
    
    this.adaptCanvasSize()
   
    
    // setTimeout(() => {
    //  this.load(); // #Hack I don't get it when is paper.js ready? #Issue
    // },10000)

    var obj  =this
    window.setTimeout(function()  {
      try {
        obj.load(); // #Hack I don't get it when is paper.js ready? #Issue
      } catch(e) {
        console.log("Load Paper error: " + e)
      }
    },1000)

  }
  
  adaptCanvasSize() {
    var bounds = this.getBoundingClientRect()
    this.canvas.style.width = bounds.width + "px"
    this.canvas.setAttribute("width", bounds.width + "px")
    this.canvas.style.height = bounds.height + "px"
    this.canvas.setAttribute("height", bounds.height + "px")
    this.paper.view.viewSize = { width: bounds.width, height: bounds.height }
  }
  
  load() {
    // #TODO we know that the state of the svg might diverge frome the state of paper
    var svg = this.querySelector("svg");
    //if (!svg || !this.paper.project) {
    //  setTimeout(() => this.load(), 100) // load later
    //  return
    // }
    // lively.notify("[paper] loaded!")
    // console.log("project", this.paper.project)
    this.paper.project.importSVG(svg);
  }

  clear() {
    this.canv_points = [];
    this.canv_points_current_stroke = [];
    this.undone_canv_points = [];
    this.paper.project.clear();
    this.dispatchExecHandwritingRecognition();
  }
  
  undoStroke() {
    this.strokes.undo();
    
    if (this.canv_points.length > 0) {
      this.undone_canv_points.push(this.canv_points.pop());
    }
    this.dispatchExecHandwritingRecognition();
  }

  redoStroke() {
    this.strokes.redo();
    
    if (this.undone_canv_points.length > 0) {
      this.canv_points.push(this.undone_canv_points.pop())
    }
    this.dispatchExecHandwritingRecognition();
  }
  
  onUndoStroke() {
    this.undoStroke();
  }
  
  onRedoStroke() {
    this.redoStroke();
  }
  
  onPointerDown(evt) {
    this.paper.activate();
    if (evt.pointerType == "mouse" && evt.button == 2) {
      // context menu
      return;
    }
    
    if (evt.pointerType == "pen" && evt.button == 2) {
       // context menu
      // return
    }
    

    evt.stopPropagation();
    evt.preventDefault();
    var id = evt.pointerId;   
    this.offset  = this.getOffset(this.canvas);
    var path = new Path();
    
    if (evt.pointerType == "pen" && evt.button == 2) {
      path.command = "delete";
      path.strokeColor = "red";
    } else {
      path.strokeColor = "black";
      path.strokeWidth = 2;

    }

    this.lastPath[id] = path;
    var x = evt.clientX - this.offset.left;
    var y = evt.clientY - this.offset.top;

    this.canv_points_current_stroke.push({"x": x, "y": y});
    path.moveTo([x, y]); 

    lively.addEventListener("drawboard", this.canvas, "pointermove", (e) => this.onPointerMove(e), false);
  }  
  
  // Event handler called for each pointerdown event:
  onPointerMove(evt) {
    var id = evt.pointerId;   
    var path = this.lastPath[id];
    if (path) {
      
      var x = evt.clientX - this.offset.left;
      var y = evt.clientY - this.offset.top;
      
      this.canv_points_current_stroke.push({"x": x, "y": y});
      var p = {x:x, y:y};
    
      path.lineTo(p);
    }
  }

  onPointerUp(evt) {
    if (this.canv_points_current_stroke.length > 0) {
      this.canv_points.push(this.canv_points_current_stroke);
      this.canv_points_current_stroke = [];
      this.dispatchExecHandwritingRecognition();
    }
    
    this.setAttribute("last-changed", Date.now())
    this.lastPointerUp = Date.now(); // #Hack custom prevent default
    evt.stopPropagation();
    evt.preventDefault();
    
    var id = evt.pointerId;
    var path = this.lastPath[id];
    if (path) {
      if (path.command == "delete") {
        this.paper.project.activeLayer.getItems({class: Path})
          .filter( ea => {
            try { 
              return ea.intersects(path);  
            } catch(e) { return false}
          })
          .forEach( ea => {
            var command = {
              type: "delete",
              stroke: ea,
              container: this.paper.project.activeLayer,
              execute: function(){
                this.stroke.remove();
              },
              unexecute: function(){
                this.container.addChild(this.stroke);
              }
            };
            this.strokes.addCommand(command);
            command.execute();
          });
        path.remove();
      } else {
        path.simplify(1);

        var command = {
          type: "stroke",
          stroke: path,
          container: this.paper.project.activeLayer,
          execute: function() {
            this.container.addChild(this.stroke);
          },
          unexecute: function(){
            this.stroke.remove();
          }
        }
        this.strokes.addCommand(command)
        
      }
      lively.removeEventListener("drawboard", this.canvas, "pointermove");    
      delete this.lastPath[id];

    }
  }
  
  onContextMenu(evt) {
    // if (this.lastPointerUp && (this.lastPointerUp - Date.now() < 1000)) {
    //     evt.stopPropagation();
    //     evt.preventDefault();
    //     return; // #HACK custom prevent default....
    //   }
      
      if (!evt.shiftKey) {
        evt.stopPropagation();
        evt.preventDefault();

        var menu = new ContextMenu(this, [
              ["clear", () => this.clear()],
              ["undo stroke", () => this.undoStroke()],
            ]);
        menu.openIn(document.body, evt, this);
        return true;
      }

  }
  
  save() {
    this.innerHTML = "";
    this.appendChild(this.paper.project.exportSVG());
  }
  
  livelyPrepareSave() {
    this.save()
  }
  
  livelyMigrate(other) {
    var svg = other.paper.project.exportSVG();
    this.initPaper();
    this.paper.project.importSVG(svg);
  }
  
  dispatchExecHandwritingRecognition() {
    this.dispatchEvent(new Event("execHandwritingRecognition"));
  }
  
}
      

     
      