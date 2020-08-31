/** @format */

import React, { useContext, useEffect } from 'react';
import ShelterCard from './shelterCard';
import LeafletMap from './LeafletMap';
import PropTypes from 'prop-types';
import ApiDataContext from './context/apiData/ApiDataContext';

const Shelters = ({ shelters }) => {
	const apiDataContext = useContext(ApiDataContext);


	useEffect(() => {
		apiDataContext.resources &&
			console.log(apiDataContext.resources)
	}, [])

	return (
		<div className='grid grid-auto-rows grid-cols-3 ml-32'>
			<div className='grid-start-1 grid-span-1'>
				<h1> Relevant Shelters </h1>
				<ul className='shetlerList'>
					{apiDataContext.resources &&
						apiDataContext.resources.map((resource) => (
							<li key={resource.Id}>
								<ShelterCard {...resource} />
							</li>
						))}
				</ul>
			</div>
			<div className='col-start-2 col-span-2 bg-grey-400 mr-32 sticky'>
				<div className=''>
					<LeafletMap coords={{ lat: '45.5051', lng: '122.6750' }} />
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
