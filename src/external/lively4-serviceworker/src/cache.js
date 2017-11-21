import { Dictionary } from './dictionary.js';
import { Queue } from './queue.js';
import { FavoritsTracker } from './favoritstracker.js';
import Serializer from './serializer.js';
import { ConnectionManager } from './connectionmanager.js';
import * as msg from './messaging.js'

/**
 * This class is supposed to be a general-purpose cache for HTTP requests with different HTTP methods.
 */
export class Cache {
  
  /**
   * Constructs a new Cache object
   * @param fileSystem A reference to the filesystem. Needed to process queued filesystem requests.
   */
  constructor(fileSystem) {
    this._dictionary = new Dictionary();
    this._queue = new Queue();
    this._favorits = new FavoritsTracker();
    this._connectionManager = new ConnectionManager();
    this._fileSystem = fileSystem;
    
    // Register for network status changes
    this._connectionManager.addListener('statusChanged', (status) => {
      if(status.isOnline) {
        // We're back online after being online
        // Process all queued requests
        this._processQueued();
      }
    });
    
    // Define which HTTP methods need result caching, and which need request queueing
    this._cacheMethods = ['OPTIONS', 'GET'];
    this._queueMethods = ['PUT', 'POST'];
  }
  
  /**
   * Fetches a request from the cache or network, according to the caching strategy.
   * To be used e.g. in `event.respondWith(...)`.
   */
  fetch(request, p) {
    if (this._connectionManager.isOnline) {
      return this._onlineResponse(request, p);
    } else {
      return this._offlineResponse(request, p);
    }
  }
  
  /**
   * Returns a response for online devices
   */
  _onlineResponse(request, p) {
    // When online, handle requests normaly and store the result
    return p.then((response) => {
      // Currently, we only store OPTIONS and GET requests in the cache
      if (this._cacheMethods.includes(request.method)) {
        this._put(request, response);
      }
      return response;
    });
  }
  
  /**
   * Returns a response for offline devices
   */
  _offlineResponse(request, p) {
    // When offline, check the cache or put request in queue
    if (this._cacheMethods.includes(request.method)) {
      // Check if the request is in the cache
      return this._match(request).then((response) => {
        if (response) {
          msg.broadcast('Fulfilled request from cache.', 'warning');
          return Serializer.deserialize(response);
        } else {
          msg.broadcast('Could not fulfil request from cache.', 'error');
          return p;
        }
      })
    } else if (this._queueMethods.includes(request.method)) {
      this._enqueue(request);
      msg.broadcast('Queued write request.', 'warning');
      return this._buildFakeResponse();
    }
  }
  
  /**
   * Checks if a request is in the cache
   * @return Promise
   */
  _match(request) {
    return this._dictionary.match(this._buildKey(request));
  }
  
  /**
   * Puts a response for a request in the cache
   * @return Response
   */
  _put(request, response) {
    Serializer.serialize(response).then((serializedResponse) => {
      this._dictionary.put(this._buildKey(request), serializedResponse);
    })
    return response
  }
  
  /**
   * Checks if a request is in the queue
   * @return void
   */
  _enqueue(request) {
    // Serialize the Request object
    Serializer.serialize(request).then((serializedRequest) => {
      // Put the serialized request in the queue
      this._queue.enqueue(serializedRequest);
      
      // Update the cache content to pretend that the data has already been saved
      const key = `GET ${serializedRequest.url}`;
      this._dictionary.match(key).then((response) => {
        if(response) {
          response.body = serializedRequest.body;
          this._dictionary.put(key, response);
        }
      })
    })
  }
  
  /**
   * Processes all queued requests by sending them in the same order
   */
  _processQueued() {
    let processNext = () => {
      // Get oldest entry
      this._queue.dequeue().then((serializedRequest) => {
        // Check if we are done
        if(!serializedRequest) {
          return;
        }
        
        // Send request
        Serializer.deserialize(serializedRequest).then((request) => {
          let url = new URL(request.url);
          if(url.hostname === 'lively4') {
            this._fileSystem.handle(request, url).then(processNext);
          } else {
            fetch(request).then(processNext);
          }
        });
      });
    }
    
    // Start processing queued requests
    processNext();
  }
  
  /**
   * Builds a key for the cache from a request
   * @return String key
   */
  _buildKey(request) {
    return `${request.method} ${request.url}`;
  }
  
  /**
   * Builds a fake Response to return when a Request is enqueued
   * @return Response
   */
  _buildFakeResponse() {
    return new Response(null, {
      status: 202,
      statusText: 'Accepted'
    });
  }
}



/* Old methods used by filesystems */
function open(cache_name) {
  return caches.open(cache_name)
}

export function put(request, response) {
  let blob_text = [Date.now().toString()]
  let blob_type = {type : 'text/html'}
  let blob = new Blob(blob_text, blob_type)
  let resp = new Response(blob)
  open('lively4-cache-line-ages').then((cache) => cache.put(request, resp))
  return open('lively4').then((cache) => cache.put(request, response))
}

export function purge(request) {
  open('lively4-cache-line-ages').then((cache) => cache.delete(request))
  return open('lively4').then((cache) => cache.delete(request))
}

export async function match(request, timeout=-1) {
  try {
    if (timeout != -1) {
      let age = await getAgeOf(request) 
      if (!age) return Promise.resolve(undefined)

      
      let age_v = await age.text()

      if (age && Date.now() - parseInt(age_v) >= timeout) {
        purge(request)
        return Promise.resolve(undefined)
      }
    }

    let cache = await open('lively4')
    let match = await cache.match(request)

    return match
  } catch(e) {
    console.warn('Error happened while matching cache:', e)

    return Promise.resolve(undefined)
  }
}

export function getAgeOf(request) {
  return open('lively4-cache-line-ages').then((cache) => cache.match(request))
}

