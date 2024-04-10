"use client"

import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Venue } from "@/pages/api/venues"

type BeerMapProps = {
  venues: Venue[]
  selectedVenue?: Venue
  onSelect: (venue: Venue) => void
}

const BeerMap: React.FC<BeerMapProps> = ({ venues = [], selectedVenue, onSelect }) => {
  // setup the default state to be Leeds City Centre
  const defaultState = { longitude: -1.5448842044972366, latitude: 53.797900782787224, zoom: 14 };
  const [viewState, setViewState] = useState(defaultState);

  useEffect(() => {
    // handle a venue being selected (show details) or unselected (revert to default)
    setViewState(selectedVenue ? 
      { latitude: selectedVenue.location.latitude, longitude: selectedVenue.location.longitude, zoom: 16 } 
      : defaultState)
  }, [selectedVenue])

  return (
    <Map
      reuseMaps
      mapboxAccessToken={process.env.NEXT_PUBLIC_MapboxAccessToken}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      {...viewState}
    >
      {venues.map((venue, index) => (
        <Marker key={index} longitude={venue.location.longitude} latitude={venue.location.latitude} anchor="bottom" onClick={() => onSelect(venue)}>
          <img data-cy={`map-marker-${index}`} className={`w-10 h-10 ${(!selectedVenue || selectedVenue.name === venue.name) ? 'opacity-100' : 'opacity-65'}`} src="./map-marker.png" />
        </Marker>
      ))}
    </Map>
  );
}
export default BeerMap
