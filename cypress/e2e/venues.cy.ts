/// <reference types="cypress" />

describe('Venues', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/venues**').as('getVenuesRequest')

    cy.visit('http://localhost:3000')
    cy.wait('@getVenuesRequest')
    cy.wait('@getVenuesRequest')
  })

  it('Open and close a venue from the list view', () => {
    // click the first item in the list view
    cy.get('[data-cy="search-result"]').first().click()

    // check the correct venue is displayed
    cy.get('[data-cy="venue-details"]').should('be.visible').should('contain.text', `Mr Foley's Cask Ale House`)

    // close the venue
    cy.get('[data-cy="close-link"]').click()
    cy.get('[data-cy="venue-details"]').should('not.exist')
  })

  it('Open and close a venue from the map view', () => {
    // click a map marker
    cy.get('[data-cy="map-marker-4"]').click({ force: true })

    // check the correct details are shown
    cy.get('[data-cy="venue-details"]').should('be.visible').should('contain.text', 'Bundobust')

    // close the venue
    cy.get('[data-cy="close-link"]').click()
    cy.get('[data-cy="venue-details"]').should('not.exist')
  })

  it('Filtering updates list and map views', () => {
    // check initial count
    cy.get('[data-cy="search-result"]').should('have.length', 199)
    cy.get('[aria-label="Map marker"]').should('have.length', 199)

    // filter results to pubs
    cy.get('[data-cy="category-filter"]').select('Pubs')
    cy.wait('@getVenuesRequest').then((interception) => {
      const requestUrl = interception.request.url
      expect(requestUrl).to.include('/api/venues?category=Pub%20reviews&minimumAverageRating=0')
    })

    // further filter results to over 4 stars
    cy.get('[data-cy="average-rating-filter"]').select('Over 4 stars')
    cy.wait('@getVenuesRequest').then((interception) => {
      const requestUrl = interception.request.url
      expect(requestUrl).to.include('/api/venues?category=Pub%20reviews&minimumAverageRating=4')
    })

    // check the list view is updated
    cy.get('[data-cy="search-result"]').should('have.length', 4)

    // check the map view is updated
    cy.get('[aria-label="Map marker"]').should('have.length', 4)
  })
})
