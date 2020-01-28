console.log("NEW SERVICE Worker")

/*MD ## Workflow to edit / run this service worker

1. edit file in lively
2. check "Update on reload" in ![](chrome_debugger_tools.png)
3. goto/open the "[...]/src/worker/service-worker.js" in a browser and press "F5"/reload 

MD*/

importScripts('src/external/focalStorage-swx.js');
/*globals focalStorage */

async function sendMessage(client, data) {
  return new Promise((resolve, reject) => {
    let channel = new MessageChannel()
    var done = false
    channel.port1.onmessage = (...args) => {
      done  = true
      resolve(...args)
    }
    client.postMessage(data, [channel.port2])
    setTimeout(() => {
      if (!done) reject("timeout")
    }, 5 * 60 * 1000)
  })
}

self.addEventListener('fetch', (evt) => {
  
  var url = evt.request.url 
  // console.log("[swx] fetch " +  evt.request.method  + " " + url)  
  
  var method = evt.request.method
  var m =url.match(/^https\:\/\/lively4\/scheme\/(.*)/)
  if (m) {
    var path = "/" + m[1].replace(/^([^/]+)\/+/, "$1/") // expected format...
    
    console.log("[swx] POID GET " + url)  
    evt.respondWith(
      self.clients.get(evt.clientId)
        .then(async client => {
          if (!client) {
            throw new Error(`no client for event found`) 
          }
          return sendMessage(client, {
            name: 'swx:pi:' + method, 
            path: path,
            content: await evt.request.text()
          })
        }).then(evt => {
          return new Response(evt.data.content)              
        }))
  }

  
  m =url.match("https://lively-kernel.org/(voices)|(research)") // #TODO get rid of this!!!
  if (m) {
     if (!evt.request.headers.get("gitusername")) {
       evt.respondWith(
          (async () => {
          var storagePrefix = "LivelySync_"
          var token = await focalStorage.getItem(storagePrefix + "githubToken")
          var username = await focalStorage.getItem(storagePrefix + "githubUsername")
          // var email = await focalStorage.getItem(storagePrefix + "githubEmail")

          // console.log("VOICES AUTH NEEDED " + token + " " + username + " " + email)
          // return new Response(evt.data.content)               
          var headers = new Headers(evt.request.headers || {})
          
          // inject authentification tokens into request
          /*MD ### see also [fetch](edit://src/client/fetch.js) MD*/
          if (!headers.get("gitusername")) {
              headers.set("gitusername",  username)
          } 
          if (!headers.get("gitpassword")) {
              headers.set("gitpassword", token)
          }
          var resp = await fetch(evt.request.url, {
            method: evt.request.method,
            headers: {
              gitusername: username,
              gitpassword: token
            }
          })
          return resp
       })()
       )   
    }
  }
  
  // event.respondWith(promise);
  
})

