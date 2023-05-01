import type { Endpoint } from '../src/interfaces';
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
      const options: Endpoint<any> = {
        path,
        depth: 2,
        source: 1234,
        endpoint: 'id',
        original: 1234,
        isEndpoint: true,
        pathComplete: true,
        meta: { type: 'number' },
      };

      expect(collector.collect(options)).to.equal(collector);
      expect(collector.size).to.equal(1);
    });

    it(`should collect multiple paths and options`, () => {
      const path1 = 'account.id';
      const path2 = 'accounts[0].id';
      const options: Endpoint<any> = {
        depth: 2,
        path: path1,
        source: 1234,
        endpoint: 'id',
        original: 1234,
        isEndpoint: true,
        pathComplete: true,
        meta: { type: 'number' },
      };

      expect(collector.collect(options)).to.equal(collector);
      expect(collector.collect({ ...options, path: path2 })).to.equal(collector);
      expect(collector.size).to.equal(2);
    });
  });
});
