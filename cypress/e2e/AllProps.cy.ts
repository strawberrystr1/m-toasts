describe('Test props change', () => {
  it('should change width', () => {
    cy.visit('/')
    cy.visit('/iframe.html?viewMode=story&id=toast-from-button--toast-from-button&args=width:500')
    cy.get('[data-test-id=btn-error]').click()
    cy.get('[data-test-id=error]').should('have.css', 'width', '500px')
  })
  it('should change height', () => {
    cy.visit('/')
    cy.visit('/iframe.html?viewMode=story&id=toast-from-button--toast-from-button&args=height:150')
    cy.get('[data-test-id=btn-error]').click()
    cy.get('[data-test-id=error]').should('have.css', 'height', '150px')
  })
  it('should change padding', () => {
    cy.visit('/')
    cy.visit('/iframe.html?viewMode=story&id=toast-from-button--toast-from-button&args=spacing:30')
    cy.get('[data-test-id=btn-error]').click()
    cy.get('[data-test-id=error]').should('have.css', 'padding', '30px 25px')
  })
  it('should change padding', () => {
    cy.visit('/')
    cy.visit('/iframe.html?viewMode=story&id=toast-from-button--toast-from-button&args=color:lightgreen')
    cy.get('[data-test-id=btn-error]').click()
    cy.get('[data-test-id=error]').should('have.css', 'background-color', 'rgb(144, 238, 144)')
  })
  it('should change font-size', () => {
    cy.visit('/')
    cy.visit('/iframe.html?viewMode=story&id=toast-from-button--toast-from-button&args=fontSize:33')
    cy.get('[data-test-id=btn-error]').click()
    cy.get('[data-test-id=error]').should('have.css', 'font-size', '33px')
  })
})