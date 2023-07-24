export interface SurveySubmitRequest {
  surveyId: string;
  questions: QuestionRequest[];
}

export interface QuestionRequest {
  id: string;
  answers: AnswerRequest[];
}

export interface AnswerRequest {
  id: string;
  answer: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfAnswerRequest(object: any): object is AnswerRequest {
  return 'id' in object && 'answer' in object;
}
