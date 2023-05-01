# Path Finder

Map key paths through objects and arrays

## Install

`npm install @status/path-finder`

or

`yarn add @status/path-finder`

## Usage

```typescript
import { PathFinder } from '@status/path-finder';

const response: Response = {
  statusCode: 200,
  status: 'OK',
  data: [
    {
      id: 483,
      age: 10,
      name: 'Bart',
      quote: 'Eat my shorts!',
      friends: [
        {
          id: 503,
          age: 10,
          name: 'Milhouse',
          quote: `But my mom says I'm cool`,
          pets: [
            {
              id: 893,
              type: 'Dog',
              name: 'Unknown',
              gender: 'Female',
              species: 'Shih Tzu',
            },
          ],
        },
      ],
    },
    {
      id: 654,
      age: 8,
      name: 'Lisa',
      quote: `Don't you see? Getting what you want all time will ultimately leave you unfulfilled and joyless.`,
    },
    {
      id: 157,
      age: 39,
      name: 'Homer',
      quote: 'To alcohol! The cause of … and solution to … all of life’s problems.',
    },
    {
      id: 298,
      age: 36,
      name: 'Marge',
      quote: `I thought 'Googling yourself' meant the other thing.`,
    },
  ],
};

const pathFinder = new PathFinder({ endpoint: 'name' });

const result = pathFinder.find(response);
```

```json
[
  {
    "depth": 3,
    "endpoint": "name",
    "original": { "statusCode": 200, "status": "OK", "data": [Array] },
    "isEndpoint": true,
    "source": "Bart",
    "path": "data[0].name",
    "meta": { "type": "string" }
  },
  {
    "depth": 3,
    "endpoint": "name",
    "original": { "statusCode": 200, "status": "OK", "data": [Array] },
    "isEndpoint": true,
    "source": "Lisa",
    "path": "data[1].name",
    "meta": { "type": "string" }
  },
  {
    "depth": 3,
    "endpoint": "name",
    "original": { "statusCode": 200, "status": "OK", "data": [Array] },
    "isEndpoint": true,
    "source": "Homer",
    "path": "data[2].name",
    "meta": { "type": "string" }
  },
  {
    "depth": 3,
    "endpoint": "name",
    "original": { "statusCode": 200, "status": "OK", "data": [Array] },
    "isEndpoint": true,
    "source": "Marge",
    "path": "data[3].name",
    "meta": { "type": "string" }
  },
  {
    "depth": 5,
    "endpoint": "name",
    "original": { "statusCode": 200, "status": "OK", "data": [Array] },
    "isEndpoint": true,
    "source": "Milhouse",
    "path": "data[0].friends[0].name",
    "meta": { "type": "string" }
  },
  {
    "depth": 7,
    "endpoint": "name",
    "original": { "statusCode": 200, "status": "OK", "data": [Array] },
    "isEndpoint": true,
    "source": "Unknown",
    "path": "data[0].friends[0].pets[0].name",
    "meta": { "type": "string" }
  }
]

```
