import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import tileLayer from "../util/tileLayer";
import useAxios from "../util/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProductItem from "../component/ProductItem";

const MapWrapper = () => {
  const center = [27.7159446, 85.329119];
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { userDetail } = useUser();

  const [mid, setMid] = useState({});
  const [locationName, setLocationName] = useState("");
  const [product, setProduct] = useState({}); // Changed to an object

  useEffect(() => {
    const getMid = async () => {
      if (userDetail && userDetail.location) {
        // Check if userDetail and location are defined
        const { latitude, longitude } = userDetail.location;
        try {
          const response = await axiosInstance.post(
            "/centroApp/midpointView/",
            {
              id: Number(id),
              latitude,
              longitude,
            }
          );
          setMid(response.data);
          fetchLocationName(
            response.data.midpoint_latitude,
            response.data.midpoint_longitude
          );
        } catch (error) {
          console.error("Error fetching midpoint data:", error);
        }
      }
    };

    getMid();
  }, [id, userDetail]); // Ensure userDetail is a dependency

  const fetchLocationName = async (lat, lng) => {
    if (lat && lng) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLocationName(data.display_name || "Location not found");
      } catch (error) {
        console.error("Error fetching location name:", error);
      }
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/centroApp/selectedProduct/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]); // Ensure this fetches on id change

  const initiateBuy = () => {
    useEffect(() => {
      const response = axiosInstance.post("/centroApp/purchase-product/", {
        product_id: id,
      });
      console.log(response, "clicking");
    }, []);
  };
  const points = [
    {
      lat: mid.user_latitude || 0,
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
      title: "Midpoint",
    },
  ];

  return (
    <div className='flex'>
      <div className='p-4 w-3/6'>
        {Object.keys(product).length > 0 ? (
          <ProductItem product={product} key={product?.id} />
        ) : (
          <p>Loading product...</p>
        )}
        <p className='mt-5 text-gray-600 text-lg'>
          The midpoint between the buyer and seller is located at:{" "}
          {locationName || "Loading..."}
        </p>
        <div className='flex justify-between items-center mt-5'>
          <button className='bg-black border rounded-xl w-full h-12 text-white'>
            Go Back
          </button>
          <button
            onClick={initiateBuy()}
            className='bg-black border rounded-xl w-full h-12 text-white'
          >
            Buy
          </button>
        </div>
      </div>
      <div className='w-2/3'>
        <MapContainer
          className='p-10 w-full h-[100vh]'
          center={center}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer {...tileLayer} />
          {points.map(({ lat, lng, title }, index) => (
            <Marker key={index} position={[lat, lng]}>
              <Popup>{title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapWrapper;
