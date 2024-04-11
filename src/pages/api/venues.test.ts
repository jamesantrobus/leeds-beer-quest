import handler, { Venue } from './venues'
import { NextApiRequest, NextApiResponse } from 'next'
import httpMocks from 'node-mocks-http';
import {test, expect} from "vitest"

type NextApiResponseWithData<TData = any> = {
  _getData(): string
} & NextApiResponse<TData>


test('API returns all venues for default filters', async () => {
  const req: NextApiRequest = httpMocks.createRequest({
    method: 'GET',
    url: '/api/venues',
    query: { category: '', minimumValueRating: 0 }
  })
  const res: NextApiResponseWithData<Venue[]> = httpMocks.createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200)

  const responseBody = res._getData()
  const venues:Venue[] = JSON.parse(responseBody)
  expect(venues).toHaveLength(199)
})

test('API can filter by category and value rating', async () => {
  const req: NextApiRequest = httpMocks.createRequest({
    method: 'GET',
    url: '/api/venues',
    query: { category: 'Pub reviews', minimumValueRating: 4 }
  })
  const res: NextApiResponseWithData<Venue[]> = httpMocks.createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200)

  const responseBody = res._getData()
  const venues:Venue[] = JSON.parse(responseBody)
  expect(venues).toHaveLength(21)
})