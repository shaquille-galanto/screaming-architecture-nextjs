describe('todos feature', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display a message when todos are empty', () => {
    cy.contains('Your todos are empty').should('exist')
  })

  it('should display an error message when the input is empty and submit button should be disabled', () => {
    cy.contains('Add').click().should('be.disabled')
    cy.contains('This field is required').should('exist')

    cy.get('input').type('Sample todo')
    cy.contains('This field is required').should('not.exist')
  })

  it('should be able to add, edit, complete and delete todo items', () => {
    // add
    cy.get('input').type('Sample todo')
    cy.contains('Add').click()

    cy.get('input').should('have.value', '')
    cy.get('input[value="Sample todo"]').should('exist').and('have.attr', 'readonly')

    // edit
    cy.contains('Edit').click()

    cy.contains('Save').should('exist')
    cy.get('input[value="Sample todo"]').should('not.have.attr', 'readonly')

    cy.get('input[value="Sample todo"]').clear().type('Edited todo')
    cy.contains('Save').click()

    cy.get('input[value="Edited todo"]').should('exist').and('have.attr', 'readonly')
    cy.contains('Edit').should('exist')

    // complete
    cy.get('input[type="checkbox"]').click().should('be.checked')

    // delete
    cy.contains('Delete').click()
    cy.get('input[value="Edited todo"]').should('not.exist')
  })
})
