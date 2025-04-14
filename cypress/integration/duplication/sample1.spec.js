describe('Code duplication bad practice - Sample 1', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**'
    ).as('getStories')
  });

  it('searches by typing and hitting enter', () => {
    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@searchField')
    cy.wait('@getStories')
      .type('frontend testing{enter}')
    cy.wait('@getStories')
    cy.get('.table-row')
      .should('have.length', 100)
  })

  it('searches by typing and pressing the search button', () => {
    cy.wait('@seachField')
      .type('frontend testing')
    cy.contains('button', 'Search')
      .should('be.visible')
      .click()
    cy.wait('@getStories')
    cy.get('.table-row')
      .should('have.length', 100)
  })
})
