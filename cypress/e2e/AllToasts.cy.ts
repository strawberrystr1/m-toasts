describe('Toast test', () => {
  beforeEach(() => {
    cy.visit('/?path=/story/toast-from-button--toast-from-button');
    cy.visit(
      '/iframe.html?viewMode=story&id=toast-from-button--toast-from-button'
    );
  });
  it('Should show error toast', () => {
    cy.get(`[data-test-id=btn-error]`).click();
    cy.get(`[data-test-id=error]`).should('be.visible');
    cy.get(`[data-test-id=error] > button`).click();
    cy.get(`[data-test-id=error]`).should('not.be.visible');
  });
  it('Should show warning toast', () => {
    cy.get(`[data-test-id=btn-warning]`).click();
    cy.get(`[data-test-id=warning]`).should('be.visible');
    cy.get(`[data-test-id=warning] > button`).click();
    cy.get(`[data-test-id=warning]`).should('not.be.visible');
  });
  it('Should show success toast', () => {
    cy.get(`[data-test-id=btn-success]`).click();
    cy.get(`[data-test-id=success]`).should('be.visible');
    cy.get(`[data-test-id=success] > button`).click();
    cy.get(`[data-test-id=success]`).should('not.be.visible');
  });
  it('Should show info toast', () => {
    cy.get(`[data-test-id=btn-info]`).click();
    cy.get(`[data-test-id=info]`).should('be.visible');
    cy.get(`[data-test-id=info] > button`).click();
    cy.get(`[data-test-id=info]`).should('not.be.visible');
  });
  it('Should be shown only 3 toasts', () => {
    cy.get(`[data-test-id=btn-info]`).click();
    cy.get(`[data-test-id=btn-error]`).click();
    cy.get(`[data-test-id=btn-warning]`).click();
    cy.get(`[data-test-id=btn-success]`).click();
    cy.get(`[data-test-id=info]`).should('be.visible');
    cy.get(`[data-test-id=error]`).should('be.visible');
    cy.get(`[data-test-id=warning]`).should('be.visible');
    cy.get(`[data-test-id=success]`).should('not.exist');
  });
});
