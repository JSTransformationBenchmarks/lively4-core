import {expect} from 'src/external/chai.js';
import {MockEvent, createHTML, testWorld, loadComponent} from './templates-fixture.js';
import {pt,rect} from 'src/client/graphics.js';

describe("LivelyDialogTest",  function() {

  var that;
  before("load", function(done){
    this.timeout(35000);
    var templateName = "lively-dialog";
    loadComponent(templateName).then(c => {that = c; done()}).catch(e => done(e));
  });

  it("should load", function(done) {
    done();
  });

  after("cleanup", function() {
    testWorld().innerHTML = "";
  });

});
