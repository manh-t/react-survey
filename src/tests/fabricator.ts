import { faker } from '@faker-js/faker';
import { Fabricator, sequence } from '@travelperksl/fabricator';

import { Survey } from 'types/survey';

export const testTypeName = faker.person.fullName();
export const testTypeAge = faker.number.int();
export const testTypeFabricator = Fabricator({
  id: () => sequence('id').toString(),
  type: 'TestType',
  attributes: {
    name: testTypeName,
    age: testTypeAge,
  },
});

// Requests
const answerRequestFabricator = Fabricator({
  id: () => sequence('answerRequestId').toString(),
  answer: () => faker.string.sample(),
});

const questionRequestFabricator = Fabricator({
  id: () => sequence('questionRequestId').toString(),
  answers: () => answerRequestFabricator.times(2),
});

export const surveySubmitRequestFabricator = Fabricator({
  surveyId: () => sequence('surveySubmitRequestId').toString(),
  questions: () => questionRequestFabricator.times(10),
});

// Responses
const questionId = faker.string.uuid();

export const surveyResponseWithRelationshipFabricator = Fabricator({
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
});

export const surveyResponseWithoutRelationshipFabricator = Fabricator({
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
});

export const questionResponseFabricator = Fabricator({
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
});

// Models
export const surveyFabricator = Fabricator<Survey>({
  id: faker.string.uuid(),
  resourceType: 'survey',
  title: faker.string.sample(),
  description: faker.string.sample(),
  coverImageUrl: faker.image.url(),
});

export const answerFabricator = Fabricator({
  id: () => sequence('answerId').toString(),
  resourceType: 'answer',
  text: () => faker.string.sample(),
});

export const questionFabricator = Fabricator({
  id: () => sequence('questionId').toString(),
  resourceType: 'question',
  text: () => faker.string.sample(),
  displayType: 'star',
  answers: answerFabricator.times(5),
});

/*
 * We need to reset the answerId sequence to start from "1" since the first
 * five sequences have already been created above. This will ensure that the
 * next time we generate an id in a test file, it will begin with "1".
 */
sequence.reset('answerId');

// States
export const surveyStateFabricator = Fabricator({
  survey: () => surveyFabricator(),
  isLoading: true,
  isError: false,
});
