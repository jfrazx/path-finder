import { SourceIdentifier, Types } from '../src/identification';
import type { Metadata } from '../src';
import { expect } from 'chai';
import type {
  MapMetadata,
  SetMetadata,
  ArrayMetadata,
  ClassMetadata,
  ObjectMetadata,
  FunctionMetadata,
} from '../src/identification';

describe(`SourceIdentifier`, () => {
  describe(`Array`, () => {
    it(`should identify an array`, () => {
      const source = [];
      const result: ArrayMetadata = SourceIdentifier.identify(source);

      expect(result.type).to.equal(Types.Array);
      expect(result.length).to.equal(source.length);
    });

    it(`should identify an array with values`, () => {
      const source = [1, 2, 3, 4, 5];
      const result: ArrayMetadata = SourceIdentifier.identify(source);

      expect(result.type).to.equal(Types.Array);
      expect(result.length).to.equal(source.length);
    });
  });

  describe(`Class`, () => {
    class Person {
      constructor(public age: number) {}
    }

    it(`should identify a class`, () => {
      const source = new Person(99);
      const result: ClassMetadata = SourceIdentifier.identify(source);

      expect(result.type).to.equal(Types.Class);
      expect(result.instance).to.equal(Person.name);
      expect(result.properties).to.deep.equal(['age']);
    });
  });

  describe(`Primitive`, () => {
    it(`should identify a number`, () => {
      const result: Metadata = SourceIdentifier.identify(1);

      expect(result.type).to.equal('number');
    });

    it(`should identify a string`, () => {
      const result: Metadata = SourceIdentifier.identify('test');

      expect(result.type).to.equal('string');
    });

    it(`should identify undefined`, () => {
      const result: Metadata = SourceIdentifier.identify(undefined);

      expect(result.type).to.equal('undefined');
    });

    it(`should identify a boolean`, () => {
      const result: Metadata = SourceIdentifier.identify(true);

      expect(result.type).to.equal('boolean');
    });

    it(`should identify a function`, () => {
      const result: Metadata = SourceIdentifier.identify(() => {});

      expect(result.type).to.equal('function');
    });
  });

  describe(`Set`, () => {
    it(`should identify a set`, () => {
      const result: SetMetadata = SourceIdentifier.identify(new Set<any>());

      expect(result.type).to.equal(Types.Set);
      expect(result.size).to.equal(0);
    });

    it(`should identify a set with values`, () => {
      const source = new Set([1, 2, 3, 4, 5]);

      const result: SetMetadata = SourceIdentifier.identify(source);

      expect(result.type).to.equal(Types.Set);
      expect(result.size).to.equal(source.size);
    });
  });

  describe(`Map`, () => {
    it(`should identify a map`, () => {
      const result: MapMetadata = SourceIdentifier.identify(new Map<any, any>());

      expect(result.size).to.equal(0);
      expect(result.keys).to.be.an('array');
      expect(result.type).to.equal(Types.Map);
      expect(result.keys).to.have.lengthOf(0);
    });

    it(`should identify a map with values`, () => {
      const source = new Map<string, number>();

      source.set('age', 99);
      source.set('height', 72);
      source.set('weight', 110);

      const result: MapMetadata = SourceIdentifier.identify(source);

      expect(result.type).to.equal(Types.Map);
      expect(result.size).to.equal(source.size);
      expect(result.keys).to.have.lengthOf(source.size);
      expect(result.keys).to.deep.equal(['age', 'height', 'weight']);
    });
  });

  describe(`WeakMap`, () => {
    it(`should identify a weakmap`, () => {
      const result: MapMetadata = SourceIdentifier.identify(new WeakMap<any, any>());

      expect(result.type).to.equal(Types.WeakMap);
    });
  });

  describe(`WeakSet`, () => {
    it(`should identify a weakset`, () => {
      const result: MapMetadata = SourceIdentifier.identify(new WeakSet<any>());

      expect(result.type).to.equal(Types.WeakSet);
    });
  });

  describe(`Null`, () => {
    it(`should identify null`, () => {
      const result: Metadata = SourceIdentifier.identify(null);

      expect(result.type).to.equal(Types.Null);
    });
  });

  describe(`Function`, () => {
    it(`should identify an anonymous function`, () => {
      const result: FunctionMetadata = SourceIdentifier.identify(() => {});

      expect(result.length).to.equal(0);
      expect(result.name).to.equal('anonymous');
      expect(result.type).to.equal(Types.Function);
    });

    it(`should identify a named variable function`, () => {
      const func = () => {};
      const result: FunctionMetadata = SourceIdentifier.identify(func);

      expect(result.length).to.equal(0);
      expect(result.name).to.equal('func');
      expect(result.type).to.equal(Types.Function);
    });

    it(`should identify a named function`, () => {
      function func() {}

      const result: FunctionMetadata = SourceIdentifier.identify(func);

      expect(result.length).to.equal(0);
      expect(result.name).to.equal('func');
      expect(result.type).to.equal(Types.Function);
    });

    it(`should identify an anonymous function with arguments`, () => {
      const result: FunctionMetadata = SourceIdentifier.identify(
        (_value: string, __value: number) => {},
      );

      expect(result.length).to.equal(2);
      expect(result.name).to.equal('anonymous');
      expect(result.type).to.equal(Types.Function);
    });

    it(`should identify a named variable function with arguments`, () => {
      const func = (_value: number) => {};
      const result: FunctionMetadata = SourceIdentifier.identify(func);

      expect(result.length).to.equal(1);
      expect(result.name).to.equal('func');
      expect(result.type).to.equal(Types.Function);
    });

    it(`should identify a named function with arguments`, () => {
      function func(_value: string, __value: number, ___value: boolean) {}

      const result: FunctionMetadata = SourceIdentifier.identify(func);

      expect(result.length).to.equal(3);
      expect(result.name).to.equal('func');
      expect(result.type).to.equal(Types.Function);
    });
  });

  describe(`Object`, () => {
    it(`should identify an object`, () => {
      const result: ObjectMetadata = SourceIdentifier.identify({});

      expect(result.type).to.equal(Types.Object);
      expect(result.properties).to.be.an('array');
      expect(result.properties).to.have.lengthOf(0);
    });

    it(`should identify an object with a null prototype`, () => {
      const result: ObjectMetadata = SourceIdentifier.identify(Object.create(null));

      expect(result.type).to.equal(Types.Object);
      expect(result.properties).to.be.an('array');
      expect(result.properties).to.have.lengthOf(0);
    });

    it(`should identify an object with properties`, () => {
      const source = {
        name: 'Bob',
        weight: 130,
        age: 23,
      };

      const result: ObjectMetadata = SourceIdentifier.identify(source);

      expect(result.type).to.equal(Types.Object);
      expect(result.properties).to.be.an('array');
      expect(result.properties).to.deep.equal(Object.keys(source));
      expect(result.properties).to.have.lengthOf(Object.keys(source).length);
    });
  });
});
