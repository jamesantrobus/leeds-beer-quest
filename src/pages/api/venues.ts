import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import papa from 'papaparse'

type VenueLocation = {
  address: string
  latitude: number
  longitude: number
}

export type VenueRating = {
  beer: number
  atmosphere: number
  amenities: number
  value: number
  average: number
}

export type VenueContact = {
  phone: string
  twitterUri: string
}

export type Venue = {
  name: string
  category: string
  description: string
  thumbnailUri: string
  location: VenueLocation
  rating: VenueRating
  contact: VenueContact
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Venue[]>) => {
  // parse the CSV of Leeds Beer Quest data
  const filePath = path.join(process.cwd(), 'data', 'venues.csv')
  const csvData = fs.readFileSync(filePath, 'utf8')
  const parsedData = papa.parse(csvData, { header: true })

  // return a transformed list of venues
  const venues = parsedData.data
    .map(
      (row: any) =>
        ({
          name: row.name,
          category: row.category,
          description: row.excerpt,
          thumbnailUri: row.thumbnail,
          location: {
            address: row.address,
            latitude: Number(row.lat),
            longitude: Number(row.lng),
          },
          rating: {
            beer: Number(row.stars_beer),
            atmosphere: Number(row.stars_atmosphere),
            amenities: Number(row.stars_amenities),
            value: Number(row.stars_value),
            average:
              (Number(row.stars_beer) +
                Number(row.stars_atmosphere) +
                Number(row.stars_amenities) +
                Number(row.stars_value)) /
              4,
          },
          contact: {
            phone: row.phone,
            twitterUri: row.twitter ? `https://twitter.com/${row.twitter}` : '',
          },
        }) as Venue
    )
    .filter((v: Venue) => v.category !== 'Closed venues')
    .filter((v: Venue) => (req.query.category ? v.category === req.query.category : true))
    .filter((v: Venue) => v.rating.average >= Number(req.query.minimumAverageRating))
    .sort((a, b) => b.rating.average - a.rating.average)

  res.status(200).json(venues)
}

export default handler
