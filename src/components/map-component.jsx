"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const pinSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>
`);

const mapPin = L.divIcon({
  className: "afra-map-pin",
  html: `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
      <div style="
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        padding: 4px 12px;
        border-radius: 8px;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        margin-bottom: 8px;
        white-space: nowrap;
        font-family: IRANSans, sans-serif;
        font-weight: 700;
        font-size: 13px;
        color: #1c1917;
      ">
        اقامتگاه افراتخته
      </div>

      <div style="
        width: 44px;
        height: 44px;
        border-radius: 14px;
        background: #ef4444;
        border: 2px solid rgba(255,255,255,0.95);
        box-shadow: 0 10px 24px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <img
          alt="pin"
          src="data:image/svg+xml,${pinSvg}"
          style="width: 28px; height: 28px; display: block;"
        />
      </div>
    </div>
  `,
  iconSize: [140, 88],
  iconAnchor: [70, 88],
  popupAnchor: [0, -88],
});

export default function MapComponent({ position }) {
  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <Marker position={position} icon={mapPin}>
        <Popup>
          <div className="flex flex-col gap-2 p-1">
            <span className="font-bold text-gray-900">اقامتگاه افراتخته</span>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 hover:bg-red-600 text-white text-center py-2 px-4 rounded-lg text-sm transition-colors duration-200"
            >
              مسیریابی با گوگل مپ
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

