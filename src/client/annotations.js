import _ from 'src/external/lodash/lodash.js'
import diff from 'src/external/diff-match-patch.js';
const dmp = new diff.diff_match_patch();

import { uuid as genUUID } from 'utils';

export class Annotation {
  constructor(config) {
    this.from = 0, // starts here...
    this.to =  0  // stops before 
    Object.keys(config).forEach(key => {
      this[key] = config[key]
    })
  }
  
  equalsRegion(region) {
    return this.from == region.from && this.to == region.to
  } 
  
  equals(annotation) {
    // do not check for classes.. we should also compare to structurally indentical objects?
    // if (!(annotation instanceof Annotation)) return false;
    
    for(let key of Object.keys(this)) {
      if (this[key] != annotation[key]) return false
    }
    // and the other way around....
    for(let key of Object.keys(annotation)) {
      if (this[key] != annotation[key]) return false
    }
    return true
  }
  
  get length() {
    return this.to - this.from
    
  }
  
  codeMirrorMark(cm) {
    var marker = cm.markText(cm.posFromIndex(this.from), cm.posFromIndex(this.to), 
      {
        className: "lively-annotation",
        attributes: {
          "data-annotation": JSON.stringify(this)
        },
        css: `background-color: ${this.color ? this.color : "lightgrey" }` });
    return marker
  }
  
  intersectRegion(region) {
    if (this.to < region.from) return null
    if (region.to < this.from) return null
    return {from: Math.max(this.from, region.from), to: Math.min(this.to, region.to)}
  }
  
  isInRegion(region) {
    // could alternatively use insersectRegion ...
    return region.from < this.to && this.to < region.to 
      || region.from <= this.from && this.from < region.to;
  }
  
  cutRegion(region) {
    var intersection = this.intersectRegion(region)
    if (!intersection) return this
    if (this.equalsRegion(intersection)) return null // cut complete
    if (intersection.from == this.from) {
      this.from = intersection.to
      return this
    } else if (intersection.to == this.to) {
      this.to = intersection.from
      return this
    } else {
      // split annotation
      var rest = this.clone()
      this.to = intersection.from
      rest.from = intersection.to
      return [this, rest] // and here we #Alias, annotations should deal with this with indirection 
                          // (e.g. ids that point to the real data if necessary)
    }
  }
}

export default class AnnotationSet {

  constructor(annotationsAndVersions=[]) {
    this.list = [];
    this.reference;
    for(let ea of annotationsAndVersions) {
      if (ea.type == "Reference") {
        this.version = ea.version // multiple text references per annotations file not (yet) supported 
      } else {
        this.add(ea)
      }
    }
  }
  
  *[Symbol.iterator] () {
    for(var ea of this.list) {
      yield ea;  
    }  
  }

  get size() {
    return this.list.length
  }
  
  add(annotation) {
    if (!this.has(annotation)) {
      this.list.push(new Annotation(annotation))
    }
  }

  addAll(annotations) {
    for(let ea of annotations) {
      this.add(ea)
    }
  }

  remove(annotation) {
    this.list = this.list.filter(ea => !ea.equals(annotation))
  }

  removeAll(annotations) {
    this.list = this.list.filter(ea => !annotations.has(ea))
  }


  equals(other) {
    if (this.size != other.size) return false
    for(let ea of this) {
      if (!other.has(ea)) return false
    }
    return true
  }
/*MD # Design Challenge

What should a "diff" of annotations actually look like?

should it be based on the Set semantics... and actually look for identical annotations, 
e.g. same "from" and "to" and same payload..

Or should we split up the text annotations in regions... and normalize the annotations through that way?

How do we deal with "duplicates" and or overlapping "annotations" in the first place...



MD*/

  
  mergeWithTransform(mytransformDiff, other, otherTransformDiff, parent, parentTransformDiff) {
    var transformedMe = this.applyTextDiff(mytransformDiff)
    var transformedOther = otherTransformDiff.applyTextDiff(otherTransformDiff)
    var transformedParent = this.applyTextDiff(parentTransformDiff)
    return transformedMe.merge(transformedOther, transformedParent)
  }


  merge(other, lastCommonParent) {
    // {from, to} of {this, other, lastCommonParent} reference same text    

    var diffA = lastCommonParent.diff(this)
    var diffB = lastCommonParent.diff(other)
  
    var result = lastCommonParent.clone()
    result.removeAll(diffA.del)
    result.removeAll(diffB.del)
    result.addAll(diffA.add)
    result.addAll(diffB.add)
    
    return result
  }


  diff(otherAnnotationSet) {
    var result = this.compare(otherAnnotationSet)
    
    // #TODO 
    // compare is very basic... some of the added and deleteted might be mutatated?

    return result
    
  }

  has(annotation) {
    // #TODO #Performance bug... lineas with complex equals...
    let found =  this.list.find(ea => ea.equals(annotation)) 
    return found ? true : false
  }


  // basic comparison... of actual annotations...
  compare(b) {
    var a = this
    var same = new AnnotationSet()
    var add = new AnnotationSet()
    var del = new AnnotationSet()
    for(let ea of a) {
      if (b.has(ea)) {
        same.add(ea)
      } else {
        del.add(ea)
      }
    }
    for(let ea of b) {
      if (!same.has(ea)) {
        add.add(ea)
      }
    }
    return {same, add, del}
  } 

  removeFromTo(from, to) {
    var region = {from, to}
    for(let ea of this) {
      var intersection = ea.intersectRegion(region)
      if (intersection) {
        if (ea.equalsRegion(intersection)) {
          this.remove(ea)
        } else {
          ea.cutRegion(intersection)
        }
      } 
    }
  }
  
  annotationsInRegion(region = {from: 0, to:0, content: ""}) {
    var result = new Set()
    for(let ea of this) {
      if (this.isInRegion(region, ea)) {
        this.add(ea)       
      }
    }
    return result
  }

  applyTextDiff(textDiff) {
    let pos = 0;
    for (let change of textDiff) {
      let isAdd = change[0] == 1;
      let isDel = change[0] == -1;
      let isSame = change[0] == 0;
      let length = change[1].length;
      let newpos = pos + length;
      let delOrAdd = isDel ? -1 : 1;
      if (isAdd || isDel) {
        for (let annotation of this.list) {

          // simplest implementation... just grow and shrink with the diff
          if (pos <= annotation.from) {
            annotation.from += delOrAdd * length;
          }
          if (pos <= annotation.to) {
            annotation.to += delOrAdd * length;
          }
        }
      }
      if (isAdd || isSame) {
        pos = newpos;
      }
    }
  }

  toJSON() {
    return JSON.stringify(this.list);
  }

  toJSONL() {
    return this.list.map(ea => JSON.stringify(ea)).join("\n");    
  }

  toXML(text) {
    let regions = this.regions(text);
    var xml = regions.map(ea => {
      var s = ea.content;
      for(let annotation of this) {
        if (annotation.isInRegion(ea)) {
          s = `<${annotation.name}>${s}</${annotation.name}>`;
        }
      }
      return s;
    }).join("");
    return xml;
  }

  static fromJSONL(source) {
    var list = source.split("\n").map(ea => {
      try{ 
        return JSON.parse(ea) 
      } catch(e) {
        console.warn("[annotations] could not parse linke: " + ea)
      }
    }).filter(ea => ea)
    return new AnnotationSet(list)
  }

  regions(text) {
    var splitters = new Set();
    this.list.forEach(ea => {
      splitters.add(ea.from);
      splitters.add(ea.to);
    });
    if (text) {
      splitters.add(text.length);
    }
    splitters = Array.from(splitters).sort((a, b) => a-b);
    var regions = [];
    var last = 0;

    for (var pos of splitters) {
      regions.push({ from: last, to: pos, content: text && text.slice(last, pos) });
      last = pos;
    }

    return regions;
  }
  
  renderCodeMirrorMarks(cm) {
    cm.getAllMarks().forEach(ea => ea.clear())
    
    for(let ea of this) {
      ea.codeMirrorMark(cm)
    }
  }


  clone() {
    return AnnotationSet.fromJSON(this.toJSON());
  }

  static fromJSON(json) {
    return new AnnotationSet(JSON.parse(json));
  }
}


export class AnnotatedText {
  
  constructor(text, annotations) {
    this.text = text || ""
    this.annotations = new AnnotationSet()
    if (annotations instanceof AnnotationSet) {
      this.annotations = annotations
    } else if (_.isString(annotations)) {
      annotations.split("\n").forEach(ea => {
        try {
          var a = JSON.parse(ea)
          this.annotations.add(a)
        } catch(e) {
          console.error("Annotation could not be parsed: " + ea, e)
        }
      })
    } else {
      // JSON?
    }
    
  }
  
  static async fromURL(fileURL, annotationsURL) {
    var resp = await fetch(fileURL)
    var text = await resp.text()
    var response = await fetch(annotationsURL)
    var annotations = AnnotationSet.fromJSONL((await response.text()))
    annotations.fileURL = fileURL
    annotations.annotationsURL = annotationsURL
    annotations.lastVersion = response.headers.get("fileversion")
    var annotatedText = new AnnotatedText(text, annotations)
    
    
    return annotatedText 
  }  
  
  async saveToURL(fileURL, annotationsURL) {
    await lively.files.saveFile(fileURL, this.text) 
    await lively.files.saveFile(annotationsURL, this.annotations.toJSONL()) 
  }
  
  
  // set text and upate annotations
  setText(string) {
    var oldText = this.text
    this.text = string
    let textDiff = dmp.diff_main(oldText, this.text);
    this.annotations.applyTextDiff(textDiff)
  }
  
  toHTML() {
    return this.annotations.toXML(this.text)
  }
  
  static fromHTML(html) {
    
    var annotations = new AnnotationSet();
    
    var string = ""
  
    function visit(node, notfirst) {
      if (!node || !node.childNodes) return;
      if (node instanceof Text) {
        string += node.textContent
      } else {
        if (notfirst) {
          var annotation = new Annotation({
            from: string.length, 
            to: string.length + node.textContent.length, 
            name: node.localName})
          annotations.add(annotation)
        }
        // for (let attr of node.attributes) {
        //   //  TODO
        // }
      }
      for(let ea of node.childNodes) {
        visit(ea, true)
      }
    }
    
    var parser = new DOMParser();
    var doc = parser.parseFromString(html,"text/html");
    visit(doc.body)
    var annotatedText = new AnnotatedText(string, annotations);
    return annotatedText
  }
  
  clone() {
    return new AnnotatedText(this.text, this.annotations.clone())
  }
  
}

