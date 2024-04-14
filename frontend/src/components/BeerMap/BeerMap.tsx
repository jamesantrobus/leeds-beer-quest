'use client'

import { useEffect, useState } from 'react'
import Map, { MapProps, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Venue } from '@/api/getVenues'
import Image from 'next/image'

type BeerMapProps = {
  venues?: Venue[]
  selectedVenue?: Venue
  onSelect: (venue: Venue) => void
}

const defaultState: Pick<MapProps, 'longitude' | 'latitude' | 'zoom'> = {
  longitude: -1.5448842044972366,
  latitude: 53.797900782787224,
  zoom: 14,
}

const BeerMap: React.FC<BeerMapProps> = ({ venues = [], selectedVenue, onSelect }) => {
  // setup the default state to be Leeds City Centre
  const [viewState, setViewState] = useState(defaultState)

  useEffect(() => {
    // handle a venue being selected (show details) or unselected (revert to default)
    setViewState(
      selectedVenue
        ? {
            latitude: selectedVenue.location.latitude,
            longitude: selectedVenue.location.longitude,
            zoom: 16,
          }
        : defaultState
    )
  }, [selectedVenue])

  return (
    <Map
      reuseMaps
      mapboxAccessToken={process.env.NEXT_PUBLIC_MapboxAccessToken}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      {...viewState}
    >
      {venues.map((venue, index) => (
        <Marker
          key={index}
          longitude={venue.location.longitude}
          latitude={venue.location.latitude}
          anchor="bottom"
          onClick={() => onSelect(venue)}
        >
          <Image
            data-cy={`map-marker-${index}`}
            className={`${!selectedVenue || selectedVenue.name === venue.name ? 'opacity-100' : 'opacity-65'}`}
            src="/map-marker.png"
            alt={`Map marker for ${venue.name}`}
            width={40}
            height={40}
          />
        </Marker>
      ))}
    </Map>
  )
}
export default BeerMap
