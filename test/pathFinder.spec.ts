import type { Endpoint } from '../src/interfaces';
import { PathFinder, pathFinder } from '../src';
import { objectTraversal } from './lib';
import { expect } from 'chai';

describe(`PathFinder`, () => {
  describe(`General`, () => {
    it(`should be an instance of PathFinder`, () => {
      expect(new PathFinder()).to.be.instanceOf(PathFinder);
    });

    it(`should generate an instance of PathFinder`, () => {
      expect(pathFinder()).to.be.instanceOf(PathFinder);
    });
  });

  describe(`Errors`, () => {
    it(`should throw an Error when no endpoint is provided`, () => {
      const finder = new PathFinder();

      expect(() => finder.find({})).to.throw(
        'PathFinder: No suitable endpoint provided: undefined',
      );
    });

    it(`should throw an Error when an invalid endpoint is provided`, () => {
      const finder = new PathFinder();

      expect(() => finder.find({}, { endpoint: null as any })).to.throw(
        'PathFinder: No suitable endpoint provided: null',
      );

      expect(() => finder.find({}, { endpoint: 99 as any })).to.throw(
        'PathFinder: No suitable endpoint provided: 99',
      );
    });
  });

  describe(`Paths`, () => {
    it(`should return an array`, () => {
      const pathFinder = new PathFinder({ endpoint: 'id', alwaysCollect: false });
      const endPoints = pathFinder.find(objectTraversal);

      expect(endPoints).to.be.an('array');
    });

    it(`should locate paths from an endpoint`, () => {
      const pathFinder = new PathFinder({ endpoint: 'id', alwaysCollect: false });
      const endpoints = pathFinder.find(objectTraversal);

      const paths = [
        'person.id',
        'person.shape.id',
        'content.items[0].id',
        'content.items[1].id',
        'content.items[1].attributes[2].person.id',
      ];

      expect(endpoints).to.have.lengthOf(paths.length);

      endpoints.forEach((endpoint) => {
        expect(endpoint.isEndpoint).to.be.true;
        expect(paths).to.include(endpoint.path);
        expect(endpoint.meta.type).to.equal('number');
      });
    });

    it(`should collect endpoints with a RegExp`, () => {
      const pathFinder = new PathFinder({ endpoint: /ri/ });
      const endpoints = pathFinder.find(objectTraversal);

      const paths = [
        'person.ripped',
        'content.items[0].description',
        'content.items[1].description',
        'content.items[1].attributes',
      ];

      expect(endpoints).to.have.lengthOf(paths.length);

      endpoints.forEach((endpoint) => {
        expect(endpoint.isEndpoint).to.be.true;
        expect(paths).to.include(endpoint.path);
      });
    });

    it(`should collect endpoints with a RegExp and disabled preemptive endpoints`, () => {
      const pathFinder = new PathFinder({ endpoint: /ri/, preemptiveEndpoints: false });
      const endpoints = pathFinder.find(objectTraversal);

      const paths = [
        'person.ripped',
        'content.items[0].description',
        'content.items[1].description',
        'content.items[1].attributes',
        'content.items[1].attributes[2].person.ripped',
      ];

      expect(endpoints).to.have.lengthOf(paths.length);

      endpoints.forEach((endpoint) => {
        expect(endpoint.isEndpoint).to.be.true;
        expect(paths).to.include(endpoint.path);
      });
    });

    it(`should return the first match`, () => {
      const pathFinder = new PathFinder({ endpoint: 'id' });
      const endpoint = pathFinder.first(objectTraversal) as Endpoint<any>;

      expect(endpoint.path.endsWith('id')).to.be.true;
    });

    it(`should return an empty array if no endpoints are located`, () => {
      const pathFinder = new PathFinder({ endpoint: 'catfish' });
      const endpoints = pathFinder.find(objectTraversal);

      expect(endpoints).to.have.lengthOf(0);
    });

    it(`should map all paths`, () => {
      const obj = { content: 'stuff', people: [{ id: 1, arms: 5 }] };
      const pathFinder = new PathFinder();

      const endpoints = pathFinder.map(obj);

      expect(endpoints).to.have.lengthOf(5);

      const types = {
        people: { type: 'array', depth: 1 },
        content: { type: 'string', depth: 1 },
        'people[0]': { type: 'object', depth: 2 },
        'people[0].id': { type: 'number', depth: 3 },
        'people[0].arms': { type: 'number', depth: 3 },
      };

      const paths = Object.keys(types);

      endpoints.forEach((endpoint) => {
        expect(endpoint.isEndpoint).to.be.true;
        expect(paths).to.include(endpoint.path);
        expect(endpoint.original).to.equal(obj);
        expect(endpoint.endpoint).to.equal('*');
        expect(endpoint.depth).to.equal(types[endpoint.path].depth);
        expect(endpoint.meta.type).to.equal(types[endpoint.path].type);
      });
    });
  });

  describe(`Endpoint`, () => {
    it(`should have the correct properties`, () => {
      const pathFinder: PathFinder = new PathFinder({ endpoint: 'id', alwaysCollect: false });
      const [endpoint]: Endpoint<any>[] = pathFinder.find(objectTraversal);

      const properties: string[] = [
        'meta',
        'path',
        'depth',
        'source',
        'endpoint',
        'original',
        'isEndpoint',
        'pathComplete',
      ];

      expect(endpoint).to.be.an('object');
      expect(endpoint).to.have.keys(properties);
      expect(Object.keys(endpoint)).to.have.lengthOf(properties.length);

      expect(endpoint.meta).to.be.an('object');
      expect(endpoint.meta.type).to.equal('number');
    });
  });
});
