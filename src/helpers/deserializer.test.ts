import { Resource } from 'types/resource';

import { deserialize } from './deserializer';

describe('Deserializer helper', () => {
  interface TestType extends Resource {
    name: string;
    age: number;
  }

  describe('deserialize', () => {
    const jsonData = {
      id: '1',
      type: 'TestType',
      attributes: {
        name: 'Name',
        age: 25,
      },
    };

    it('returns deserialized data', () => {
      const deserializedData = deserialize<TestType>(jsonData);

      expect(deserializedData.resourceType).toBe('TestType');
      expect(deserializedData.name).toBe('Name');
      expect(deserializedData.age).toBe(25);
    });
  });
});
