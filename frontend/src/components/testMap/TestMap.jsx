import React, { useState } from "react";
import "./style.scss";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "./data/mapStyles";

import ParksData from "./data/skateboard-parks.json";

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  rotateControl: true,
  fullscreenControl: true,
};

function Map() {
  const [MapSelected, setMapSelected] = useState(null);
  console.log(MapSelected);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
      defaultOptions={options}
    >
      {ParksData?.featured?.map((park) =>
        park?.properties?.FACILITY_T === "flat" ? (
          <Marker
            key={park.properties.PARK_ID}
            position={{
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0],
            }}
            onClick={() => {
              setMapSelected(park);
            }}
            icon={{
              url: "/markers/loc3.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ) : (
          <Marker
            key={park.properties.PARK_ID}
            position={{
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0],
            }}
            onClick={() => {
              setMapSelected(park);
            }}
            icon={{
              url: "/markers/loc2.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )
      )}

      {MapSelected ? (
        <InfoWindow
          position={{
            lat: MapSelected.geometry.coordinates[1],
            lng: MapSelected.geometry.coordinates[0],
          }}
          onCloseClick={() => {
            setMapSelected(null);
          }}
        >
          <div>
            <h2>Organization Name</h2>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function TestMap() {
  return (
    <div className="MapStyleContainer">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
