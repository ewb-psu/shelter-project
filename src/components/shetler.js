/** @format */

import React, { useContext  } from 'react';
import ShelterCard from './shelterCard';
import LeafletMap from './LeafletMap';
import ApiDataContext from './context/apiData/ApiDataContext';

const Shelters = () => {
	//invoke useContext on ApiDataContext component, initializing apiDataContext variable
	const apiDataContext = useContext(ApiDataContext);
//return a grid, with each resource returned from 211's api mapped into its own card component from apiDataContext. also render leafletMaps component.
	return (
		<div className='grid grid-auto-rows grid-cols-3 mx-16 lg:mx-32'>
			<div className='col-start-1 col-span-3 row-start-3 lg:col-start-1 lg:col-span-1 lg:row-start-1'>
				<ul className='shetlerList'>
					{apiDataContext.resources.map((resource, index) => (
							<li key={resource.Id}>
								<ShelterCard {...resource} index={index} />
							</li>
						))}
				</ul>
			</div>
			<div className='col-start-1 col-span-3 lg:col-start-2 lg:col-span-2 row-start-1 bg-grey-400 lg:ml-10 mt-5'>
				<div className='lg:sticky top-0 lg:ml-10'>
					<LeafletMap />
				</div>
			</div>
		</div>
	);
};

export default Shelters;
