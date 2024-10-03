import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import tileLayer from "../util/tileLayer";
import useAxios from "../util/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const MapWrapper = () => {
  const center = [27.7159446, 85.329119];
  const [mid, setMid] = useState({
    midpoint_longitude: "",
    midpoint_latitude: "",
  });
  const { userDetail } = useUser();
  console.log(userDetail);
  const longitude = userDetail?.location?.longitude;
  const latitude = userDetail?.location?.latitude;

  useEffect(() => {
    const getMid = async () => {
      const response = await axiosInstance.post("/centroApp/midpointView/")({
        id: id,
        latitude: latitude,
        longitude: longitude,
      });
      setMid(response.data);
    };
    getMid();
  });
  const points = [
    {
      lat: 27.8159446,
      lng: 85.429119,
      title: "Buyer",
    },
    {
      lat: 27.7159446,
      lng: 85.329119,
      title: "Seller",
    },
  ];

  const MyMarkers = ({ data }) => {
    return data.map(({ lat, lng, title }, index) => (
      <Marker key={index} position={{ lat, lng }}>
        <Popup>{title}</Popup>
      </Marker>
    ));
  };
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const axiosInstance = useAxios();

  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       const response = await axiosInstance.get(
  //         `/centroApp/selectedProduct/${id}`
  //       );
  //       setProduct(response.data);
  //     };
  //     fetchProduct();
  //   }, []);
  return (
    <div>
      <MapContainer
        className='p-10 w-full h-[100vh]'
        center={center}
        zoom={18}
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
