import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import papa from 'papaparse'

type VenueLocation = {
  address: string
  latitude: number
  longitude: number
}

type VenueRating = {
  beer: number
  atmosphere: number
  amenities: number
  value: number
}

type Venue = {
  name: string
  category: string
  excerpt: string
  thumbnail: string
  location: VenueLocation
  rating: VenueRating
}

export default async (req: NextApiRequest, res: NextApiResponse<Venue[]>) => {
  // parse the CSV of Leeds Beer Quest data
  const filePath = path.join(process.cwd(), 'data', 'venues.csv')
  const csvData = fs.readFileSync(filePath, 'utf8')
  const parsedData = papa.parse(csvData, { header: true })

  // return a transformed list of venues
  const venues = parsedData.data.map((row: any) => ({
    name: row.name,
    category: row.category,
    excerpt: row.excerpt,
    thumbnail: row.thumbnail,
    location: {
      address: row.address,
      latitude: Number(row.lat),
      longitude: Number(row.lng)
    },
    rating: {
      beer: Number(row.stars_beer),
      atmosphere: Number(row.stars_atmosphere),
      amenities: Number(row.stars_amenities),
      value: Number(row.stars_value),
    }
  }) as Venue)
  res.status(200).json(venues)
}
