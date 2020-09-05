/** @format */

import React, { useContext } from 'react';
import ApiDataContext from './context/apiData/ApiDataContext';
//import '../Assets/shelter_info.scss';

const ShelterCard = (props) => {
	//invoke useContext on ApiDataContext component, initializing apiDataContext variable
	const apiDataContext = useContext(ApiDataContext);
	// console.log(props);
	//a function for updating the maps center position, triggered when the card is clicked.
	const handleClick = () => {
		apiDataContext.setMapCenter([
			props.Sites[0].Latitude,
			props.Sites[0].Longitude,
		]);
	};
	//return a card component with data provided via props 
	return (
		<div className='shelterCard transition-all border shadow hover:shadow-lg cursor-pointer p-5 mt-5' onClick={handleClick}>
			<h1 className='shelterName'> {props.Name} </h1>
			<p className='shelterWebsite'>
				<a href={`http://${props.Sites[0].URL}`}>{props.Sites[0].URL}</a>{' '}
			</p>
		</div>
	);
};

export default ShelterCard;
