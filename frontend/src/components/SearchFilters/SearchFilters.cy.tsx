import React from 'react'
import SearchFilters from './SearchFilters'

describe('<SearchFilters />', () => {
  it('onChange called when category filter changes', () => {
    const onChangeSpy = cy.stub().as('onChange')
    cy.mount(<SearchFilters onChange={onChangeSpy} />)

    cy.get('[data-cy="category-filter"]').select('Pubs')
    cy.get('@onChange').should('have.been.calledOnceWith', {
      category: 'Pub reviews',
      minimumAverageRating: 0,
    })
  })

  it('onChange called when category filter changes', () => {
    const onChangeSpy = cy.stub().as('onChange')
    cy.mount(<SearchFilters onChange={onChangeSpy} />)

    cy.get('[data-cy="average-rating-filter"]').select('Over 4 stars')
    cy.get('@onChange').should('have.been.calledOnceWith', {
      category: '',
      minimumAverageRating: 4,
    })
  })
})
