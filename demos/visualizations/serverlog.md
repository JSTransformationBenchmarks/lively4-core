# Serverlog

<script>
import d3 from "src/external/d3.v5.js"
import moment from "src/external/moment.js";

// moment("2020-01-29T13:48:38.798Z").toDate().toString()

(async() => {
  var currentlogs = []
  var starttime = performance.now()
  var requestMap = new Map()

  // lively4url + "/demos/data/livelyboot-serverlog.log"
  var url = "https://lively-kernel.org/lively4/lively4-server/server.log"
  //var url = "https://lively-kernel.org/research/lively4-server/server.log"

  var openRequests = new Set()
  var logstring = await fetch(url).then(r => r.text())
  logstring.split("\n").forEach(line => {
    /*
    `[2020-01-29T13:48:38.798Z] [server] REQUEST[0]  START GET	/lively4-jens/swx-loader.js`.match(/\[(.*)\] +\[server\] REQUEST\[([0-9]+)\]  START GET	([^ ]+)/)
    
    `[2020-01-29T13:48:38.898Z] [server] REQUEST[0]  FINISHED GET (100ms) /lively4-jens/swx-loader.js`.match(/\[(.*)\] +\[server\] REQUEST\[([0-9]+)\]  FINISHED GET \(([0-9]+)ms\)/)
    
    `[2020-01-30T10:56:19.678Z] [server] REQUEST[224]  SESSION Sessiond9deecc5-a6a0-4e33-afc9-1f8d2377ff7e`
    */
   
    
    var m = line.match(/\[(.*)\] +\[server\] REQUEST\[([0-9]+)\]  ?(.*)/)
    if (m) {  
      let time = moment(m[1]).toDate().getTime()
      let req = m[2]
      let message = m[3]
      let d
      m = message.match(/START ([A-Z]+)	([^ ]+)/)
      if (m) { 
        let method = m[1]
        let url = m[2]
        let start = time
        let offset = start
        var requests = Array.from(openRequests.values())
        var openPreviousRequest = requests.first
        if (openPreviousRequest) { offset = openPreviousRequest.offset }
        d = {url, req, method, offset, start, messages: []}
        d.openrequests = requests.map(ea => ea.req)
        currentlogs.push(d)
        openRequests.add(d)
        requestMap.set(req, d)
      } else {
        d = requestMap.get(req)
      }
      if (!d) return;
      d.messages.push({time: time, content: message});
      
      m = line.match(/SESSION ([^ ]+)/)
      if (m) {
        d.session = m[3];
      }

      m = line.match(/SYSTEM ([^ ]+)/)
      if (m) {
       d.system = m[1];
      }

      m = line.match(/FINISHED ([A-Z]+) \(([0-9]+)ms\)/)
      if (m) {
        let duration = parseInt(m[2])
        d.time = duration;
        d.finished = time
        openRequests.delete(d)
      }
    }
  })
  // console.log("loaded Bootlog in " + (performance.now() - starttime))


  if (currentlogs.length == 0) {
    return "no log server log: " + url
  }
 
  var chart = await lively.create("d3-barchart")
  chart.style.width = "1200px"
  
  var color = d3.scaleOrdinal(d3.schemeCategory10);           
  var nodeMap = new Map();
  
  var data = currentlogs
    .map(ea => {
      return {
        log: ea,
        children: [],
        label: "[" + ea.req + "] " + ea.url.replace(/.*\//,""),
        x0: ea.start - ea.offset,
        x1: ea.finished - ea.offset,
      }
    })

  
  chart.config({
    onclick(d, evt) {
      if(evt.shiftKey) {
        lively.openInspector(d)
      } else {
      var base = lively4url.replace(/\/[^/]*$/,"")
      lively.openBrowser(base + d.log.url, true)
      }
    },
    color(d) {
      return color(d.log.method) // session
    },
    title(d) {
      return d.log.messages.map(ea => ea.content).join("\n")
      
      // return d.log.mode + " \n" + d.log.url + "\n" + d.log.time.toFixed(2) + "ms"
    }
  })
  
  chart.setData(data)
  chart.updateViz() 
  debugger
  chart.style.height = chart.get("svg").getBBox().height + "px"
  

  return <div>{chart}</div>
})()
</script>