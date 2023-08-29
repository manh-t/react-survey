import { Method as HttpMethod } from 'axios';
import { RouteHandler, RouteMatcher } from 'cypress/types/net-stubbing';

const interceptWithDelay = (method: HttpMethod, url: RouteMatcher, delayTime: number, response?: RouteHandler): void => {
  cy.intercept(method, url, (req) => {
    return Cypress.Promise.delay(delayTime, response).then(req.reply);
  });
};

Cypress.Commands.add('interceptWithDelay', interceptWithDelay);
