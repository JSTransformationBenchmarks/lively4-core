"enable aexpr";

import chai, {expect} from 'node_modules/chai/chai.js';
import sinon from 'src/external/sinon-3.2.1.js';
import sinonChai from 'node_modules/sinon-chai/lib/sinon-chai.js';
chai.use(sinonChai);

'use strict';

describe('Sinon', function() {

    it('should be supported', () => {
        var spy = sinon.spy();

        spy(42);

        expect(spy.withArgs(42).calledOnce).to.be.true;
    });

    it('should be supported with proper integration', () => {
        var spy = sinon.spy();

        spy(42);

        expect(spy).to.be.calledWith(42);
    });

});
