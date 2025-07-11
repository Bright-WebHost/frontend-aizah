'use client'

import { icon } from "leaflet"
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import tentData from '@/data/Tent.json'

const ICON = icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [32, 32],
});

const MapComponent = () => {
    // Updated position for Dubai
    const position = { lat: 10.31, lng: 52.11 }

    return (
        <div className='w-full h-full overflow-hidden relative'>
            <MapContainer center={position} zoom={5} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {tentData.map(item => (
                    <Marker
                        key={item.id}
                        position={{ lat: item.locationMap.lat, lng: item.locationMap.lng }}
                        icon={ICON}
                    >
                        <Tooltip permanent direction="top" offset={[0, -15]}>
                            <div>{item.price}</div>
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
