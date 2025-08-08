# Path Finder

Path Finder is a TypeScript library engineered for endpoint discovery within complex nested data structures. The library employs a sophisticated navigator pattern architecture that automatically adapts traversal strategies based on encountered data types, enabling seamless exploration across heterogeneous object graphs containing primitives, collections, and custom class instances.

## Install

`npm install @status/path-finder`

or

`yarn add @status/path-finder`

## Core Architecture

The PathFinder class functions as the primary interface for property path discovery operations. Each traversal operation produces Endpoint objects that encapsulate discovered paths along with comprehensive metadata including structural depth, data type classification, and completion status. The library's source identification system automatically classifies encountered values using specialized identifier classes, ensuring appropriate navigation strategies for JavaScript's diverse type ecosystem.

## Configuration Parameters

The PathFinderOptions interface provides granular control over discovery behavior through multiple configuration vectors. The endpoint parameter accepts string literals for exact matching or RegExp instances for pattern-based discovery, while the special wildcard '\*' enables comprehensive mapping mode.

```typescript
// Pattern-based discovery
const finder = new PathFinder({ endpoint: /^user.*Id$/ });

// Wildcard mapping
const mapper = new PathFinder({ endpoint: '*' });
```

Depth management operates through the maxDepth parameter, establishing traversal boundaries that prevent infinite recursion in circular structures or excessively deep object graphs. The depthFirst boolean controls traversal strategy implementation, with breadth-first exploration providing shallow-priority discovery and depth-first enabling complete branch investigation.

```typescript
const finder = new PathFinder({
  endpoint: 'id',
  maxDepth: 3,
  depthFirst: true,
});
```

Hint-based disambiguation addresses scenarios where multiple properties share identical names across different structural contexts. The hints array provides contextual path fragments that guide discovery toward intended targets, while strictHints enforcement requires sequential hint ordering within discovered paths.

```typescript
const finder = new PathFinder({
  endpoint: 'age',
  hints: ['person', 'details'],
  strictHints: true,
});
```

Sampling controls limit result set cardinality through the sample parameter, preventing memory exhaustion when processing large datasets with numerous matching endpoints. The firstMatch optimization enables early termination upon initial discovery, particularly valuable for existence verification operations.

```typescript
const finder = new PathFinder({
  endpoint: 'id',
  sample: 5,
  firstMatch: true,
});
```

Collection behavior modification occurs through alwaysCollect, which forces path accumulation regardless of endpoint matching criteria, and preemptiveEndpoints, which controls traversal continuation beyond discovered endpoints.

```typescript
const finder = new PathFinder({
  endpoint: 'name',
  preemptiveEndpoints: false,
  alwaysCollect: true,
});
```

## Discovery Methods

The find method executes comprehensive endpoint discovery operations, returning complete Endpoint arrays containing path strings, source values, metadata objects, depth information, and status flags. Each endpoint's meta property provides type classification through the source identification system, enabling post-discovery filtering and analysis.

```typescript
const endpoints = finder.find(complexObject);
// Returns: [{ path: 'user.profile.name', source: 'John', meta: { type: 'string' }, ... }]
```

The first method implements optimized single-result discovery through automatic firstMatch configuration, returning the initial matching endpoint or undefined for empty result sets. This method provides O(1) early termination behavior optimal for existence checking operations.

```typescript
const endpoint = finder.first(dataStructure);
if (endpoint) {
  console.log(`Found at: ${endpoint.path}`);
}
```

The map method performs exhaustive path enumeration by internally configuring wildcard endpoint matching, producing complete structural inventories suitable for debugging, documentation, or comprehensive analysis operations.

```typescript
const allPaths = finder.map(apiResponse);
// Discovers every accessible path within the structure
```

## Advanced Applications

Pattern-based discovery leverages regular expression endpoints for dynamic property matching when exact key names remain unknown but follow predictable conventions. This capability proves essential for API response processing where property naming follows consistent patterns across varying response structures.

```typescript
const finder = new PathFinder({ endpoint: /^timestamp.*/ });
const timestamps = finder.find(logData);
```

Type-aware traversal automatically handles JavaScript's complete type spectrum including primitive values, ES6 collections, custom class instances, and function objects. The SourceIdentifier system ensures appropriate navigation strategies while maintaining metadata accuracy across diverse data types.

```typescript
// Handles Maps, Sets, Arrays, Objects, and primitives seamlessly
const finder = new PathFinder({ endpoint: 'key' });
const mixed = {
  data: new Map([['key', 'value']]),
  items: [{ key: 123 }],
  nested: { key: true },
};
```

Controlled exploration through depth limitations and sample constraints enables efficient discovery operations within large-scale data structures while preventing memory exhaustion or performance degradation. Combined with breadth-first traversal, this approach optimizes discovery operations for shallow target locations.

```typescript
const finder = new PathFinder({
  endpoint: 'id',
  maxDepth: 2,
  sample: 10,
  depthFirst: false,
});
```

Context-sensitive discovery utilizes hint arrays for precise endpoint identification within ambiguous structural contexts. This mechanism enables surgical precision when multiple properties share identical names but exist within different semantic contexts throughout the object graph.

```typescript
const finder = new PathFinder({
  endpoint: 'id',
  hints: ['user', 'profile'],
  strictHints: true,
});
// Matches: user.profile.id but not product.details.id
```

The metadata system provides comprehensive type classification and structural information for each discovered endpoint, enabling sophisticated post-processing operations based on data type characteristics rather than path string analysis alone.

## Example Usage

Here's a practical example of using Path Finder to discover all names in a nested response structure:

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
