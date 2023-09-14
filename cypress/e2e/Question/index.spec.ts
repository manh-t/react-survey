const questionTestIds = {
  questionIndex: 'question__index',
  questionTitle: 'question__title',
  questionAnswer: 'question__answer',
  questionCloseButton: 'question__close-button',
  questionNextButton: 'question__next-button',
  questionSubmitButton: 'question__submit-button',
  confirmDialogPositiveButton: 'confirm-dialog__positive-button',
  surveyStartSurveyButton: 'survey__start-survey-button',
};

describe('Question screen', () => {
  context('given the submit button is clicked', () => {
    context('given the API responses returns success result', () => {
      beforeEach(() => {
        cy.signIn();
        cy.interceptWithDelay('GET', '**/api/v1/surveys/*', 200, {
          statusCode: 200,
          fixture: 'Survey/Detail/valid.json',
        });
        cy.interceptWithDelay('GET', '**/api/v1/surveys*', 200, {
          statusCode: 200,
          fixture: 'Survey/List/valid.json',
        });
        cy.interceptWithDelay('GET', '**/api/v1/me', 200, {
          statusCode: 200,
          fixture: 'User/valid.json',
        });
        cy.interceptWithDelay('POST', '**/responses', 200, {
          statusCode: 201,
          fixture: 'Survey/Submit/valid.json',
        });
      });

      it('navigates to the Question Complete screen', () => {
        cy.visit('/');
        cy.visit('/surveys/d5de6a8f8f5f1cfe51bc');

        // Go to Question screen
        cy.findByTestId(questionTestIds.surveyStartSurveyButton).click();

        cy.findByTestId(questionTestIds.questionNextButton).click();
        cy.findByTestId(questionTestIds.questionSubmitButton).click();

        cy.location({ timeout: 1000 }).should((location) => {
          expect(location.pathname).to.equal('/surveys/d5de6a8f8f5f1cfe51bc/questions/complete');
        });
      });
    });
  });

  context('given the close button is clicked', () => {
    context('given the Positive button of the confirm dialog is clicked', () => {
      beforeEach(() => {
        cy.signIn();
        cy.interceptWithDelay('GET', '**/api/v1/surveys/*', 200, {
          statusCode: 200,
          fixture: 'Survey/Detail/valid.json',
        });
        cy.interceptWithDelay('GET', '**/api/v1/surveys*', 200, {
          statusCode: 200,
          fixture: 'Survey/List/valid.json',
        });
        cy.interceptWithDelay('GET', '**/api/v1/me', 200, {
          statusCode: 200,
          fixture: 'User/valid.json',
        });
      });

      it('navigates back to Home', () => {
        cy.visit('/');
        cy.visit('/surveys/d5de6a8f8f5f1cfe51bc');

        // Go to Question screen
        cy.findByTestId(questionTestIds.surveyStartSurveyButton).click();

        cy.findByTestId(questionTestIds.questionCloseButton).click();
        cy.findByTestId(questionTestIds.confirmDialogPositiveButton).click();

        cy.location().should((location) => {
          expect(location.pathname).to.equal('/');
        });
      });
    });
  });
});
