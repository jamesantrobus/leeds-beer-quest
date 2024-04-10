"use client"

import SearchResult from "@/components/SearchResult"
import BeerMap from "@/components/BeerMap"
import { useEffect, useState } from "react";
import { Venue } from "@/pages/api/venues"

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
        <div className="m-3 text-center text-xl font-bold">
          Beer Quest
        </div>
        <div className="pl-3 pr-3 overflow-auto">
          {venues.map((venue, index) => (
            <SearchResult key={index} name={venue.name} description={venue.description} rating={venue.rating} onSelect={() => setSelectedVenue(venue)} />
          ))}
        </div>
      </div>

      <div className="col-span-7 relative">
        
        {selectedVenue && 
          <div className="absolute top-5 left-5 w-[250px] h-28 bg-white z-10 rounded-md shadow-md">
            { selectedVenue.name }
            <div onClick={() => setSelectedVenue(undefined)}>
              CLOSE PANEL
            </div>
          </div>}

        <BeerMap venues={venues} selectedVenue={selectedVenue} onSelect={(venue) => setSelectedVenue(venue)} />
      </div>

    </main>

  );
}
