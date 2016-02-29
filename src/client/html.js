
'use strict';

export default class HTML {

 static fixLinks(nodes, dir, followPath) {
  if (! followPath) {
    debugger
    throw new Error("argument followPath missing")
  }
  if (! nodes) return
    Array.prototype.forEach.call(nodes, node => {
      if (node.getAttribute) {
        var href = node.getAttribute("href")
        if (href) {
          console.log("fix " + href)
          // #TODO load inplace....
          var path
          if (href.match(/^\//)) {
              path = href // ABSOLTUE paths
          } else if (!href.match(/!([A-Za-z]+):\/\/.+/)) { // ignore FULL URLS
              path = dir + href // that leaves us RELATIVE paths
          }
          if (path) {
            console.log("fix "  + path)
            $(node).click(() => { followPath(path); return false; });

            // ALTERNATIVE to navigate it inline, but the link will not be followed....
            // var link = lively4url + "/draft/start.html?load=" + path
            // node.setAttribute("href", link)
          } else {
            console.log("ignore " + href)
          }
        }
        this.fixLinks(node.childNodes, dir, followPath)
      }
    })
}

}
console.log("loaded html.js")
