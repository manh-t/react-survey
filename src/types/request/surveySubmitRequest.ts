export interface SurveySubmitRequest {
  surveyId: string;
  questions: QuestionRequest[];
}

interface QuestionRequest {
  id: string;
  answers: AnswerRequest[];
}

export interface AnswerRequest {
  id: string;
  answer?: string;
}
