"use client"

import SearchResult from "@/components/SearchResult"
import BeerMap from "@/components/BeerMap"
import { useEffect, useState } from "react";
import { Venue } from "@/pages/api/venues"

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);

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
        <div className="pl-3 pr-3 space-y-3 overflow-auto">
          {venues.map((venue, index) => (
            <SearchResult key={index} name={venue.name} description={venue.description} rating={venue.rating} />
          ))}
        </div>
      </div>

      <div className="col-span-7 relative">
        <BeerMap venues={venues} />
      </div>

    </main>

  );
}
