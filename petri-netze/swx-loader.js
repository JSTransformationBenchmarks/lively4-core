
// importScripts('src/worker/service-worker.js');


var pendingRequests  = []; // will be used in boot and unset in swx
var startSwxTime = Date.now();

try {

  importScripts('src/worker/service-worker.js');
  
} catch(e) {
  debugger
}
  