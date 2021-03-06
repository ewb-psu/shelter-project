/** @format */

import React, { useContext, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import ApiDataContext from "./context/apiData/ApiDataContext";

const LeafletMap = () => {
  const apiDataContext = useContext(ApiDataContext);

  return (
    <Map center={apiDataContext.mapCenter || ["45.5135", "-122.6801"]} zoom={apiDataContext.zoomLevel || 10}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {apiDataContext.resources.map((resource, index) => {
        if (!resource.Sites) return null;
        if (
          resource["Sites"][0]["Latitude"] != "" ||
          resource["Sites"][0]["Longitude"] != ""
        ) {
          return (
            <Marker
              position={[
                Number(resource["Sites"][0]["Latitude"]),
                Number(resource["Sites"][0]["Longitude"]),
              ]}
              key={index}
            >
              <Popup>
                {resource["Name"]} <br />{" "}
                {resource["Sites"][0]["ServiceGroup"][0]["URL"]} <br />
              </Popup>
            </Marker>
          );
        }
      })}
    </Map>
  );
};

export default LeafletMap;
