describe('Cypress', () => {
  it('is working', () => {
    expect(true).to.equal(true);
  });

  it('visits the app', () => {
    cy.visit('/');
    // TODO Write UI test in integration task
  });
});
