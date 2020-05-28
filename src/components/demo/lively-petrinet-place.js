import Morph from "src/components/widgets/lively-morph.js"
import ContextMenu from 'src/client/contextmenu.js';
import {pt} from 'src/client/graphics.js';



export default class LivelyPetrinetPlace extends Morph {

  initialize() {
    this.windowTitle = "LivelyPetrinetPlace";
    this.registerButtons();
    this.addEventListener('contextmenu',  evt => this.onContextMenu(evt), false);
    //this.addEventListener("add dot", this, "click", () => this.onClick());
    //this.removeEventListener("add dot", this, "click");
    
  }
  
  attachedCallback() {
  }
  
  detachedCallback() {
  }
  
  
  onAddButton() {
    this.addBall()
  }
  
  
  onContextMenu(evt) {
    if (!evt.shiftKey) {
       evt.stopPropagation();
      evt.preventDefault();

       var menu = new ContextMenu(this, [
          ["add token", () => this.addToken()],
          ["delete token", () => this.deleteToken()],
            ]);
       menu.openIn(document.body, evt, this);
        return true;
      }
  }

      async addToken() {
      const length = 50;
      var token = await (<lively-petrinet-token></lively-petrinet-token>);
      var x = Math.random() * length/2 + length/4;
      var y = Math.random() * length/2 + length/4;
      lively.setPosition(token, pt(x,y));
        
      //lively.setPosition(dot, pt(10, 10));
      this.appendChild(token); 
  }
  
  
  async deleteToken(){
      this.tokens[0].remove()
  }
   
  get tokens() {
    return Array.from(this.querySelectorAll("lively-petrinet-token"));
  }
  
  
}