"use client"

import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Venue } from "@/pages/api/venues"

type BeerMapProps = {
  venues: Venue[]
}

const BeerMap: React.FC<BeerMapProps> = ({ venues }) => {
  const [viewState, setViewState] = useState({
    longitude: -1.5448842044972366,
    latitude: 53.797900782787224,
    zoom: 14
  });

  return (
    <Map
      reuseMaps
      mapboxAccessToken={process.env.NEXT_PUBLIC_MapboxAccessToken}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      {...viewState}
    >
      {venues?.map((venue, index) => (
        <Marker key={index} longitude={venue.location.longitude} latitude={venue.location.latitude} anchor="bottom" onClick={() => alert(venue.name)}>
          <img className="w-10 h-10" src="./map-marker.png" />
        </Marker>
      ))}
    </Map>
  );
}
export default BeerMap
