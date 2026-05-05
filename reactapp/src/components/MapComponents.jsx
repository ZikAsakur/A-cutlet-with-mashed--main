import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { API_URL } from "..";
import { Link } from "react-router-dom";
import "./MapComponets.css";
import { useNavigate } from "react-router-dom";

const DEFAULT_STYLE = {
  color: "#B0B0B0",
  weight: 1,
  fillOpacity: 0.4
};

const HOVER_STYLE = {
  color: "#49C0B5",
  weight: 3,
  fillOpacity: 0.6
};


export default function MapComp() {
  const mapRef = useRef(null);
  const geoLayerRef = useRef(null);

  const [mapData, setMapData] = useState([]);


  const [search, setSearch] = useState("");
  const [geoJsonData, setGeoJsonData] = useState(null);
  const searchTimeout = useRef(null);
  const navigate = useNavigate();

  const getColorByRegion = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + ("000000" + color).slice(-6);
  };

  // загрузка данных с backend
  useEffect(() => {
    axios.get(API_URL + "get_organization")
      .then(res => setMapData(res.data))
      .catch(err => console.log(err));
  }, []);

  // init map
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map("map", {zoomControl: false}).setView([60, 100], 3);

    mapRef.current.attributionControl.remove();

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: ""
    }).addTo(mapRef.current);

    fetch(process.env.PUBLIC_URL + "/russia.geojson")
    .then(res => {
      if (!res.ok) throw new Error("GeoJSON not found");
      return res.json();
    })
    .then(data => setGeoJsonData(data))
    .catch(err => console.error("GeoJSON load error:", err));

    return () => {
      mapRef.current.remove();
    };


  }, []);

  // render geojson
  useEffect(() => {
    if (!geoJsonData || !mapRef.current) return;

    if (geoLayerRef.current) {
      geoLayerRef.current.remove();
    }

    geoLayerRef.current = L.geoJSON(geoJsonData, {
      style: (feature) => {
      const name = feature.properties.name;

      return {
        color: "#B0B0B0",
        weight: 1,
        fillOpacity: 0.5,
        fillColor: getColorByRegion(name)
        };
      },

      onEachFeature: (feature, layer) => {
        const regionName = feature.properties.name;

        layer.on("mouseover", () => {
          layer.setStyle(HOVER_STYLE);
        });

        layer.on("mouseout", () => {
          geoLayerRef.current.resetStyle(layer);
        });

        layer.on("click", (e) => {
          const regionInfo = mapData.find(
            item => item.region === regionName
          );
          if (!regionInfo) return;

          L.popup()
            .setLatLng(e.latlng)
            .setContent(`
              
              <div style="min-width:180px"> 
              <div style="font-weight:600; margin-bottom:6px;font-size:14px"> ${regionInfo?.fio || regionName} </div>
              <div style="font-size:13px; opacity:0.7;font-size:14px; margin-bottom:6px"> ${regionInfo?.region || ""} </div>
              
                <button id="more-btn" style="background:#463ACB;color:white;text-align:center;padding:6px;border-radius:6px;">Подробнее</button>
              </div>
            `)
            .openOn(mapRef.current);

          setTimeout(() => {
            const btn = document.getElementById("more-btn");
            if (btn) {
              btn.onclick = () => {
                navigate(`/OrganizationInfo/${regionInfo.id}`);
                localStorage.setItem("selectedRegion", regionInfo.region);
                localStorage.setItem("selectedColor", getColorByRegion(regionInfo.region));
              };
            }
          }, 0);
        });
      }
    }).addTo(mapRef.current);
  }, [geoJsonData, mapData]);

useEffect(() => {
  if (!geoLayerRef.current || !mapRef.current) return;

  if (searchTimeout.current) {
    clearTimeout(searchTimeout.current);
  }

  searchTimeout.current = setTimeout(() => {

    if (!search) {
      mapRef.current.flyTo([60, 100], 3, {
        duration: 0.7
      });

      geoLayerRef.current.eachLayer(layer => {
        geoLayerRef.current.resetStyle(layer);
      });

      return;
    }

    let foundLayer = null;

    geoLayerRef.current.eachLayer(layer => {
      const name = layer.feature?.properties?.name || "";
      const match = name.toLowerCase().includes(search.toLowerCase());

      if (match) {
        layer.setStyle({ ...HOVER_STYLE, fillOpacity: 0.7 });
        layer.bringToFront();

        if (!foundLayer) foundLayer = layer;

      } else {
        layer.setStyle({
          color: "#eee",
          fillOpacity: 0.05,
          opacity: 0.3
        });
      }
    });

    if (foundLayer) {
      mapRef.current.flyToBounds(foundLayer.getBounds(), {
        padding: [20, 20],
        duration: 0.7
      });
    }

  }, 200);

}, [search]);
  
  return (
  <div style={{ position: "relative" }}>

    <div className="poisk-app-glav">
      <input
        className="poisk-input"
        placeholder="Поиск региона"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div class = "map" id="map" style={{ width: "1400px", height: "551px"}} />

  </div>
);
}
