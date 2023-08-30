import {
  questionResponseFabricator,
  surveyResponseWithRelationshipFabricator,
  surveyResponseWithoutRelationshipFabricator,
  testTypeAge,
  testTypeFabricator,
  testTypeName,
} from 'tests/fabricator';
import { Resource } from 'types/resource';
import { Survey } from 'types/survey';

import { Deserializer, deserialize, deserializeList } from './deserializer';

describe('Deserializer helper', () => {
  interface TestType extends Resource {
    name: string;
    age: number;
  }

  describe('deserialize', () => {
    const surveyWithRelationship: Deserializer = surveyResponseWithRelationshipFabricator();
    const surveyWithoutRelationship: Deserializer = surveyResponseWithoutRelationshipFabricator();
    const questions: Deserializer[] = questionResponseFabricator.times(1);

    it('returns deserialized data', () => {
      const deserializedData = deserialize<TestType>(testTypeFabricator());

      expect(deserializedData.resourceType).toBe('TestType');
      expect(deserializedData.name).toBe(testTypeName);
      expect(deserializedData.age).toBe(testTypeAge);
    });

    describe('given relationships and included JSON data', () => {
      describe('given the relationships is an array', () => {
        it('deserializes the relation array correctly', () => {
          const deserializedData = deserialize<Survey>(surveyWithRelationship, questions);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(surveyWithRelationship.id);
          expect(deserializedData.title).toEqual(surveyWithRelationship.attributes.title);
          expect(deserializedData.description).toEqual(surveyWithRelationship.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(surveyWithRelationship.attributes.thankEmailAboveThreshold);
          expect(deserializedData.thankEmailBelowThreshold).toEqual(surveyWithRelationship.attributes.thankEmailBelowThreshold);
          expect(deserializedData.isActive).toEqual(surveyWithRelationship.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(surveyWithRelationship.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(surveyWithRelationship.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(surveyWithRelationship.attributes.activeAt);

          expect(deserializedData.questions?.length).toEqual(questions.length);
          expect(deserializedData.questions?.at(0)?.id).toEqual(questions.at(0)?.id);
        });
      });

      describe('given relationships data but NO included JSON data', () => {
        it('does NOT assign the relation', () => {
          const deserializedData = deserialize<Survey>(surveyWithRelationship);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(surveyWithRelationship.id);
          expect(deserializedData.title).toEqual(surveyWithRelationship.attributes.title);
          expect(deserializedData.description).toEqual(surveyWithRelationship.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(surveyWithRelationship.attributes.thankEmailAboveThreshold);
          expect(deserializedData.thankEmailBelowThreshold).toEqual(surveyWithRelationship.attributes.thankEmailBelowThreshold);
          expect(deserializedData.isActive).toEqual(surveyWithRelationship.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(surveyWithRelationship.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(surveyWithRelationship.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(surveyWithRelationship.attributes.activeAt);

          expect(deserializedData.questions).toBeUndefined();
        });
      });

      describe('given NO relationships data but included JSON data', () => {
        it('does NOT assign the relation', () => {
          const deserializedData = deserialize<Survey>(surveyWithoutRelationship, questions);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(surveyWithoutRelationship.id);
          expect(deserializedData.title).toEqual(surveyWithoutRelationship.attributes.title);
          expect(deserializedData.description).toEqual(surveyWithoutRelationship.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(
            surveyWithoutRelationship.attributes.thankEmailAboveThreshold
          );
          expect(deserializedData.thankEmailBelowThreshold).toEqual(
            surveyWithoutRelationship.attributes.thankEmailBelowThreshold
          );
          expect(deserializedData.isActive).toEqual(surveyWithoutRelationship.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(surveyWithoutRelationship.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(surveyWithoutRelationship.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(surveyWithoutRelationship.attributes.activeAt);

          expect(deserializedData.questions).toBeUndefined();
        });
      });
    });

    describe('deserializeList', () => {
      const jsonArray = testTypeFabricator.times(2);

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
