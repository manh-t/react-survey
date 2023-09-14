describe('Question Complete screen', () => {
  context('given the Question Complete screen is opened', () => {
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
    it('navigates to the Home screen', () => {
      cy.visit('/surveys/d5de6a8f8f5f1cfe51bc/questions/complete');

      cy.location().should((location) => {
        expect(location.pathname).to.equal('/');
      });
    });
  });
});
