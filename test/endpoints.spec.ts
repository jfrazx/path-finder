import { EndpointIdentityOptions } from '../src/interfaces';
import { Endpoints } from '../src/endpoints';
import { objectTraversal } from './lib';
import { expect } from 'chai';

describe(`Endpoints`, () => {
  const options: EndpointIdentityOptions<any> = {
    depth: 2,
    hints: [],
    key: 'fish',
    collected: 0,
    source: 'blue',
    endpoint: 'cat',
    sample: Infinity,
    depthFirst: false,
    firstMatch: false,
    strictHints: false,
    maxDepth: Infinity,
    pathComplete: false,
    alwaysCollect: false,
    currentPath: '[0].fish',
    original: [{ fish: 'blue' }],
  };

  it(`should return an EndPointIdentified object`, () => {
    const result = Endpoints.for(options);

    expect(result).to.have.property('isEndpoint');
    expect(result).to.have.property('pathComplete');
    expect(result).to.have.property('shouldContinue');

    expect(result.isEndpoint).to.be.false;
    expect(result.pathComplete).to.be.false;
    expect(result.shouldContinue).to.be.true;
  });

  it(`should return isEndPoint true, shouldContinue false when an endpoint is detected`, () => {
    const result = Endpoints.for({ ...options, endpoint: 'fish' });

    expect(result.isEndpoint).to.be.true;
    expect(result.pathComplete).to.be.false;
    expect(result.shouldContinue).to.be.false;
  });

  describe(`Hints`, () => {
    const hintOptions = {
      ...options,
      key: 'age',
      endpoint: 'age',
      original: objectTraversal,
      hints: ['items', 'person'],
      currentPath: 'content.items[1].attributes[2].person.age',
    };

    it(`should return isEndPoint true, shouldContinue false when at endpoint with matching hints`, () => {
      const result = Endpoints.for(hintOptions);

      expect(result.isEndpoint).to.be.true;
      expect(result.shouldContinue).to.be.false;
    });

    it(`should return isEndPoint true, shouldContinue false when at endpoint with matching strict hints`, () => {
      const result = Endpoints.for({
        ...hintOptions,
        strictHints: true,
        hints: ['attributes', 'person'],
      });

      expect(result.isEndpoint).to.be.true;
      expect(result.shouldContinue).to.be.false;
    });

    it(`should return isEndPoint false, shouldContinue true when at endpoint without matching strict hints`, () => {
      const result = Endpoints.for({ ...hintOptions, strictHints: true });

      expect(result.isEndpoint).to.be.false;
      expect(result.shouldContinue).to.be.true;
    });

    it(`should return isEndPoint false, shouldContinue true when at endpoint without matching hints`, () => {
      const result = Endpoints.for({ ...hintOptions, hints: ['car', 'book'] });

      expect(result.isEndpoint).to.be.false;
      expect(result.shouldContinue).to.be.true;
    });
  });

  describe(`Depth`, () => {
    const depthOptions = {
      ...options,
      maxDepth: 2,
    };

    it(`should return isEndPoint false, shouldContinue false when at depth`, () => {
      const result = Endpoints.for(depthOptions);

      expect(result.isEndpoint).to.be.false;
      expect(result.pathComplete).to.be.false;
      expect(result.shouldContinue).to.be.false;
    });

    it(`should return isEndPoint false, shouldContinue true when not at depth`, () => {
      const result = Endpoints.for({ ...depthOptions, maxDepth: 5 });

      expect(result.isEndpoint).to.be.false;
      expect(result.pathComplete).to.be.false;
      expect(result.shouldContinue).to.be.true;
    });

    it(`should return isEndPoint true, shouldContinue false when at depth`, () => {
      const result = Endpoints.for({ ...depthOptions, endpoint: 'fish' });

      expect(result.isEndpoint).to.be.true;
      expect(result.pathComplete).to.be.false;
      expect(result.shouldContinue).to.be.false;
    });
  });
});
