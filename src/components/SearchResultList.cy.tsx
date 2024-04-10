import React from 'react'
import SearchResultList from './SearchResultList'
import { Venue } from '@/pages/api/venues'

describe('<SearchResultList />', () => {
  const buildTestVenue = () => {
    return {
      name: "Test Pub",
      description: "A test pub",
      category: "Pub Reviews",
      thumbnailUri: "https://leedsbeer.info/wp-content/uploads/2013/12/IMG_20131210_181816.jpg",
      rating: {
        amenities: 1,
        atmosphere: 2,
        beer: 3,
        value: 4
      },
      contact: {
        phone: "012 345 678",
        twitterUri: "testpub"
      },
      location: {
        address: "Example Lane, LS1 4BR",
        latitude: 53.7959633,
        longitude: -1.5458804
      }
    } as Venue
  }

  it('renders a list of venues', () => {
    const venues = [
      buildTestVenue(),
      buildTestVenue(),
      buildTestVenue()
    ]

    cy.mount(<SearchResultList venues={venues} onSelect={() => {}} />)

    cy.get('[data-cy="search-result"]').should('have.length', 3)
  })

  it('renders an empty list when there are no venues', () => {
    const venues: Venue[] = []

    cy.mount(<SearchResultList venues={venues} onSelect={() => {}} />)

    cy.get('[data-cy="search-result"]').should('have.length', 0)
  })

  it('allows a venue to be selected', () => {
    const onSelectSpy = cy.stub().as('onSelect')
    const venues = [ buildTestVenue() ]
    cy.mount(<SearchResultList venues={venues} onSelect={onSelectSpy} />)

    cy.get('[data-cy="search-result"]').click()

    cy.get('@onSelect').should('have.been.calledOnceWith', venues[0])
  })
})