import {expect} from 'src/external/chai.js';
import {testWorld, loadComponent} from './templates-fixture.js';

describe("Search Component",  function() {

  var that;
  before("load", function(done){
    this.timeout(35000);
    var templateName = "lively-search";
    loadComponent(templateName).then(c => {that = c; done()}).catch(e => done(e));
  });

  it("should load", function(done) {
    done();
  });


  after("cleanup", function() {
    testWorld().innerHTML = "";
  });

});
