describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show auth dialog when not logged in', () => {
    cy.get('.ant-modal-title').should('contain', 'Welcome! Please enter your credentials')
  })

  it('should require both name and token', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('button').contains('Submit').click()
    cy.get('.ant-message-error').should('be.visible')
  })

  it('should successfully log in with valid credentials', () => {
    // Fill in auth form
    cy.get('input[name="name"]').type(Cypress.env('TEST_USER_NAME'), { force: true })
    cy.get('input[name="token"]').type(Cypress.env('TEST_TOKEN'), { force: true })
    cy.get('button').contains('Submit').click()

    // Verify successful login
    cy.get('h1').should('contain', Cypress.env('TEST_USER_NAME'))
  })
}) 