//
// ES6 module loader
//
// Minimal System loader implementation based on
// https://github.com/caridy/es6-micro-loader
//
// Add class and babel transpile support. Transpile targets modern
// chrome browsers and omits much ES5 compatible transformations.
//
import * as path from 'path'
import * as babel from 'babel-core'


export class Loader {
  constructor(options = {}) {
    this._registry = Object.create(null)

    if (options.base) {
      this._base = new URL(options.base)
    }
  }


  get(name) {
    let mod = this._registry[name]

    if (mod && !mod.executed) {
      mod.execute()
    }

    return mod && mod.proxy
  }

  register(name, dependencies, wrapper) {
    if (Array.isArray(name)) {
      this._anonymousEntry = []
      this._anonymousEntry.push.apply(this._anonymousEntry, arguments)
      return // breaking to let the _load function to name the module
    }

    let proxy = Object.create(null)
    let values = Object.create(null)
    let mod, meta

    // creating a new entry in the internal registry
    this._registry[name] = mod = {

      // live bindings
      proxy: proxy,

      // exported values
      values: values,

      // if module is already initialized
      executed: false,

      // normalized dependencies
      dependencies: dependencies.map(dep => {
        return path.normalize(path.resolve(name, '..', dep))
      }),

      // other modules that depends on this so we can push updates into those modules
      dependants: [],

      // method used to push updates of dependencies into the module body
      update: (moduleName, moduleObj) => {
        meta.setters[mod.dependencies.indexOf(moduleName)](moduleObj)
      },

      execute: () => {
        // Flag as executed
        mod.executed = true

        mod.dependencies.map(dep => {
          let imports = this.get(dep) && this._registry[dep].values // optimization to pass plain values instead of bindings

          if (imports) {
            this._registry[dep].dependants.push(name)

            mod.update(dep, imports)
          }
        })

        meta.execute()
      }
    }

    let _export = (identifier, value) => {
      if (typeof identifier === 'object') {
        for (let prop in Object.getOwnPropertyNames(identifier)) {
          _export(prop, identifier[prop])
        }

        return identifier
      }

      values[identifier] = value

      // locking down the updates on the module to avoid infinite loop
      mod.lock = true

      mod.dependants.forEach(function(moduleName) {
        if (this._registry[moduleName] && !this._registry[moduleName].lock) {
          this._registry[moduleName].update(name, values)
        }
      })

      mod.lock = false

      if (!Object.getOwnPropertyDescriptor(proxy, identifier)) {
          Object.defineProperty(proxy, identifier, {
              enumerable: true,
              get: () => {
                  return values[identifier]
              }
          })
      }

      return value
    }

    // collecting execute() and setters[]
    meta = wrapper(_export)
  }


  async import(modName, options = {}) {
    let name = path.normalize(modName)
    let mod = this.get(name)

    if (mod) {
      return mod
    }

    await this.load(name, options)

    return this.get(name)
  }


  async transpile(blob, {filename}) {
    let source = babel.transform(blob, {
      plugins: [
        require("babel-plugin-syntax-async-functions"),
        require("babel-plugin-syntax-async-generators"),
        require("babel-plugin-syntax-do-expressions"),
        require("babel-plugin-syntax-exponentiation-operator"),
        require("babel-plugin-syntax-export-extensions"),
        require("babel-plugin-syntax-function-bind"),
        require("babel-plugin-syntax-object-rest-spread"),
        require("babel-plugin-syntax-trailing-function-commas"),
        require("babel-plugin-transform-async-to-generator"),
        require("babel-plugin-transform-async-to-module-method"),
        require("babel-plugin-transform-do-expressions"),
        require("babel-plugin-transform-es2015-destructuring"),
        require("babel-plugin-transform-es2015-modules-systemjs"),
        require("babel-plugin-transform-exponentiation-operator"),
        require("babel-plugin-transform-export-extensions"),
        require("babel-plugin-transform-function-bind"),
        require("babel-plugin-transform-object-rest-spread"),
      ],
      sourceMaps: 'inline',
      filename: filename,
      sourceFileName: filename
    })

    return source
  }


  async resolve(name) {
    return do {
      if (this._base) {
        new URL(path.normalize('./' + name), this._base)
      } else {
        name
      }
    }
  }


  async fetch(uri) {
    let response = await self.fetch(uri)

    if (response.status != 200) {
      throw new Error('Could not fetch: ' + name)
    }

    let blob = await response.text()

    return blob
  }


  async load(name, options = {}) {
    let uri = await this.resolve(name, options)
    let blob = await this.fetch(uri, options)

    let source = await this.transpile(blob, {
      moduleId: name,
      filename: name
    })

    let code = source.code + '\n//# sourceURL=' + uri + '!transpiled'

    new Function(code)()

    if (this._anonymousEntry) {
      this.register(name, this._anonymousEntry[0], this._anonymousEntry[1]);
      this._anonymousEntry = undefined;
    }

    let mod = this._registry[name]

    if (!mod) {
      throw new Error('Error loading module ' + name)
    }

    return Promise.all(mod.dependencies.map(dependency => {
      if (this._registry[dependency]) {
        return Promise.resolve()
      } else {
        return this.load(dependency)
      }
    }))
  }
}
