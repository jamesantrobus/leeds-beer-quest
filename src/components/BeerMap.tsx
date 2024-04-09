"use client"

import { useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function BeerMap() {
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
    />
  );
}