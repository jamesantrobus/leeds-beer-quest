'use client'

import SearchResultList from '@/components/SearchResults/SearchResultList'
import BeerMap from '@/components/BeerMap/BeerMap'
import { useEffect, useState } from 'react'
import VenueDetails from '@/components/VenueDetails/VenueDetails'
import SearchFilters, { SearchParams } from '@/components/SearchFilters/SearchFilters'
import { getVenues, Venue } from '@/api/getVenues'

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>()
  const [selectedVenue, setSelectedVenue] = useState<Venue>()

  const fetchData = async (params: SearchParams) => {
    const venues = await getVenues(params)
    setVenues(venues)
  }

  useEffect(() => {
    fetchData({ category: '', minimumAverageRating: 0 })
  }, [])

  return (
    <main className="grid grid-cols-10 h-screen">
      <div className="col-span-3 overflow-hidden flex flex-col">
        <h1 className="m-3 text-center text-xl font-bold">Beer Quest</h1>
        <SearchFilters onChange={(searchParams) => fetchData(searchParams)} />
        <SearchResultList venues={venues} onSelect={(venue) => setSelectedVenue(venue)} />
      </div>

      <div className="col-span-7 relative">
        {selectedVenue && <VenueDetails venue={selectedVenue} onClose={() => setSelectedVenue(undefined)} />}
        <BeerMap venues={venues} selectedVenue={selectedVenue} onSelect={(venue) => setSelectedVenue(venue)} />
      </div>
    </main>
  )
}
