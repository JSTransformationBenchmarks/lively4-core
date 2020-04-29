"enable aexpr";
import { shallowEqualsArray, shallowEqualsSet, shallowEqualsMap, shallowEquals, deepEquals } from 'src/client/reactive/utils/equality.js';

import chai, {expect} from 'src/external/chai.js';
import sinon from 'src/external/sinon-3.2.1.js';
import sinonChai from 'src/external/sinon-chai.js';
chai.use(sinonChai);

describe('testing for equality', () => {
  it('shallowEqualsArray', () => {
    const arr = [1,2,3];
    expect(shallowEqualsArray(arr, arr)).to.be.true;
    expect(shallowEqualsArray([], [])).to.be.true;
    expect(shallowEqualsArray([1], [1])).to.be.true;
    expect(shallowEqualsArray([1], [1,2])).to.be.false;
    expect(shallowEqualsArray([1,2], [1])).to.be.false;
    expect(shallowEqualsArray([1,2], [2,1])).to.be.false;
    const obj1 = {};
    expect(shallowEqualsArray([1, obj1, arr], [1, obj1, arr])).to.be.true;
    
    // not same identity
    expect(shallowEqualsArray([{}], [{}])).to.be.false;
  });

  it('shallowEqualsSet', () => {
    const set = new Set([1,2,3]);
    expect(shallowEqualsSet(set, set)).to.be.true;
    expect(shallowEqualsSet(new Set(), new Set())).to.be.true;
    expect(shallowEqualsSet(new Set([1]), new Set([1]))).to.be.true;
    expect(shallowEqualsSet(new Set([1]), new Set([1,2]))).to.be.false;
    expect(shallowEqualsSet(new Set([1,2]), new Set([1]))).to.be.false;
    expect(shallowEqualsSet(new Set([1,2]), new Set([2,1]))).to.be.true;
    const obj1 = {};
    expect(shallowEqualsSet(new Set([1, obj1, set]), new Set([obj1, 1, set]))).to.be.true;
    
    // not same identity
    expect(shallowEqualsSet(new Set([{}]), new Set([{}]))).to.be.false;
  });

  it('shallowEqualsMap', () => {
    const map = new Map([[1,2],[3,4],[5,6]]);
    expect(shallowEqualsMap(map, map)).to.be.true;
    expect(shallowEqualsMap(new Map(), new Map())).to.be.true;
    expect(shallowEqualsMap(new Map([[1,2]]), new Map([[1,2]]))).to.be.true;
    expect(shallowEqualsMap(new Map([[1,2]]), new Map([[1,2],[3,4]]))).to.be.false;
    expect(shallowEqualsMap(new Map([[1,2],[3,4]]), new Map([[1,2]]))).to.be.false;
    expect(shallowEqualsMap(new Map([[1,2],[3,4]]), new Map([[3,4],[1,2]]))).to.be.true;
    const obj1 = {};
    expect(shallowEqualsMap(new Map([[1,obj1],[map,2]]), new Map([[map,2],[1,obj1]]))).to.be.true;
    
    // not same identity
    expect(shallowEqualsMap(new Map([[1,{}]]), new Map([[1,{}]]))).to.be.false;
  });

  describe('shallowEquals', () => {

    it('identity', () => {
      expect(shallowEquals(1, 1)).to.be.true;
      expect(shallowEquals('hello', 'hello')).to.be.true;

      const obj = {};
      expect(shallowEquals(obj, obj)).to.be.true;

      const map = new Map([[1,2],[3,4],[5,6]]);
      expect(shallowEquals(map, map)).to.be.true;
      
      expect(shallowEquals(undefined, undefined)).to.be.true;

      expect(shallowEquals(1, '1')).to.be.false;
      expect(shallowEquals(true, false)).to.be.false;
      expect(shallowEquals(undefined, true)).to.be.false;
      expect(shallowEquals(undefined, false)).to.be.false;
    });

    it('shallow properties', () => {
      const obj1 = {};
      const obj2 = {};
      const obj3 = { a: 42 };
      const obj4 = { a: 42, b: 17 };
      const obj5 = { b: 17, a: 42 };
      const obj6 = { a: 43, b: 18 };
      expect(shallowEquals(obj1, obj2)).to.be.true;
      expect(shallowEquals(obj2, obj3)).to.be.false;
      expect(shallowEquals(obj3, obj4)).to.be.false;
      expect(shallowEquals(obj4, obj5)).to.be.true;
      expect(shallowEquals(obj5, obj6)).to.be.false;
    });

  });

  describe('deepEquals', () => {

    it('identity', () => {
      expect(deepEquals(1, 1)).to.be.true;
      expect(deepEquals('hello', 'hello')).to.be.true;

      const obj = {};
      expect(deepEquals(obj, obj)).to.be.true;

      const map = new Map([[1,2],[3,4],[5,6]]);
      expect(deepEquals(map, map)).to.be.true;
      
      expect(deepEquals(undefined, undefined)).to.be.true;

      expect(deepEquals(1, '1')).to.be.false;
      expect(deepEquals(true, false)).to.be.false;
      expect(deepEquals(undefined, true)).to.be.false;
      expect(deepEquals(undefined, false)).to.be.false;
    });

    it('shallow properties', () => {
      const obj1 = {};
      const obj2 = {};
      const obj3 = { a: 42 };
      const obj4 = { a: 42, b: 17 };
      const obj5 = { b: 17, a: 42 };
      const obj6 = { a: 43, b: 18 };
      expect(deepEquals(obj1, obj2)).to.be.true;
      expect(deepEquals(obj2, obj3)).to.be.false;
      expect(deepEquals(obj3, obj4)).to.be.false;
      expect(deepEquals(obj4, obj5)).to.be.true;
      expect(deepEquals(obj5, obj6)).to.be.false;
    });

    it('deep properties', () => {
      const obj1 = {
        a: {}
      }
      const obj2 = {
        a: {}
      }
      expect(deepEquals(obj1, obj2)).to.be.true;
    });

    describe('infinite loop detection', () => {
      
      it('infinite loop detection', () => {
        expect(deepEquals({ w: window }, { w: window })).to.be.true;
      });
      
      it('recursive', () => {
        const obj1 = { a: 22 }
        obj1.b = obj1;
        const obj2 = { a: 22 }
        obj2.b = obj2;

        expect(deepEquals(obj1, obj2)).to.be.true;
      });
      
      it('imbalanced recursive', () => {
        const obj1 = {
          x: 22
        }
        obj1.a = obj1;
        const obj2 = {
          x: 22,
          a: {
            x: 22
          }
        }
        obj2.a.a = obj2;

        expect(deepEquals(obj1, obj2)).to.be.true;
      });
      
      it('cross referencing recursive', () => {
        const obj1 = { a: 22 }
        const obj2 = { a: 22 }
        obj1.b = obj2;
        obj2.b = obj1;
        
        expect(deepEquals(obj1, obj2)).to.be.true;
      });

    });
  });
});
