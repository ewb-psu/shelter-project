/** @format */

import React, { useContext, useEffect, useState } from 'react';
import ShelterCard from './shelterCard';
import LeafletMap from './LeafletMap';
import PropTypes from 'prop-types';
import ApiDataContext from './context/apiData/ApiDataContext';

const Shelters = ({ shelters }) => {
	const apiDataContext = useContext(ApiDataContext);
	
	const [coords, setCoords] = useState({lat: '', lng: ''});
	
	useEffect(() => {
		apiDataContext.resources.length !== 0 &&
		console.log(apiDataContext.resources)
		
		const lat = apiDataContext.resources[0] //TODO why can't i access information deeper in this datastructure??
		// console.log(lat.Sites) //TODO why doesn't this work? 
		// setCoords({lat: apiDataContext.resources[0].Sites[0].Latitude, lng: apiDataContext.resources[0].Sites[0].Longitude}) 
	}, [])

	return (
		<div className='grid grid-auto-rows grid-cols-3 mx-16 lg:mx-32'>
			<div className='col-start-1 col-span-3 row-start-2 lg:col-start-1 lg:col-span-1 sm:row-start-1'>
				<ul className='shetlerList'>
					{apiDataContext.resources &&
						apiDataContext.resources.map((resource) => (
							<li key={resource.Id}>
								<ShelterCard {...resource} setCoords={setCoords}/>
							</li>
						))}
				</ul>
			</div>
			<div className='col-start-1 col-span-3 lg:col-start-2 lg:col-span-2 row-start-1 bg-grey-400 lg:ml-10 mt-5'>

				<div className='lg:sticky top-0'>
					<LeafletMap coords={coords} />
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
