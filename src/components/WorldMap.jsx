import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../context/CitiesContext";
import { useState, useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import styles from "./WorldMap.module.css";

const googleMapApi = import.meta.env.VITE_GOOGLE_MAP_API;
const mapId = import.meta.env.VITE_GOOGLE_MAP_MAP_ID;

function WorldMap() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState({ lat: 50, lng: -50 });
  const [mapZoom, setMapZoom] = useState(4);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const initialZoom = 4;

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition({ lat: parseFloat(mapLat), lng: parseFloat(mapLng) });
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPosition({
          lat: geoLocationPosition.lat,
          lng: geoLocationPosition.lng,
        });
    },
    [geoLocationPosition]
  );

  const handleMapClick = (e) => {
    // e.detail.latLng should contain the clicked location.
    // Depending on the API, latLng may be an object with .lat() and .lng() methods.
    // Adjust the code accordingly if needed.
    const latLng = e.detail.latLng;
    const lat = latLng.lat;
    const lng = latLng.lng;

    // Navigate to /form and pass lat and lng as query parameters
    navigate(`/dashboard/form?lat=${lat}&lng=${lng}`);
  };

  const handleUseLocation = () => {
    getPosition();
    setMapZoom(8);
  };

  return (
    <APIProvider apiKey={googleMapApi}>
      <div className={styles.container}>
        <Map
          defaultZoom={initialZoom}
          defaultCenter={
            mapLat && mapLng
              ? { lat: parseFloat(mapLat), lng: parseFloat(mapLng) }
              : mapPosition
          }
          mapId={mapId}
          mapOptions={{
            zoomControl: true,
            scrollwheel: true,
            gestureHandling: "greedy",
            draggable: true,
          }}
          minZoom={2}
          maxZoom={7}
          restriction={{
            latLngBounds: {
              north: 60,
              south: -60,
              east: 180,
              west: -180,
            },
          }}
          onClick={handleMapClick}
          className={styles.map}
        >
          {cities.map((city, index) => (
            <AdvancedMarker
              position={{
                lat: parseFloat(city.lat),
                lng: parseFloat(city.lng),
              }}
              key={index}
            >
              <Pin background="red" borderColor="white" glyphColor="purple" />
            </AdvancedMarker>
          ))}
          <ChangeCenter position={mapPosition} zoom={mapZoom} />
        </Map>
        <Button
          type="position"
          onClick={handleUseLocation}
          className={styles.button}
        >
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </Button>
      </div>
    </APIProvider>
  );
}

function ChangeCenter({ position, zoom }) {
  const map = useMap();
  map.setCenter(position);
  map.setZoom(zoom);
  return null;
}

export default WorldMap;
