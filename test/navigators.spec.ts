import { navigators, keyPaths } from '../src';
import { objectTraversal } from './lib';
import { expect } from 'chai';

describe(`Navigators`, () => {
  const { MapNavigator } = navigators;

  describe(`MapNavigator`, () => {
    let navigator: navigators.MapNavigator<any>;

    beforeEach(() => {
      navigator = new MapNavigator({
        depth: 0,
        hints: [],
        endpoint: 'one',
        sample: Infinity,
        depthFirst: false,
        firstMatch: false,
        strictHints: false,
        maxDepth: Infinity,
        alwaysCollect: false,
        preemptiveEndpoints: true,
        original: objectTraversal as any,
        source: new Map<string, string>([
          ['one', 'two'],
          ['three', 'four'],
        ]),
      });
    });

    it(`should navigate a Map`, () => {
      const result = navigator.navigate('keyboard');

      expect(result).to.have.lengthOf(2);

      const [result1, result2] = result;

      expect(result1).to.be.instanceOf(keyPaths.KeyPath);
      expect(result2).to.be.instanceOf(keyPaths.KeyPath);

      const endpoint1 = result1.identify(1);
      const endpoint2 = result2.identify(1);

      expect(endpoint1.isEndpoint).to.be.true;
      expect(endpoint1.pathComplete).to.be.false;
      expect(endpoint1.shouldContinue).to.be.false;

      expect(endpoint2.isEndpoint).to.be.false;
      expect(endpoint2.pathComplete).to.be.false;
      expect(endpoint2.shouldContinue).to.be.true;

      const build1 = result1.build(endpoint1.isEndpoint, endpoint1.pathComplete);
      const build2 = result2.build(endpoint2.isEndpoint, endpoint2.pathComplete);

      expect(build1.path).to.equal('keyboard<one>');
      expect(build2.path).to.equal('keyboard<three>');
    });
  });
});
