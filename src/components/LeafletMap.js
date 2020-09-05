/** @format */

import React, { useContext, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ApiDataContext from './context/apiData/ApiDataContext';

const LeafletMap = () => {
	//invoke useContext on ApiDataContext component, initializing apiDataContext variable
	const apiDataContext = useContext(ApiDataContext);
	
	//when component mounts, if there are resources in the resource array, map through it and return an array of objects which is then set to apiDataContext
	useEffect(() => {
			if (apiDataContext.resources.length !== 0) {
				const coordsPlusOtherData = apiDataContext.resources.map((resource) => {
					return {
						lat: resource.Sites[0].Latitude,
						lng: resource.Sites[0].Longitude,
						name: resource.Sites[0].Name,
						url: resource.Sites[0].URL && resource.Sites[0].URL
					};
				});
				apiDataContext.setArrayOfLocations(coordsPlusOtherData);
				// loads the first results coords as the initial center position of map
				apiDataContext.setMapCenter([
					coordsPlusOtherData[0].lat,
					coordsPlusOtherData[0].lng,
				]);
			}
	}, []);

	return (
		<Map center={apiDataContext.mapCenter} zoom={apiDataContext.zoomLevel}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
			/>
			{apiDataContext.arrayOfLocations.map((location, index) => {
				return (
					<Marker position={[location.lat, location.lng]} key={index}>
						<Popup>
							{location.name} <br /> {location.url} <br />
						</Popup>
					</Marker>
				);
			})}
		</Map>
	);
};

export default LeafletMap;
