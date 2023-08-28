import { api } from '../../support/constants';

describe('Dashboard screen', () => {
  context('given the surveys loaded successfully', () => {
    beforeEach(() => {
      cy.signIn();

      cy.interceptWithDelay('GET', '**/api/v1/surveys*', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'Survey/List/valid.json',
      });
      cy.interceptWithDelay('GET', '**/api/v1/me', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'User/valid.json',
      });
    });

    it('switches to the next survey every 3 seconds', () => {
      cy.visit('/');

      // Check if the user is redirected to /sign-in path or not
      cy.location().should((location) => {
        expect(location.pathname).not.to.equal('/sign-in');
      });

      cy.findByText('Scarlett Bangkok').should('be.visible');
      cy.findByText('ibis Bangkok Riverside', { timeout: 4000 }).should('be.visible');
    });
  });

  context('given an indicator is clicked', () => {
    beforeEach(() => {
      cy.signIn();

      cy.interceptWithDelay('GET', '**/api/v1/surveys*', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'Survey/List/valid.json',
      });
      cy.interceptWithDelay('GET', '**/api/v1/me', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'User/valid.json',
      });
    });

    it('switches to the corresponding survey', () => {
      cy.visit('/');

      cy.get('button[aria-label="Slide ed1d4f0ff19a56073a14"]').click();
      cy.findByText('ibis Bangkok Riverside', { timeout: 100 }).should('be.visible');
    });
  });

  context('given the Next button is clicked', () => {
    beforeEach(() => {
      cy.signIn();

      cy.interceptWithDelay('GET', '**/api/v1/surveys*', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'Survey/List/valid.json',
      });
      cy.interceptWithDelay('GET', '**/api/v1/me', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'User/valid.json',
      });
    });

    it('navigates to the Survey screen with the corresponding survey id', () => {
      cy.visit('/');

      cy.get('a[href="/surveys/ed1d4f0ff19a56073a14"]').click();

      cy.location().should((location) => {
        expect(location.pathname).to.equal('/surveys/ed1d4f0ff19a56073a14');
      });
    });
  });
});
