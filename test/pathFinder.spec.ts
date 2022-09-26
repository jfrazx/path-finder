import { PathFinder } from '../src';
import { expect } from 'chai';

describe(`PathFinder`, () => {
  class Shape {
    id = Math.ceil(Math.random() * 1000);
    type = 'circular';
  }

  const o = {
    failure: null as null,
    content: {
      items: [
        { id: 1, description: 'this is item one' },
        {
          id: 2,
          description: 'this is item two',
          attributes: [
            'color',
            'size',
            {
              person: {
                id: 12345,
                name: 'Sally',
                age: 1.618,
                height: 54,
              },
            },
          ],
        },
      ],
    },
    person: {
      id: 73,
      shape: new Shape(),
      name: 'Bob',
      height: 72,
      age: 3.14,
    },
  } as const;

  describe(`General`, () => {
    it(`should be an instance of PathFinder`, () => {
      expect(new PathFinder({ endPoint: '' })).to.be.instanceOf(PathFinder);
    });
  });

  describe(`Paths`, () => {
    it(`should return an array of objects`, () => {
      const pathFinder = new PathFinder({ endPoint: 'id' });

      const endPoints = pathFinder.find(o);

      console.log(endPoints);

      expect(endPoints).to.be.an('array');
    });
  });
});
