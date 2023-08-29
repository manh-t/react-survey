/* eslint-disable */
import { RouteHandler, RouteMatcher } from 'cypress/types/net-stubbing';

declare global {
  namespace Cypress {
    interface Chainable {
      interceptWithDelay(method: HttpMethod, url: RouteMatcher, delayTime: number, response?: RouteHandler): void;

      signIn(): void;
    }
  }
}
