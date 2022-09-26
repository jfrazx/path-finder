import type { NavigationEnd } from '../src/navigators/interfaces';
import { Collector } from '../src/collector';
import { expect } from 'chai';

describe(`Collector`, () => {
  let collector: Collector;

  beforeEach(() => {
    collector = new Collector();
  });

  describe('General', () => {
    it(`should be an instance of Collector`, () => {
      expect(collector).to.be.instanceOf(Collector);
    });
  });

  describe(`PathsAdd`, () => {
    it(`should collect a path and options`, () => {
      const path = 'account.id';
      const options: NavigationEnd<any> = {
        path,
        source: 1234,
        endPoint: 'id',
        original: 1234,
        isEndPoint: true,
        meta: { type: 'number' },
      };

      expect(collector.add(path, options)).to.equal(collector);
      expect(collector.size).to.equal(1);
    });

    it(`should collect multiple paths and options`, () => {
      const path1 = 'account.id';
      const path2 = 'accounts[0].id';
      const options: NavigationEnd<any> = {
        path: path1,
        source: 1234,
        endPoint: 'id',
        original: 1234,
        isEndPoint: true,
        meta: { type: 'number' },
      };

      expect(collector.add(path1, options)).to.equal(collector);
      expect(collector.add(path2, options)).to.equal(collector);
      expect(collector.size).to.equal(2);
    });
  });
});
