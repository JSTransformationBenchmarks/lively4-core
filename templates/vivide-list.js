import Morph from './Morph.js';

export default class VivideList extends Morph {
  async initialize() {
    this.windowTitle = "VivideList";
    
    this.transformations = [];
    this.defaultTransformation = list => [];
    
    this.depictions = [];
    this.defaultDepiction = elem => elem;
    
    this.predecessor = null;
    this.successors = [];
  }
  
  register(anotherWidget) {
    this.successors.push(anotherWidget);
    anotherWidget.setPredecessor(this);
  }
  
  trigger() {
    this.show(this.predecessor.output());
  }
  
  setPredecessor(anotherWidget) {
    this.predecessor = anotherWidget;
  }
  
  pushTransformation(transformationFunction) {
    this.transformations.push(transformationFunction);
  }
  
  pushDepiction(depictionFunction) {
    this.depictions.push(depictionFunction);
  }
  
  toggleSelection(wrapper) {
    return () => {
      wrapper.selected = wrapper.selected ? false : true;
      this.display()
      for(let i in this.successors) {
        this.successors[i].trigger();
      }
    }
  }
  
  toggleChildren(level, wrapper) {
    return () => {
      if(wrapper.hasChildren) {
        wrapper.children = [];
        wrapper.hasChildren = false;
      } else {
        wrapper.children =
          this.transformations.length > level+1 ?
          this.transformations[level+1](wrapper.object).map(object => this.wrap(object)) :
          this.defaultTransformation(wrapper.object).map(object => this.wrap(object));
        wrapper.hasChildren = true;
      }
      this.display()
    }
  }
  
  display() {
    // TODO: Better algorithm for textContent
    this.textContent = this.model.map(elem => this.depictions[0](elem.object)).join('<br />');
    this.get("#content").innerHTML = "";
    for(let i in this.model) {
      
      this.displayListEntry(0, this.model[i]);
    
    }
  }
  
  displayListEntry(level, wrapper) {
    let listentry = document.createElement("div");
    listentry.className = "listentry";
    
    let listentryPlaceholder = document.createElement("div");
    listentryPlaceholder.className = "listentry-placeholder";
    listentryPlaceholder.style.width = (level * 4) + "em";
    listentryPlaceholder.innerHTML = "&nbsp;";
      
    let listentryUnfold = document.createElement("div");
    listentryUnfold.className = "listentry-unfold";
    listentryUnfold.addEventListener("click", this.toggleChildren(level, wrapper));
    listentryUnfold.innerHTML = "(v)";
      
    let listentryContent = document.createElement("div");
    listentryContent.className = "listentry-content";
    if(wrapper.selected) { listentryContent.classList.add("selected"); }
    listentryContent.addEventListener("click", this.toggleSelection(wrapper));
    listentryContent.innerHTML =
      this.depictions.length > level ? 
      this.depictions[level](wrapper.object) :
      this.defaultDepiction(wrapper.object);
      
    listentry.appendChild(listentryPlaceholder);
    listentry.appendChild(listentryUnfold);
    listentry.appendChild(listentryContent);
    this.get("#content").appendChild(listentry);
    
    if(wrapper.children) {
      for(let i in wrapper.children) {
        this.displayListEntry(level+1, wrapper.children[i]);
      }
    }
  }
  
  output() {
    return this.model.filter(
      elem => elem.selected
    ).map(
      elem => elem.object
    );
  }
  
  wrap(object) {
    let wrapper = {
      object: object,
      selected: false,
      children: [],
      hasChildren: false,
    }
    return wrapper;
  }
  
  setModel(model) {
    model =
      this.transformations.length > 0 ?
      this.transformations[0](model) :
      this.defaultTransformation(model);
    this.model = model.map(elem => this.wrap(elem));
  }
  
  show(model) {
    this.setModel(model);
    this.display();
  }
  
  livelyExample() {
    this.pushTransformation((list) => {
      return list.filter(elem => elem.age < 100);
    });
    this.pushDepiction(elem => elem.name);
    this.pushTransformation(elem => elem.pets);
    this.pushDepiction(elem => elem.toUpperCase());
    this.show([
      {name: "John Doe", age: 25, pets: ["Waldy", "Smokie"]},
      {name: "Jane Doe", age: 24, pets: ["Jaques-the-Bird"]},
      {name: "Manfred Mustermann", age: 50, pets: ["Georg-Musterhund"]},
      {name: "John Wayne", age: 110, pets: []},
    ]);
  }
}