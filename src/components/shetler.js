/** @format */

import React, { useContext, useEffect, useState } from 'react';
import ShelterCard from './shelterCard';
import LeafletMap from './LeafletMap';
import PropTypes from 'prop-types';
import ApiDataContext from './context/apiData/ApiDataContext';

const Shelters = () => {
	const apiDataContext = useContext(ApiDataContext);

	// useEffect(() => {
	// 	if(apiDataContext.resources.length !== 0) {
	// 		apiDataContext.resources.forEach((resource) => {
	// 			apiDataContext.setArrayOfCoords({
	// 				lat: resource.Sites[0].Latitude,
	// 				lng: resource.Sites[0].Longitude,
	// 				name: resource.Sites[0].Name,
	// 				url: resource.Sites[0].URL && resource.Sites[0].URL
	// 			})
	// 		})
	// 	}

	// useEffect(() => {
	// 	if (apiDataContext.resources.length !== 0) {
	// 		const coordsPlusOtherData = apiDataContext.resources.map((resource) => {
	// 			return {
	// 				lat: resource.Sites[0].Latitude,
	// 				lng: resource.Sites[0].Longitude,
	// 				name: resource.Sites[0].Name,
	// 				url: resource.Sites[0].URL && resource.Sites[0].URL,
	// 			};
	// 		})
	// 		apiDataContext.setArrayOfCoords(
	// 			coordsPlusOtherData
	// 		);
	// 	}
	// }, []);

	return (
		<div className='grid grid-auto-rows grid-cols-3 mx-16 lg:mx-32'>
			<div className='col-start-1 col-span-3 row-start-2 lg:col-start-1 lg:col-span-1 sm:row-start-1'>
				<ul className='shetlerList'>
					{apiDataContext.resources &&
						apiDataContext.resources.map((resource, index) => (
							<li key={resource.Id}>
								<ShelterCard {...resource} index={index}/>
							</li>
						))}
				</ul>
			</div>
			<div className='col-start-1 col-span-3 lg:col-start-2 lg:col-span-2 row-start-1 bg-grey-400 lg:ml-10 mt-5'>
				<div className='lg:sticky top-0'>
					<LeafletMap />
				</div>
			</div>
		</div>
	);
};

export default Shelters;

Shelters.propTypes = {
	shelters: PropTypes.arrayOf(
		PropTypes.shape({
			Id: PropTypes.number,
			Name: PropTypes.string,
			Address: PropTypes.string,
			Website: PropTypes.string,
			Resources: PropTypes.arrayOf(PropTypes.string),
			Contact: PropTypes.string,
		})
	),
};

Shelters.defaultProps = {
	shelters: [],
};
