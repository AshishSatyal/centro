import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Modal from "./Modal"; // Import the Modal component

import "leaflet/dist/leaflet.css";

// Import marker images
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Default icon for the marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = ({ setLocation, location: position }) => {
  // const [position, setPosition] = useState(null);
  const [locationName, setLocationName] = useState(""); // New state for location name
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const coords = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            setLocation([position.coords.latitude, position.coords.longitude]);
            await fetchLocationName(coords); // Fetch location name
          },
          (error) => {
            console.error("Error getting location", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  // Function to fetch location name using reverse geocoding
  const fetchLocationName = async ([latitude, longitude]) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLocationName(data.display_name || "Location not found");
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  // Custom hook to set map view when position changes
  const MapViewSetter = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.setView(position, 13); // Adjust zoom level as needed
      }
    }, [map, position]);

    return null;
  };

  return (
    <div className='relative z-0 w-full h-[20rem]'>
      <button
        onClick={() => setIsModalOpen(true)}
        className='bg-green-500 hover:bg-green-600 mb-4 px-4 py-2 rounded text-white'
      >
        Show Location
      </button>
      <div>
        <MapContainer
          center={position || [51.505, -0.09]}
          className='z-0 absolute'
          zoom={13}
          style={{ height: "80%", width: "100%" }}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {position && (
            <Marker position={position}>
              <Popup>
                Your current location: {locationName}{" "}
                {/* Display the location name */}
              </Popup>
            </Marker>
          )}
          <MapViewSetter position={position} />
        </MapContainer>
      </div>

      <Modal
        location={locationName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MapComponent;
