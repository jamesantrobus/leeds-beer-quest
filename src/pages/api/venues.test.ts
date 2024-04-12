import handler, { Venue } from './venues'
import { NextApiRequest, NextApiResponse } from 'next'
import httpMocks from 'node-mocks-http'
import { test, expect } from 'vitest'

type NextApiResponseWithData<TData = any> = {
  _getData(): string
} & NextApiResponse<TData>

const requestVenues = async (query: httpMocks.Query) => {
  const req: NextApiRequest = httpMocks.createRequest({
    method: 'GET',
    url: '/api/venues',
    query,
  })
  const res: NextApiResponseWithData<Venue[]> = httpMocks.createResponse()
  await handler(req, res)
  return res
}

test('API returns all venues for default filters', async () => {
  const httpResponse = await requestVenues({
    category: '',
    minimumValueRating: 0,
  })
  expect(httpResponse.statusCode).toBe(200)

  const responseBody = httpResponse._getData()
  const venues: Venue[] = JSON.parse(responseBody)
  expect(venues).toHaveLength(199)
})

test('API can filter by category and value rating', async () => {
  const httpResponse = await requestVenues({
    category: 'Pub reviews',
    minimumValueRating: 4,
  })
  expect(httpResponse.statusCode).toBe(200)

  const responseBody = httpResponse._getData()
  const venues: Venue[] = JSON.parse(responseBody)
  expect(venues).toHaveLength(21)
})

test('API response contains venue details', async () => {
  const httpResponse = await requestVenues({
    category: '',
    minimumValueRating: 0,
  })
  expect(httpResponse.statusCode).toBe(200)

  const responseBody = httpResponse._getData()
  const venue: Venue = JSON.parse(responseBody)[0]

  expect(venue.name).eq('Tapped Brew Co.')
  expect(venue.category).eq('Pub reviews')
  expect(venue.description).eq(`This new brewpub is all about the beer. And they've got it nailed.`)
  expect(venue.thumbnailUri).eq('http://leedsbeer.info/wp-content/uploads/2013/12/IMG_20131210_181816.jpg')
  expect(venue.location).toEqual({
    address: '51 Boar Lane, Leeds LS1 5EL',
    latitude: 53.7959633,
    longitude: -1.5458804,
  })
  expect(venue.rating).toEqual({
    amenities: 4,
    atmosphere: 3.5,
    beer: 5,
    value: 5,
  })
  expect(venue.contact).toEqual({
    phone: '',
    twitterUri: 'https://twitter.com/TappedLeeds',
  })
})
