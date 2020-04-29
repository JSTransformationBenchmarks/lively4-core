! function(t) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).superagent = t()
  }
}(function() {
  var t = {
    exports: {}
  };

  function e(t) {
    if (t) return function(t) {
      for (var r in e.prototype) t[r] = e.prototype[r];
      return t
    }(t)
  }
  t.exports = e, e.prototype.on = e.prototype.addEventListener = function(t, e) {
    return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
  }, e.prototype.once = function(t, e) {
    function r() {
      this.off(t, r), e.apply(this, arguments)
    }
    return r.fn = e, this.on(t, r), this
  }, e.prototype.off = e.prototype.removeListener = e.prototype.removeAllListeners = e.prototype.removeEventListener = function(t, e) {
    if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
    var r, o = this._callbacks["$" + t];
    if (!o) return this;
    if (1 == arguments.length) return delete this._callbacks["$" + t], this;
    for (var n = 0; n < o.length; n++)
      if ((r = o[n]) === e || r.fn === e) {
        o.splice(n, 1);
        break
      } return 0 === o.length && delete this._callbacks["$" + t], this
  }, e.prototype.emit = function(t) {
    this._callbacks = this._callbacks || {};
    for (var e = new Array(arguments.length - 1), r = this._callbacks["$" + t], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
    if (r) {
      o = 0;
      for (var n = (r = r.slice(0)).length; o < n; ++o) r[o].apply(this, e)
    }
    return this
  }, e.prototype.listeners = function(t) {
    return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
  }, e.prototype.hasListeners = function(t) {
    return !!this.listeners(t).length
  }, t = t.exports;
  var r;

  function o(t) {
    return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
  }
  r = i, i.default = i, i.stable = a, i.stableStringify = a;
  var n = [];

  function i(t, e, r) {
    ! function t(e, r, i, s) {
      var a;
      if ("object" == o(e) && null !== e) {
        for (a = 0; a < i.length; a++)
          if (i[a] === e) return s[r] = "[Circular]", void n.push([s, r, e]);
        if (i.push(e), Array.isArray(e))
          for (a = 0; a < e.length; a++) t(e[a], a, i, e);
        else {
          var u = Object.keys(e);
          for (a = 0; a < u.length; a++) {
            var p = u[a];
            t(e[p], p, i, e)
          }
        }
        i.pop()
      }
    }(t, "", [], void 0);
    for (var i = JSON.stringify(t, e, r); 0 !== n.length;) {
      var s = n.pop();
      s[0][s[1]] = s[2]
    }
    return i
  }

  function s(t, e) {
    return t < e ? -1 : t > e ? 1 : 0
  }

  function a(t, e, r) {
    for (var i = function t(e, r, i, a) {
        var u;
        if ("object" == o(e) && null !== e) {
          for (u = 0; u < i.length; u++)
            if (i[u] === e) return a[r] = "[Circular]", void n.push([a, r, e]);
          if ("function" == typeof e.toJSON) return;
          if (i.push(e), Array.isArray(e))
            for (u = 0; u < e.length; u++) t(e[u], u, i, e);
          else {
            var p = {},
              h = Object.keys(e).sort(s);
            for (u = 0; u < h.length; u++) {
              var c = h[u];
              t(e[c], c, i, e), p[c] = e[c]
            }
            if (void 0 === a) return p;
            n.push([a, r, e]), a[r] = p
          }
          i.pop()
        }
      }(t, "", [], void 0) || t, a = JSON.stringify(i, e, r); 0 !== n.length;) {
      var u = n.pop();
      u[0][u[1]] = u[2]
    }
    return a
  }

  function u(t) {
    return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
  }
  var p = function(t) {
      return null !== t && "object" == u(t)
    },
    h = {};

  function c(t) {
    return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
  }

  function l(t) {
    if (t) return function(t) {
      for (var e in l.prototype) Object.prototype.hasOwnProperty.call(l.prototype, e) && (t[e] = l.prototype[e]);
      return t
    }(t)
  }
  h = l, l.prototype.clearTimeout = function() {
    return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), clearTimeout(this._uploadTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, delete this._uploadTimeoutTimer, this
  }, l.prototype.parse = function(t) {
    return this._parser = t, this
  }, l.prototype.responseType = function(t) {
    return this._responseType = t, this
  }, l.prototype.serialize = function(t) {
    return this._serializer = t, this
  }, l.prototype.timeout = function(t) {
    if (!t || "object" != c(t)) return this._timeout = t, this._responseTimeout = 0, this._uploadTimeout = 0, this;
    for (var e in t)
      if (Object.prototype.hasOwnProperty.call(t, e)) switch (e) {
        case "deadline":
          this._timeout = t.deadline;
          break;
        case "response":
          this._responseTimeout = t.response;
          break;
        case "upload":
          this._uploadTimeout = t.upload;
          break;
        default:
          console.warn("Unknown timeout option", e)
      }
    return this
  }, l.prototype.retry = function(t, e) {
    return 0 !== arguments.length && !0 !== t || (t = 1), t <= 0 && (t = 0), this._maxRetries = t, this._retries = 0, this._retryCallback = e, this
  };
  var f = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];
  l.prototype._shouldRetry = function(t, e) {
    if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1;
    if (this._retryCallback) try {
      var r = this._retryCallback(t, e);
      if (!0 === r) return !0;
      if (!1 === r) return !1
    } catch (o) {
      console.error(o)
    }
    if (e && e.status && e.status >= 500 && 501 !== e.status) return !0;
    if (t) {
      if (t.code && -1 !== f.indexOf(t.code)) return !0;
      if (t.timeout && "ECONNABORTED" === t.code) return !0;
      if (t.crossDomain) return !0
    }
    return !1
  }, l.prototype._retry = function() {
    return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this._end()
  }, l.prototype.then = function(t, e) {
    var r = this;
    if (!this._fullfilledPromise) {
      var o = this;
      this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise(function(t, e) {
        o.on("abort", function() {
          var t = new Error("Aborted");
          t.code = "ABORTED", t.status = r.status, t.method = r.method, t.url = r.url, e(t)
        }), o.end(function(r, o) {
          r ? e(r) : t(o)
        })
      })
    }
    return this._fullfilledPromise.then(t, e)
  }, l.prototype.catch = function(t) {
    return this.then(void 0, t)
  }, l.prototype.use = function(t) {
    return t(this), this
  }, l.prototype.ok = function(t) {
    if ("function" != typeof t) throw new Error("Callback required");
    return this._okCallback = t, this
  }, l.prototype._isResponseOK = function(t) {
    return !!t && (this._okCallback ? this._okCallback(t) : t.status >= 200 && t.status < 300)
  }, l.prototype.get = function(t) {
    return this._header[t.toLowerCase()]
  }, l.prototype.getHeader = l.prototype.get, l.prototype.set = function(t, e) {
    if (p(t)) {
      for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && this.set(r, t[r]);
      return this
    }
    return this._header[t.toLowerCase()] = e, this.header[t] = e, this
  }, l.prototype.unset = function(t) {
    return delete this._header[t.toLowerCase()], delete this.header[t], this
  }, l.prototype.field = function(t, e) {
    if (null == t) throw new Error(".field(name, val) name can not be empty");
    if (this._data) throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
    if (p(t)) {
      for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && this.field(r, t[r]);
      return this
    }
    if (Array.isArray(e)) {
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && this.field(t, e[o]);
      return this
    }
    if (null == e) throw new Error(".field(name, val) val can not be empty");
    return "boolean" == typeof e && (e = String(e)), this._getFormData().append(t, e), this
  }, l.prototype.abort = function() {
    return this._aborted ? this : (this._aborted = !0, this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort"), this)
  }, l.prototype._auth = function(t, e, r, o) {
    switch (r.type) {
      case "basic":
        this.set("Authorization", "Basic ".concat(o("".concat(t, ":").concat(e))));
        break;
      case "auto":
        this.username = t, this.password = e;
        break;
      case "bearer":
        this.set("Authorization", "Bearer ".concat(t))
    }
    return this
  }, l.prototype.withCredentials = function(t) {
    return void 0 === t && (t = !0), this._withCredentials = t, this
  }, l.prototype.redirects = function(t) {
    return this._maxRedirects = t, this
  }, l.prototype.maxResponseSize = function(t) {
    if ("number" != typeof t) throw new TypeError("Invalid argument");
    return this._maxResponseSize = t, this
  }, l.prototype.toJSON = function() {
    return {
      method: this.method,
      url: this.url,
      data: this._data,
      headers: this._header
    }
  }, l.prototype.send = function(t) {
    var e = p(t),
      r = this._header["content-type"];
    if (this._formData) throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
    if (e && !this._data) Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});
    else if (t && this._data && this._isHost(this._data)) throw new Error("Can't merge these send calls");
    if (e && p(this._data))
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (this._data[o] = t[o]);
    else "string" == typeof t ? (r || this.type("form"), r = this._header["content-type"], this._data = "application/x-www-form-urlencoded" === r ? this._data ? "".concat(this._data, "&").concat(t) : t : (this._data || "") + t) : this._data = t;
    return !e || this._isHost(t) ? this : (r || this.type("json"), this)
  }, l.prototype.sortQuery = function(t) {
    return this._sort = void 0 === t || t, this
  }, l.prototype._finalizeQueryString = function() {
    var t = this._query.join("&");
    if (t && (this.url += (this.url.indexOf("?") >= 0 ? "&" : "?") + t), this._query.length = 0, this._sort) {
      var e = this.url.indexOf("?");
      if (e >= 0) {
        var r = this.url.substring(e + 1).split("&");
        "function" == typeof this._sort ? r.sort(this._sort) : r.sort(), this.url = this.url.substring(0, e) + "?" + r.join("&")
      }
    }
  }, l.prototype._appendQueryString = function() {
    console.warn("Unsupported")
  }, l.prototype._timeoutError = function(t, e, r) {
    if (!this._aborted) {
      var o = new Error("".concat(t + e, "ms exceeded"));
      o.timeout = e, o.code = "ECONNABORTED", o.errno = r, this.timedout = !0, this.abort(), this.callback(o)
    }
  }, l.prototype._setTimeouts = function() {
    var t = this;
    this._timeout && !this._timer && (this._timer = setTimeout(function() {
      t._timeoutError("Timeout of ", t._timeout, "ETIME")
    }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(function() {
      t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT")
    }, this._responseTimeout))
  };
  var d = {
      type: function(t) {
        return t.split(/ *; */).shift()
      },
      params: function(t) {
        return t.split(/ *; */).reduce(function(t, e) {
          var r = e.split(/ *= */),
            o = r.shift(),
            n = r.shift();
          return o && n && (t[o] = n), t
        }, {})
      },
      parseLinks: function(t) {
        return t.split(/ *, */).reduce(function(t, e) {
          var r = e.split(/ *; */),
            o = r[0].slice(1, -1);
          return t[r[1].split(/ *= */)[1].slice(1, -1)] = o, t
        }, {})
      }
    },
    y = {};

  function m(t) {
    if (t) return function(t) {
      for (var e in m.prototype) Object.prototype.hasOwnProperty.call(m.prototype, e) && (t[e] = m.prototype[e]);
      return t
    }(t)
  }
  y = m, m.prototype.get = function(t) {
    return this.header[t.toLowerCase()]
  }, m.prototype._setHeaderProperties = function(t) {
    var e = t["content-type"] || "";
    this.type = d.type(e);
    var r = d.params(e);
    for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (this[o] = r[o]);
    this.links = {};
    try {
      t.link && (this.links = d.parseLinks(t.link))
    } catch (n) {}
  }, m.prototype._setStatusProperties = function(t) {
    var e = t / 100 | 0;
    this.statusCode = t, this.status = this.statusCode, this.statusType = e, this.info = 1 === e, this.ok = 2 === e, this.redirect = 3 === e, this.clientError = 4 === e, this.serverError = 5 === e, this.error = (4 === e || 5 === e) && this.toError(), this.created = 201 === t, this.accepted = 202 === t, this.noContent = 204 === t, this.badRequest = 400 === t, this.unauthorized = 401 === t, this.notAcceptable = 406 === t, this.forbidden = 403 === t, this.notFound = 404 === t, this.unprocessableEntity = 422 === t
  };
  var _ = {};

  function b(t) {
    return function(t) {
      if (Array.isArray(t)) {
        for (var e = 0, r = new Array(t.length); e < t.length; e++) r[e] = t[e];
        return r
      }
    }(t) || function(t) {
      if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
    }(t) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance")
    }()
  }

  function w() {
    this._defaults = []
  } ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function(t) {
    w.prototype[t] = function() {
      for (var e = arguments.length, r = new Array(e), o = 0; o < e; o++) r[o] = arguments[o];
      return this._defaults.push({
        fn: t,
        args: r
      }), this
    }
  }), w.prototype._setDefaults = function(t) {
    this._defaults.forEach(function(e) {
      t[e.fn].apply(t, b(e.args))
    })
  }, _ = w;
  var v, T = {};

  function g(t) {
    return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
  }

  function E() {}
  "undefined" != typeof window ? v = window : "undefined" == typeof self ? (console.warn("Using browser-only version of superagent in non-browser environment"), v = void 0) : v = self;
  var O = T = T = function(t, e) {
    return "function" == typeof e ? new T.Request("GET", t).end(e) : 1 === arguments.length ? new T.Request("GET", t) : new T.Request(t, e)
  };
  T.Request = R, O.getXHR = function() {
    if (v.XMLHttpRequest && (!v.location || "file:" !== v.location.protocol || !v.ActiveXObject)) return new XMLHttpRequest;
    try {
      return new ActiveXObject("Microsoft.XMLHTTP")
    } catch (t) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0")
    } catch (t) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0")
    } catch (t) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP")
    } catch (t) {}
    throw new Error("Browser-only version of superagent could not find XHR")
  };
  var x = "".trim ? function(t) {
    return t.trim()
  } : function(t) {
    return t.replace(/(^\s*|\s*$)/g, "")
  };

  function k(t) {
    if (!p(t)) return t;
    var e = [];
    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && S(e, r, t[r]);
    return e.join("&")
  }

  function S(t, e, r) {
    if (void 0 !== r)
      if (null !== r)
        if (Array.isArray(r)) r.forEach(function(r) {
          S(t, e, r)
        });
        else if (p(r))
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && S(t, "".concat(e, "[").concat(o, "]"), r[o]);
    else t.push(encodeURIComponent(e) + "=" + encodeURIComponent(r));
    else t.push(encodeURIComponent(e))
  }

  function j(t) {
    for (var e, r, o = {}, n = t.split("&"), i = 0, s = n.length; i < s; ++i) - 1 === (r = (e = n[i]).indexOf("=")) ? o[decodeURIComponent(e)] = "" : o[decodeURIComponent(e.slice(0, r))] = decodeURIComponent(e.slice(r + 1));
    return o
  }

  function A(t) {
    return /[\/+]json($|[^-\w])/.test(t)
  }

  function C(t) {
    this.req = t, this.xhr = this.req.xhr, this.text = "HEAD" !== this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
    var e = this.xhr.status;
    1223 === e && (e = 204), this._setStatusProperties(e), this.headers = function(t) {
      for (var e, r, o, n, i = t.split(/\r?\n/), s = {}, a = 0, u = i.length; a < u; ++a) - 1 !== (e = (r = i[a]).indexOf(":")) && (o = r.slice(0, e).toLowerCase(), n = x(r.slice(e + 1)), s[o] = n);
      return s
    }(this.xhr.getAllResponseHeaders()), this.header = this.headers, this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), null === this.text && t._responseType ? this.body = this.xhr.response : this.body = "HEAD" === this.req.method ? null : this._parseBody(this.text ? this.text : this.xhr.response)
  }

  function R(t, e) {
    var r = this;
    this._query = this._query || [], this.method = t, this.url = e, this.header = {}, this._header = {}, this.on("end", function() {
      var t, e = null,
        o = null;
      try {
        o = new C(r)
      } catch (n) {
        return (e = new Error("Parser is unable to parse the response")).parse = !0, e.original = n, r.xhr ? (e.rawResponse = void 0 === r.xhr.responseType ? r.xhr.responseText : r.xhr.response, e.status = r.xhr.status ? r.xhr.status : null, e.statusCode = e.status) : (e.rawResponse = null, e.status = null), r.callback(e)
      }
      r.emit("response", o);
      try {
        r._isResponseOK(o) || (t = new Error(o.statusText || "Unsuccessful HTTP response"))
      } catch (n) {
        t = n
      }
      t ? (t.original = e, t.response = o, t.status = o.status, r.callback(t, o)) : r.callback(null, o)
    })
  }

  function q(t, e, r) {
    var o = O("DELETE", t);
    return "function" == typeof e && (r = e, e = null), e && o.send(e), r && o.end(r), o
  }
  return O.serializeObject = k, O.parseString = j, O.types = {
    html: "text/html",
    json: "application/json",
    xml: "text/xml",
    urlencoded: "application/x-www-form-urlencoded",
    form: "application/x-www-form-urlencoded",
    "form-data": "application/x-www-form-urlencoded"
  }, O.serialize = {
    "application/x-www-form-urlencoded": k,
    "application/json": r
  }, O.parse = {
    "application/x-www-form-urlencoded": j,
    "application/json": JSON.parse
  }, y(C.prototype), C.prototype._parseBody = function(t) {
    var e = O.parse[this.type];
    return this.req._parser ? this.req._parser(this, t) : (!e && A(this.type) && (e = O.parse["application/json"]), e && t && (t.length > 0 || t instanceof Object) ? e(t) : null)
  }, C.prototype.toError = function() {
    var t = this.req,
      e = t.method,
      r = t.url,
      o = "cannot ".concat(e, " ").concat(r, " (").concat(this.status, ")"),
      n = new Error(o);
    return n.status = this.status, n.method = e, n.url = r, n
  }, O.Response = C, t(R.prototype), h(R.prototype), R.prototype.type = function(t) {
    return this.set("Content-Type", O.types[t] || t), this
  }, R.prototype.accept = function(t) {
    return this.set("Accept", O.types[t] || t), this
  }, R.prototype.auth = function(t, e, r) {
    return 1 === arguments.length && (e = ""), "object" == g(e) && null !== e && (r = e, e = ""), r || (r = {
      type: "function" == typeof btoa ? "basic" : "auto"
    }), this._auth(t, e, r, function(t) {
      if ("function" == typeof btoa) return btoa(t);
      throw new Error("Cannot use basic auth, btoa is not a function")
    })
  }, R.prototype.query = function(t) {
    return "string" != typeof t && (t = k(t)), t && this._query.push(t), this
  }, R.prototype.attach = function(t, e, r) {
    if (e) {
      if (this._data) throw new Error("superagent can't mix .send() and .attach()");
      this._getFormData().append(t, e, r || e.name)
    }
    return this
  }, R.prototype._getFormData = function() {
    return this._formData || (this._formData = new v.FormData), this._formData
  }, R.prototype.callback = function(t, e) {
    if (this._shouldRetry(t, e)) return this._retry();
    var r = this._callback;
    this.clearTimeout(), t && (this._maxRetries && (t.retries = this._retries - 1), this.emit("error", t)), r(t, e)
  }, R.prototype.crossDomainError = function() {
    var t = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
    t.crossDomain = !0, t.status = this.status, t.method = this.method, t.url = this.url, this.callback(t)
  }, R.prototype.agent = function() {
    return console.warn("This is not supported in browser version of superagent"), this
  }, R.prototype.buffer = R.prototype.ca, R.prototype.ca = R.prototype.agent, R.prototype.write = function() {
    throw new Error("Streaming is not supported in browser version of superagent")
  }, R.prototype.pipe = R.prototype.write, R.prototype._isHost = function(t) {
    return t && "object" == g(t) && !Array.isArray(t) && "[object Object]" !== Object.prototype.toString.call(t)
  }, R.prototype.end = function(t) {
    this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = t || E, this._finalizeQueryString(), this._end()
  }, R.prototype._setUploadTimeout = function() {
    var t = this;
    this._uploadTimeout && !this._uploadTimeoutTimer && (this._uploadTimeoutTimer = setTimeout(function() {
      t._timeoutError("Upload timeout of ", t._uploadTimeout, "ETIMEDOUT")
    }, this._uploadTimeout))
  }, R.prototype._end = function() {
    if (this._aborted) return this.callback(new Error("The request has been aborted even before .end() was called"));
    var t = this;
    this.xhr = O.getXHR();
    var e = this.xhr,
      r = this._formData || this._data;
    this._setTimeouts(), e.onreadystatechange = function() {
      var r = e.readyState;
      if (r >= 2 && t._responseTimeoutTimer && clearTimeout(t._responseTimeoutTimer), 4 === r) {
        var o;
        try {
          o = e.status
        } catch (n) {
          o = 0
        }
        if (!o) {
          if (t.timedout || t._aborted) return;
          return t.crossDomainError()
        }
        t.emit("end")
      }
    };
    var o = function(e, r) {
      r.total > 0 && (r.percent = r.loaded / r.total * 100, 100 === r.percent && clearTimeout(t._uploadTimeoutTimer)), r.direction = e, t.emit("progress", r)
    };
    if (this.hasListeners("progress")) try {
      e.addEventListener("progress", o.bind(null, "download")), e.upload && e.upload.addEventListener("progress", o.bind(null, "upload"))
    } catch (a) {}
    e.upload && this._setUploadTimeout();
    try {
      this.username && this.password ? e.open(this.method, this.url, !0, this.username, this.password) : e.open(this.method, this.url, !0)
    } catch (a) {
      return this.callback(a)
    }
    if (this._withCredentials && (e.withCredentials = !0), !this._formData && "GET" !== this.method && "HEAD" !== this.method && "string" != typeof r && !this._isHost(r)) {
      var n = this._header["content-type"],
        i = this._serializer || O.serialize[n ? n.split(";")[0] : ""];
      !i && A(n) && (i = O.serialize["application/json"]), i && (r = i(r))
    }
    for (var s in this.header) null !== this.header[s] && Object.prototype.hasOwnProperty.call(this.header, s) && e.setRequestHeader(s, this.header[s]);
    this._responseType && (e.responseType = this._responseType), this.emit("request", this), e.send(void 0 === r ? null : r)
  }, O.agent = function() {
    return new _
  }, ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function(t) {
    _.prototype[t.toLowerCase()] = function(e, r) {
      var o = new O.Request(t, e);
      return this._setDefaults(o), r && o.end(r), o
    }
  }), _.prototype.del = _.prototype.delete, O.get = function(t, e, r) {
    var o = O("GET", t);
    return "function" == typeof e && (r = e, e = null), e && o.query(e), r && o.end(r), o
  }, O.head = function(t, e, r) {
    var o = O("HEAD", t);
    return "function" == typeof e && (r = e, e = null), e && o.query(e), r && o.end(r), o
  }, O.options = function(t, e, r) {
    var o = O("OPTIONS", t);
    return "function" == typeof e && (r = e, e = null), e && o.send(e), r && o.end(r), o
  }, O.del = q, O.delete = q, O.patch = function(t, e, r) {
    var o = O("PATCH", t);
    return "function" == typeof e && (r = e, e = null), e && o.send(e), r && o.end(r), o
  }, O.post = function(t, e, r) {
    var o = O("POST", t);
    return "function" == typeof e && (r = e, e = null), e && o.send(e), r && o.end(r), o
  }, O.put = function(t, e, r) {
    var o = O("PUT", t);
    return "function" == typeof e && (r = e, e = null), e && o.send(e), r && o.end(r), o
  }, T
});
