import { Resource } from 'types/resource';

import { deserialize, deserializeList } from './deserializer';

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

  describe('deserializeList', () => {
    const jsonArray = [
      {
        id: '1',
        type: 'TestType',
        attributes: {
          name: 'Name',
          age: 25,
        },
      },
      {
        id: '2',
        type: 'TestType',
        attributes: {
          name: 'Name',
          age: 30,
        },
      },
    ];

    it('returns a list of the deserialized items', () => {
      const deserializedList = deserializeList<TestType>(jsonArray);

      expect(deserializedList).toHaveLength(jsonArray.length);

      deserializedList.forEach((item: TestType, index: number) => {
        expect(item.resourceType).toBe('TestType');
        expect(item.name).toEqual(jsonArray[index].attributes.name);
        expect(item.age).toEqual(jsonArray[index].attributes.age);
      });
    });
  });
});
