import React from 'react'
import SearchResultItem from './SearchResultItem'
import { VenueRating } from '@/pages/api/venues'

describe('<SearchResultItem />', () => {
  const venueRating: VenueRating = {
    amenities: 1,
    atmosphere: 2,
    beer: 3,
    value: 4,
  }

  it('renders the venue details', () => {
    cy.mount(
      <SearchResultItem
        name="Test Pub Name"
        description="Test Pub Description"
        rating={venueRating}
        onSelect={() => {}}
      />
    )

    cy.get('[data-cy="name"]').should('have.text', 'Test Pub Name')
    cy.get('[data-cy="description"]').should('have.text', 'Test Pub Description')
    cy.get('[data-cy="star-rating"]').should('have.text', venueRating.value)
  })

  it('allows a venue to be selected', () => {
    const onSelectSpy = cy.stub().as('onSelect')
    cy.mount(
      <SearchResultItem
        name="Test Pub Name"
        description="Test Pub Description"
        rating={venueRating}
        onSelect={onSelectSpy}
      />
    )

    cy.get('[data-cy="search-result"]').click()

    cy.get('@onSelect').should('have.been.calledOnce')
  })
})
