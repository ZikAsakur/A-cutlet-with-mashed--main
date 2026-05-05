import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

export default function MapOrganiz({ regionName }) {
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  const [geoJsonData, setGeoJsonData] = useState(null);

  const getStyleByZoom = (zoom) => {
  const intensity = Math.min(Math.max((zoom - 3) / 7, 0), 1);

  const savedRegion = localStorage.getItem("selectedRegion");
  const savedColor = localStorage.getItem("selectedColor");

  return {
    weight: 1 + intensity * 2,
    fillOpacity: 0.3 + intensity * 0.4
    };
  };
 
  
  const getColorByRegion = (name) => {
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();

    return "#" + ("000000" + color).slice(-6);
  };
  
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/russia.geojson")
      .then(res => res.json())
      .then(data => setGeoJsonData(data))
      .catch(err => console.log(err));
  }, []);


  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map("map-org", {
      zoomControl: false
    }).setView([60, 100], 3);
    mapRef.current.attributionControl.remove();
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: ""
    }).addTo(mapRef.current);
    
    return () => {
      mapRef.current.remove();
    };
  }, []);

  
  useEffect(() => {
    if (!geoJsonData || !mapRef.current) return;

    if (layerRef.current) {
      layerRef.current.remove();
    }

    layerRef.current = L.geoJSON(geoJsonData, {
      filter: (feature) => {
        return feature.properties.name === regionName;
      },

      style: (feature) => {
        const name = feature.properties.name;

        return {
          color: getColorByRegion(name),
          weight: 2,
          fillOpacity: 0.8,
          fillColor: getColorByRegion(name)
        };
}
    }).addTo(mapRef.current);

    const bounds = layerRef.current.getBounds();
    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, {
        padding: [20, 20]
      });
    }

  }, [geoJsonData, regionName]);

  return (
    <div
      class = "map"
      id="map-org"
      style={{
        width: "588px",
        height: "644px",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
      }}
    />
  );
}