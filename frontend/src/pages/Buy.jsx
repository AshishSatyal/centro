import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import tileLayer from "../util/tileLayer";
import useAxios from "../util/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const MapWrapper = () => {
  const customPopup = (
    <iframe
      width='auto'
      title='Marek Grechuta'
      height='310'
      src='https://www.youtube.com/embed/glKDhBuoRUs'
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  );

  const center = [27.7159446, 85.329119];
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { userDetail } = useUser();

  console.log(userDetail);
  const longitude = userDetail?.location?.longitude;
  const latitude = userDetail?.location?.latitude;

  const [mid, setMid] = useState({});

  useEffect(() => {
    const getMid = async () => {
      // Ensure latitude and longitude are defined
      if (latitude && longitude) {
        try {
          const response = await axiosInstance.post(
            "/centroApp/midpointView/",
            {
              id: Number(id),
              latitude: latitude,
              longitude: longitude,
            }
          );
          setMid(response.data); // Check the structure of response.data
        } catch (error) {
          console.error("Error fetching midpoint data:", error);
        }
      }
    };

    getMid();
  }, [id]); // Add dependencies

  const points = [
    {
      lat: mid.user_latitude || 0, // Provide defaults to avoid NaN
      lng: mid.user_longitude || 0,
      title: "Buyer",
    },
    {
      lat: mid.product_latitude || 0,
      lng: mid.product_longitude || 0,
      title: "Seller",
    },
    {
      lat: mid.midpoint_latitude || 0,
      lng: mid.midpoint_longitude || 0,
      title: "midpoint",
    },
  ];
  console.log(
    mid.midpoint_longitude,
    mid.product_longitude,
    mid.user_longitude,
    mid.user_latitude
  );

  const MyMarkers = ({ data }) => {
    return data.map(({ lat, lng, title }, index) => (
      <Marker key={index} position={[lat, lng]}>
        <Popup>{title}</Popup>
      </Marker>
    ));
  };

  return (
    <div>
      <MapContainer
        className='p-10 w-full h-[100vh]'
        center={center}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer {...tileLayer} />
        <MyMarkers data={points} />
      </MapContainer>
      <p></p>
    </div>
  );
};

export default MapWrapper;
