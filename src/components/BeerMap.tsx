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
  // TODO extract default state
  const [viewState, setViewState] = useState({
    longitude: -1.5448842044972366,
    latitude: 53.797900782787224,
    zoom: 14
  });

  useEffect(() => {
    if (selectedVenue) {
      setViewState({ latitude: selectedVenue.location.latitude, longitude: selectedVenue.location.longitude, zoom: 16 })
    } else {
      // TODO review conditional, use default state if needed

      setViewState({
        longitude: -1.5448842044972366,
        latitude: 53.797900782787224,
        zoom: 14
      })
    }
  }, [selectedVenue])

  const onInternalSelect = (venue: Venue) => {
    // TODO
    // setViewState({ latitude: venue.location.latitude, longitude: venue.location.longitude, zoom: 16 })
    onSelect(venue)
  }

  return (
    <Map
      reuseMaps
      mapboxAccessToken={process.env.NEXT_PUBLIC_MapboxAccessToken}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      {...viewState}
    >
      {venues.map((venue, index) => (
        <Marker key={index} longitude={venue.location.longitude} latitude={venue.location.latitude} anchor="bottom" onClick={() => onInternalSelect(venue)}>
          <img className={`w-10 h-10 ${(!selectedVenue || selectedVenue.name === venue.name) ? 'opacity-100' : 'opacity-65'}`} src="./map-marker.png" />
        </Marker>
      ))}
    </Map>
  );
}
export default BeerMap
