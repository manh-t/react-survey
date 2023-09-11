export interface SurveySubmitRequest {
  surveyId: string;
  questions: QuestionRequest[];
}

interface QuestionRequest {
  id: string;
  answers: AnswerRequest[];
}

interface AnswerRequest {
  id: string;
  answer?: string;
}
