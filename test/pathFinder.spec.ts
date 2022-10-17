import { PathFinder } from '../src/finder';
import { objectTraversal } from './lib';
import { expect } from 'chai';

describe(`PathFinder`, () => {
  describe(`General`, () => {
    it(`should be an instance of PathFinder`, () => {
      expect(new PathFinder({ endpoint: '' })).to.be.instanceOf(PathFinder);
    });
  });

  describe(`Paths`, () => {
    it(`should return an iterable`, () => {
      const pathFinder = new PathFinder({ endpoint: 'id', alwaysCollect: false });
      const endPointsIterable = pathFinder.find(objectTraversal);

      expect(endPointsIterable[Symbol.iterator]).to.be.a('function');
    });

    it(`should locate paths from an endpoint`, () => {
      const pathFinder = new PathFinder({ endpoint: 'id', alwaysCollect: false });
      const endpointsIterable = pathFinder.find(objectTraversal);

      const endpoints = [...endpointsIterable];

      expect(endpoints).to.have.length.greaterThan(1);
    });

    it(`should collect all paths`, () => {
      const pathFinder = new PathFinder({ endpoint: '*' });
      const obj = { content: 'stuff', people: [{ id: 1, arms: 5 }] };

      const paths = pathFinder.findAll(obj);

      console.log(paths);
    });
  });

  describe(`Endpoint`, () => {
    it(`should have the correct properties`, () => {
      const pathFinder = new PathFinder({ endpoint: 'id', alwaysCollect: false });
      const [endpoint] = [...pathFinder.find(objectTraversal)];

      const properties = [
        'meta',
        'path',
        'depth',
        'source',
        'endpoint',
        'original',
        'isEndpoint',
      ];

      expect(endpoint).to.be.an('object');
      expect(endpoint).to.have.keys(properties);
      expect(Object.keys(endpoint)).to.have.lengthOf(properties.length);

      expect(endpoint.meta).to.be.an('object');
      expect(endpoint.meta.type).to.equal('number');
    });
  });
});
