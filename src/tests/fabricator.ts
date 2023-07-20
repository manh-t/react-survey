import { faker } from '@faker-js/faker';
import { Fabricator, sequence } from '@travelperksl/fabricator';

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
  id: () => sequence('answerId').toString(),
  answer: () => faker.string.sample(),
});

const questionRequestFabricator = Fabricator({
  id: () => sequence('questionId').toString(),
  answers: () => answerRequestFabricator.times(2),
});

export const surveySubmitRequestFabricator = Fabricator({
  surveyId: () => sequence('surveyId').toString(),
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
export const surveyFabricator = Fabricator({
  id: faker.string.uuid(),
  resourceType: 'survey',
  title: faker.string.sample(),
  description: faker.string.sample(),
  coverImageUrl: faker.image.url(),
});

export const answerFabricator = Fabricator({
  id: () => sequence().toString(),
  resourceType: 'answer',
  text: () => faker.string.sample(),
});

// States
export const surveyStateFabricator = Fabricator({
  survey: () => surveyFabricator(),
  isLoading: true,
  isError: false,
});
