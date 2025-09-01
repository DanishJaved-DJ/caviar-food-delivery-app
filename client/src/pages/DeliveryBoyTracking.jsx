import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import home from "../assets/home.png";
import scooter from "../assets/scooter.png";

// Custom icons
const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -40],
});

export default function DeliveryBoyTracking({ currentOrder }) {
  if (!currentOrder)
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-lg">
        <img src={home} alt="No Order" className="w-20 h-20 mb-4 opacity-70" />
        <p className="text-lg font-semibold text-orange-500">No current active order</p>
      </div>
    );

  const deliveryLat = currentOrder?.deliveryBoyLocation?.lat;
  const deliveryLng = currentOrder?.deliveryBoyLocation?.lng;
  const customerLat = currentOrder?.customer?.lat;
  const customerLng = currentOrder?.customer?.lng;

  const center =
    deliveryLat && deliveryLng ? [deliveryLat, deliveryLng] : [28.6139, 77.209];

  const path =
    deliveryLat && deliveryLng && customerLat && customerLng
      ? [
          [deliveryLat, deliveryLng],
          [customerLat, customerLng],
        ]
      : [];

  return (
    <div className="w-full h-[430px] mt-3 rounded-xl overflow-hidden shadow-xl border-4 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-100 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-[1000] bg-gradient-to-r from-yellow-400 to-orange-400 py-3 px-6 flex items-center gap-3 shadow-md">
        <img src={scooter} alt="Delivery" className="w-8 h-8" />
        <span className="text-xl font-bold text-white tracking-wide drop-shadow">
          Delivery Tracking
        </span>
      </div>
      {/* Map */}
      <div className="pt-14 h-full w-full">
        <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Delivery Boy Marker */}
          {deliveryLat && deliveryLng && (
            <Marker position={[deliveryLat, deliveryLng]} icon={deliveryBoyIcon}>
              <Popup>
                <div className="text-center">
                  <span role="img" aria-label="scooter" className="text-2xl">
                    🛵
                  </span>
                  <div className="font-semibold text-orange-600 mt-1">Delivery Boy</div>
                </div>
              </Popup>
            </Marker>
          )}
          {/* Customer Marker */}
          {customerLat && customerLng && (
            <Marker position={[customerLat, customerLng]} icon={customerIcon}>
              <Popup>
                <div className="text-center">
                  <span role="img" aria-label="home" className="text-2xl">
                    🏠
                  </span>
                  <div className="font-semibold text-green-600 mt-1">Customer</div>
                </div>
              </Popup>
            </Marker>
          )}
          {/* Path */}
          {path.length > 0 && (
            <Polyline
              positions={path}
              color="#f59e42"
              weight={6}
              dashArray="10,10"
              opacity={0.8}
            />
          )}
        </MapContainer>
      </div>
      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 py-2 px-6 flex justify-between items-center text-sm font-medium rounded-b-xl shadow-inner">
        <div>
          <span className="text-orange-500">Order:</span>{" "}
          <span className="font-bold">{currentOrder?.orderId || "N/A"}</span>
        </div>
        <div>
          <span className="text-green-600">Customer:</span>{" "}
          <span>{currentOrder?.customer?.name || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
