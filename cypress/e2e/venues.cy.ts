/// <reference types="cypress" />

describe('Venues', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/venues').as('getVenuesRequest')
    
    cy.visit('http://localhost:3000')
    cy.wait('@getVenuesRequest')
  })

  it('Open and close a venue from the list view', () => {
    // click the first item in the list view
    cy.get('[data-cy="search-result"]').first().click()

    // check the correct venue is displayed  
    cy.get('[data-cy="venue-details"]')
      .should('be.visible')
      .should('contain.text', 'Tapped Brew Co.')

    // close the venue
    cy.get('[data-cy="close-link"]').click()
    cy.get('[data-cy="venue-details"]').should('not.exist')
  })

  it('Open and close a venue from the map view', () => {
    // click a map marker
    cy.get('[data-cy="map-marker-4"]').click({force: true})

    // check the correct details are shown
    cy.get('[data-cy="venue-details"]')
      .should('be.visible')
      .should('contain.text', 'The Angel Inn')

    // close the venue
    cy.get('[data-cy="close-link"]').click()
    cy.get('[data-cy="venue-details"]').should('not.exist')
  })
})
