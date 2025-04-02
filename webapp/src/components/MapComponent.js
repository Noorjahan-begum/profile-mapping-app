import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './MapComponent.css';

// Default center (you can adjust these coordinates)
const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
};

function MapComponent({ address, onClose }) {
    const [map, setMap] = useState(null);
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const [error, setError] = useState(null);

    const mapStyles = {
        height: "300px",
        width: "400px"
    };

    const onLoad = React.useCallback(async (map) => {
        const geocoder = new window.google.maps.Geocoder();

        try {
            const results = await geocoder.geocode({ address });
            if (results.results && results.results[0]) {
                const { lat, lng } = results.results[0].geometry.location;
                const newCoordinates = { lat: lat(), lng: lng() };
                setCoordinates(newCoordinates);
                map.panTo(newCoordinates);
                map.setZoom(15);
            }
        } catch (err) {
            setError('Failed to geocode address');
        }
        setMap(map);
    }, [address]);

    const onUnmount = React.useCallback((map) => {
        setMap(null);
    }, []);

    if (error) {
        return (
            <div className="map-error">
                Error loading map: {error}
                <button onClick={onClose}>Close</button>
            </div>
        );
    }

    return (
        <div className="map-container">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={coordinates}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <Marker position={coordinates} />
                </GoogleMap>
            </LoadScript>
            <button onClick={onClose} className="close-map-button">
                Close Map
            </button>
        </div>
    );
}

export default MapComponent;