import { SearchParams } from '@/components/SearchFilters/SearchFilters'

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

type GetVenuesResponse = {
  venues: Venue[]
}

export const getVenues = async (params: SearchParams) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BEER_QUEST_API}/venues?category=${params.category}&minimumAverageRating=${params.minimumAverageRating}`
  )

  const data: GetVenuesResponse = await response.json()
  return data.venues
}
