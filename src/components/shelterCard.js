/** @format */

import React, { useContext } from 'react';
import ApiDataContext from './context/apiData/ApiDataContext';
//import '../Assets/shelter_info.scss';

const ShelterCard = (props) => {
	//initialize apiDataContext
	const apiDataContext = useContext(ApiDataContext);

	//a function for updating the maps center position, triggered when the card is clicked.
	const handleClick = () => {
		apiDataContext.setMapCenter([
			props.Sites[0].Latitude,
			props.Sites[0].Longitude,
		]);
		apiDataContext.setZoomLevel(16)
	};

	//return a card component with data provided via props 
	return (
		<div className='shelterCard transition-all border shadow hover:shadow-lg cursor-pointer p-5 mt-5' onClick={handleClick}>
			<h1 className='shelterName'> {props.Name} </h1>
			<p className='shelterWebsite'>
				<a href={`http://${props.Sites[0].URL}`}>{'Website'}</a>{' '}
			</p>
		</div>
	);
};

export default ShelterCard;
