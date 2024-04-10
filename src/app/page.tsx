"use client"

import SearchResultList from "@/components/SearchResultList"
import BeerMap from "@/components/BeerMap"
import { useEffect, useState } from "react";
import { Venue } from "@/pages/api/venues"
import VenueDetails from "@/components/VenueDetails";

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/venues')
      const data: Venue[] = await response.json()
      setVenues(data);
    }
    fetchData()
  }, [])

  return (
    <main className="grid grid-cols-10 h-screen">

      <div className="col-span-3 overflow-hidden flex flex-col">
        <h1 className="m-3 text-center text-xl font-bold">
          Beer Quest
        </h1>
        <SearchResultList venues={venues} onSelect={(venue) => setSelectedVenue(venue)} />
      </div>

      <div className="col-span-7 relative">
        {selectedVenue && <VenueDetails venue={selectedVenue} onClose={() => setSelectedVenue(undefined)} />}
        <BeerMap venues={venues} selectedVenue={selectedVenue} onSelect={(venue) => setSelectedVenue(venue)} />
      </div>

    </main>

  );
}
