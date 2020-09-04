/** @format */

// @flow

import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ApiDataContext from './context/apiData/ApiDataContext';

const LeafletMap = () => {

	const apiDataContext = useContext(ApiDataContext);

	useEffect(() => {
		if (apiDataContext.resources.length !== 0) {
			const coordsPlusOtherData = apiDataContext.resources.map((resource) => {
				return {
					lat: resource.Sites[0].Latitude,
					lng: resource.Sites[0].Longitude,
					name: resource.Sites[0].Name,
					url: resource.Sites[0].URL && resource.Sites[0].URL,
				};
			});
			apiDataContext.setArrayOfCoords(coordsPlusOtherData);
		}
	}, []);

	useEffect(() => {
		console.log(apiDataContext);
		if (apiDataContext.arrayOfCoords.length !== 0)
			console.log('trigger', apiDataContext.arrayOfCoords);
	}, []);

	return (
		<Map
			center={
				apiDataContext.arrayOfCoords.length !== 0
					? [
							apiDataContext.arrayOfCoords[0].lat,
							apiDataContext.arrayOfCoords[0].lng,
					  ]
					: ['45.00', '-122.50']
			}
			zoom={10}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
			/>
			{apiDataContext.arrayOfCoords.map((coords, index) => {
				return (
					<Marker position={[coords.lat, coords.lng]}>
						<Popup>
							{coords.name} <br /> {coords.url} <br /> {index}
						</Popup>
					</Marker>
				);
			})}
		</Map>
	);
};

export default LeafletMap;
