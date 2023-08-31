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

          expect(deserializedData).toMatchObject({
            id: surveyWithRelationship.id,
            resourceType: 'survey',
            title: surveyWithRelationship.attributes.title,
            description: surveyWithRelationship.attributes.description,
            thankEmailAboveThreshold: surveyWithRelationship.attributes.thankEmailAboveThreshold,
            thankEmailBelowThreshold: surveyWithRelationship.attributes.thankEmailBelowThreshold,
            isActive: surveyWithRelationship.attributes.isActive,
            coverImageUrl: surveyWithRelationship.attributes.coverImageUrl,
            createdAt: surveyWithRelationship.attributes.createdAt,
            activeAt: surveyWithRelationship.attributes.activeAt,
          });

          expect(deserializedData.questions?.length).toEqual(questions.length);
          expect(deserializedData.questions?.at(0)?.id).toEqual(questions.at(0)?.id);
        });
      });

      describe('given relationships data but NO included JSON data', () => {
        it('does NOT assign the relation', () => {
          const deserializedData = deserialize<Survey>(surveyWithRelationship);

          expect(deserializedData).toMatchObject({
            id: surveyWithRelationship.id,
            resourceType: 'survey',
            title: surveyWithRelationship.attributes.title,
            description: surveyWithRelationship.attributes.description,
            thankEmailAboveThreshold: surveyWithRelationship.attributes.thankEmailAboveThreshold,
            thankEmailBelowThreshold: surveyWithRelationship.attributes.thankEmailBelowThreshold,
            isActive: surveyWithRelationship.attributes.isActive,
            coverImageUrl: surveyWithRelationship.attributes.coverImageUrl,
            createdAt: surveyWithRelationship.attributes.createdAt,
            activeAt: surveyWithRelationship.attributes.activeAt,
          });

          expect(deserializedData.questions).toBeUndefined();
        });
      });

      describe('given NO relationships data but included JSON data', () => {
        it('does NOT assign the relation', () => {
          const deserializedData = deserialize<Survey>(surveyWithoutRelationship, questions);

          expect(deserializedData).toMatchObject({
            id: surveyWithoutRelationship.id,
            resourceType: 'survey',
            title: surveyWithoutRelationship.attributes.title,
            description: surveyWithoutRelationship.attributes.description,
            thankEmailAboveThreshold: surveyWithoutRelationship.attributes.thankEmailAboveThreshold,
            thankEmailBelowThreshold: surveyWithoutRelationship.attributes.thankEmailBelowThreshold,
            isActive: surveyWithoutRelationship.attributes.isActive,
            coverImageUrl: surveyWithoutRelationship.attributes.coverImageUrl,
            createdAt: surveyWithoutRelationship.attributes.createdAt,
            activeAt: surveyWithoutRelationship.attributes.activeAt,
          });

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
          expect(item).toMatchObject({
            resourceType: 'TestType',
            name: jsonArray[index].attributes.name,
            age: jsonArray[index].attributes.age,
          });
        });
      });
    });
  });
});
