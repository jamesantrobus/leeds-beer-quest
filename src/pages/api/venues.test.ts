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
    minimumAverageRating: 0,
  })
  expect(httpResponse.statusCode).toBe(200)

  const responseBody = httpResponse._getData()
  const venues: Venue[] = JSON.parse(responseBody)
  expect(venues).toHaveLength(199)
})

test('API can filter by category and value rating', async () => {
  const httpResponse = await requestVenues({
    category: 'Pub reviews',
    minimumAverageRating: 4,
  })
  expect(httpResponse.statusCode).toBe(200)

  const responseBody = httpResponse._getData()
  const venues: Venue[] = JSON.parse(responseBody)
  expect(venues).toHaveLength(4)
})

test('API response contains venue details', async () => {
  const httpResponse = await requestVenues({
    category: '',
    minimumAverageRating: 0,
  })
  expect(httpResponse.statusCode).toBe(200)

  const responseBody = httpResponse._getData()
  const venue: Venue = JSON.parse(responseBody)[0]

  expect(venue.name).eq(`Mr Foley's Cask Ale House`)
  expect(venue.category).eq('Pub reviews')
  expect(venue.description).eq(
    `One of our favourite places in Leeds. Unpretentious pub in a great location with an amazing beer selection.`
  )
  expect(venue.thumbnailUri).eq('http://leedsbeer.info/wp-content/uploads/2012/10/20121028_220545.jpg')
  expect(venue.location).toEqual({
    address: '159 The Headrow, Leeds LS1 5RG',
    latitude: 53.7994537,
    longitude: -1.5488919,
  })
  expect(venue.rating).toEqual({
    beer: 5,
    atmosphere: 4,
    amenities: 4,
    value: 4.5,
    average: 4.375,
  })
  expect(venue.contact).toEqual({
    phone: '0113 242 9674',
    twitterUri: 'https://twitter.com/Mrfoleys',
  })
})
