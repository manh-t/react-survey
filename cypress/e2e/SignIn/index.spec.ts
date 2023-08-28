import { api } from '../../support/constants';

const signInScreenTestIds = {
  nimbleLogo: 'sign-in__nimble-logo',
  signInForm: 'sign-in-form',
  emailLabel: 'sign-in-form__email',
  emailField: 'sign-in-form__input-email',
  passwordLabel: 'sign-in-form__password',
  passwordField: 'sign-in-form__input-password',
  forgotButton: 'sign-in-form__forgot-button',
  signInButton: 'sign-in-form__button',
  errorAlert: 'sign-in__error-alert',
  loadingDialog: 'sign-in__loading-dialog',
};

describe('SignIn screen', () => {
  context('given a valid form submission', () => {
    beforeEach(() => {
      cy.interceptWithDelay('GET', '**/api/v1/surveys*', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'Survey/List/valid.json',
      });

      cy.interceptWithDelay('GET', '**/api/v1/me', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'User/valid.json',
      });
    });

    it('shows the loading dialog and navigates to Dashboard screen', () => {
      cy.interceptWithDelay('POST', '**/api/v1/oauth/token', api.delay.short, {
        statusCode: api.status.success,
        fixture: 'Authentication/SignIn/valid.json',
      });

      cy.visit('/');
      cy.location().should((location) => {
        expect(location.pathname).to.equal('/sign-in');
      });

      cy.findByTestId(signInScreenTestIds.emailField).type('test@email.com');
      cy.findByTestId(signInScreenTestIds.passwordField).type('12345678');
      cy.findByTestId(signInScreenTestIds.signInButton).click();

      cy.findByTestId(signInScreenTestIds.loadingDialog).should('be.visible');

      cy.location().should((location) => {
        expect(location.pathname).to.equal('/');
      });
    });
  });

  context('given the invalid form submission', () => {
    it('shows the error dialog', () => {
      cy.interceptWithDelay('POST', '**/api/v1/oauth/token', api.delay.short, {
        statusCode: api.status.badRequest,
        fixture: 'Authentication/SignIn/invalid.json',
      });

      cy.visit('/');
      cy.findByTestId(signInScreenTestIds.emailField).type('test@email.com');
      cy.findByTestId(signInScreenTestIds.passwordField).type('12345678');
      cy.findByTestId(signInScreenTestIds.signInButton).click();

      cy.findByTestId(signInScreenTestIds.loadingDialog).should('be.visible');

      cy.findByTestId(signInScreenTestIds.errorAlert).should('be.visible');
    });
  });

  context('given the failed validation form', () => {
    it('shows the error popup', () => {
      cy.visit('/');
      cy.findByTestId(signInScreenTestIds.emailField).type('invalid email');
      cy.findByTestId(signInScreenTestIds.passwordField).type('12345678');
      cy.findByTestId(signInScreenTestIds.signInButton).click();

      cy.get('input:invalid').should('have.length', 1);
    });
  });
});
