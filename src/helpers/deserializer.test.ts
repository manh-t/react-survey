import { faker } from '@faker-js/faker';
import { Fabricator } from '@travelperksl/fabricator';

import { Resource } from 'types/resource';
import { Survey } from 'types/survey';

import { Deserializer, deserialize, deserializeList } from './deserializer';

describe('Deserializer helper', () => {
  interface TestType extends Resource {
    name: string;
    age: number;
  }

  describe('deserialize', () => {
    const jsonName = faker.person.fullName();
    const jsonAge = faker.number.int();
    const jsonDataFabricator = Fabricator({
      id: () => faker.string.uuid(),
      type: 'TestType',
      attributes: {
        name: jsonName,
        age: jsonAge,
      },
    });

    const questionId = faker.string.uuid();

    const jsonDataWithRelation: Deserializer = {
      type: 'survey',
      id: faker.string.uuid(),
      attributes: {
        title: faker.string.sample(),
        description: faker.string.sample(),
        thankEmailAboveThreshold: faker.string.sample(),
        thankEmailBelowThreshold: faker.string.sample(),
        isActive: true,
        coverImageUrl: faker.image.url(),
        createdAt: faker.date.anytime().toISOString(),
        activeAt: faker.date.anytime().toISOString(),
      },
      relationships: {
        questions: {
          data: [{ type: 'question', id: questionId }],
        },
      },
    };

    const jsonDataWithoutRelation: Deserializer = {
      type: 'survey',
      id: faker.string.uuid(),
      attributes: {
        title: faker.string.sample(),
        description: faker.string.sample(),
        thankEmailAboveThreshold: faker.string.sample(),
        thankEmailBelowThreshold: faker.string.sample(),
        isActive: true,
        coverImageUrl: faker.image.url(),
        createdAt: faker.date.anytime().toISOString(),
        activeAt: faker.date.anytime().toISOString(),
      },
    };

    const jsonDataIncluded: Deserializer[] = [
      {
        type: 'question',
        id: questionId,
        attributes: {
          text: faker.string.sample(),
          displayOrder: 0,
          shortText: faker.string.sample(),
          pick: faker.string.sample(),
          displayType: faker.string.sample(),
          isMandatory: false,
          imageUrl: faker.image.url(),
          coverImageUrl: faker.image.url(),
          coverImageOpacity: 0.6,
          isShareableOnFacebook: false,
          isShareableOnTwitter: false,
          tagList: '',
        },
      },
    ];

    it('returns deserialized data', () => {
      const deserializedData = deserialize<TestType>(jsonDataFabricator());

      expect(deserializedData.resourceType).toBe('TestType');
      expect(deserializedData.name).toBe(jsonName);
      expect(deserializedData.age).toBe(jsonAge);
    });

    describe('given relationships and included', () => {
      describe('given the relationships is an array', () => {
        it('sets the relation array correctly', () => {
          const deserializedData = deserialize<Survey>(jsonDataWithRelation, jsonDataIncluded);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(jsonDataWithRelation.id);
          expect(deserializedData.title).toEqual(jsonDataWithRelation.attributes.title);
          expect(deserializedData.description).toEqual(jsonDataWithRelation.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailAboveThreshold);
          expect(deserializedData.thankEmailBelowThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailBelowThreshold);
          expect(deserializedData.isActive).toEqual(jsonDataWithRelation.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(jsonDataWithRelation.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(jsonDataWithRelation.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(jsonDataWithRelation.attributes.activeAt);

          expect(deserializedData.questions?.length).toEqual(jsonDataIncluded.length);
          expect(deserializedData.questions?.at(0)?.id).toEqual(jsonDataIncluded.at(0)?.id);
        });
      });

      describe('given relationships data but NO included data', () => {
        it('does NOT assign the relation', () => {
          const deserializedData = deserialize<Survey>(jsonDataWithRelation);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(jsonDataWithRelation.id);
          expect(deserializedData.title).toEqual(jsonDataWithRelation.attributes.title);
          expect(deserializedData.description).toEqual(jsonDataWithRelation.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailAboveThreshold);
          expect(deserializedData.thankEmailBelowThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailBelowThreshold);
          expect(deserializedData.isActive).toEqual(jsonDataWithRelation.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(jsonDataWithRelation.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(jsonDataWithRelation.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(jsonDataWithRelation.attributes.activeAt);

          expect(deserializedData.questions).toBeUndefined();
        });
      });

      describe('given NO relationships data but included data', () => {
        it('does NOT assign the relation', () => {
          const deserializedData = deserialize<Survey>(jsonDataWithoutRelation, jsonDataIncluded);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(jsonDataWithoutRelation.id);
          expect(deserializedData.title).toEqual(jsonDataWithoutRelation.attributes.title);
          expect(deserializedData.description).toEqual(jsonDataWithoutRelation.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(jsonDataWithoutRelation.attributes.thankEmailAboveThreshold);
          expect(deserializedData.thankEmailBelowThreshold).toEqual(jsonDataWithoutRelation.attributes.thankEmailBelowThreshold);
          expect(deserializedData.isActive).toEqual(jsonDataWithoutRelation.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(jsonDataWithoutRelation.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(jsonDataWithoutRelation.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(jsonDataWithoutRelation.attributes.activeAt);

          expect(deserializedData.questions).toBeUndefined();
        });
      });
    });

    describe('deserializeList', () => {
      const jsonArray = jsonDataFabricator.times(2);

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
});
