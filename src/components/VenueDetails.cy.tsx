import React from 'react'
import VenueDetails from './VenueDetails'
import { Venue } from '@/pages/api/venues'

describe('<VenueDetails />', () => {
  const venue: Venue = {
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
  }

  it('renders the venue details', () => {
    cy.mount(<VenueDetails venue={venue} onClose={() => {}} />)
    cy.get('[data-cy="image"]').should('have.css', 'background-image', `url("${venue.thumbnailUri}")`);
    cy.get('[data-cy="name"]').should('have.text', venue.name)
    cy.get('[data-cy="address"]').should('have.text', venue.location.address)
    cy.get('[data-cy="description"]').should('have.text', venue.description)
    cy.get('[data-cy="rating-Amenities"]').should('have.text', 'Amenities (1/5)')
    cy.get('[data-cy="rating-Amenities"] [data-cy="bar"]').should('have.attr', 'style', 'width: 20%;')
    cy.get('[data-cy="rating-Atmosphere"]').should('have.text', 'Atmosphere (2/5)')
    cy.get('[data-cy="rating-Atmosphere"] [data-cy="bar"]').should('have.attr', 'style', 'width: 40%;')
    cy.get('[data-cy="rating-Beer"]').should('have.text', 'Beer (3/5)')
    cy.get('[data-cy="rating-Beer"] [data-cy="bar"]').should('have.attr', 'style', 'width: 60%;')
    cy.get('[data-cy="rating-Value"]').should('have.text', 'Value (4/5)')
    cy.get('[data-cy="rating-Value"] [data-cy="bar"]').should('have.attr', 'style', 'width: 80%;')
    cy.get('[data-cy="phone-link"]').should('have.attr', 'href', `tel:${venue.contact.phone}`)
    cy.get('[data-cy="twitter-link"]').should('have.attr', 'href', venue.contact.twitterUri)
  })

  it('hides the phone link when no data', () => {
    const venueWithoutPhone: Venue = {
      ...venue,
      contact: {
        ...venue.contact,
        phone: "",
      },
    };

    cy.mount(<VenueDetails venue={venueWithoutPhone} onClose={() => {}} />)
    cy.get('[data-cy="phone-link"]').should('not.exist')
  })

  it('hides the Twitter link when no data', () => {
    const venueWithoutTwitter: Venue = {
      ...venue,
      contact: {
        ...venue.contact,
        twitterUri: "",
      },
    };

    cy.mount(<VenueDetails venue={venueWithoutTwitter} onClose={() => {}} />)
    cy.get('[data-cy="twitter-link"]').should('not.exist')
  })

  it('allows the panel to be closed', () => {
    const onCloseSpy = cy.stub().as('onClose')

    cy.mount(<VenueDetails venue={venue} onClose={onCloseSpy} />)

    cy.get('[data-cy="close-link"]').click()

    cy.get('@onClose').should('have.been.calledOnce')
  })
})