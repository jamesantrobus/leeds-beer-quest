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
