const surveyScreenTestIds = {
  backButton: 'survey__back-button',
};

describe('Survey screen', () => {
  context('given the Back button is clicked', () => {
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

    it('backs to the previous page', () => {
      cy.visit('/');
      cy.visit('/surveys/d5de6a8f8f5f1cfe51bc');

      cy.findByTestId(surveyScreenTestIds.backButton).click();

      cy.location().should((location) => {
        expect(location.pathname).to.equal('/');
      });
    });
  });
});
