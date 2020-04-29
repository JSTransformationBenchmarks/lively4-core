import {expect} from 'src/external/chai.js';
import {MockEvent, createHTML, testWorld, loadComponent} from './templates-fixture.js';
import {pt,rect} from 'src/client/graphics.js';

describe("$$TEMPLATE_CLASS",  function() {

  var that;
  before("load", function(done){
    this.timeout(35000);
    var templateName = "$$TEMPLATE_ID";
    loadComponent(templateName).then(c => {that = c; done()}).catch(e => done(e));
  });

  it("should load", function(done) {
    done();
  });

  after("cleanup", function() {
    testWorld().innerHTML = "";
  });

});
