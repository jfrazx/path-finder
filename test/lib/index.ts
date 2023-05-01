class Shape {
  id = Math.ceil(Math.random() * 1000);
  type = 'circular';
}

export const objectTraversal = {
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
              ripped: true,
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
    ripped: false,
  },
  mappable: new Map<string, string>([
    ['one', 'two'],
    ['three', 'four'],
  ]),
} as const;

export const arrayTraversal = [objectTraversal, objectTraversal, objectTraversal];
