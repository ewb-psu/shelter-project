/** @format */

import React, { useContext } from 'react';
import ApiDataContext from './context/apiData/ApiDataContext';
import AddressCard from './AddressCard';
import PhoneCard from './PhoneCard'
//import '../Assets/shelter_info.scss';

const ShelterCard = (props) => {
	//initialize apiDataContext
	const apiDataContext = useContext(ApiDataContext);
	//a function for updating the maps center position, triggered when the card is clicked.
	const handleClick = () => {
		if(props.Sites[0].Latitude != '' || props.Sites[0].Longitude != ''){
			apiDataContext.setMapCenter([
				props.Sites[0].Latitude,
				props.Sites[0].Longitude,
			]);
			apiDataContext.setZoomLevel(16)
		}
	};


	//return a card component with data provided via props
	if (!props.Sites) {
		return (
			<div
				className='shelterCard transition-all border shadow hover:shadow-lg p-5 mt-5'
				>
				<h1 className='shelterName'> This resource no longer exists. </h1>
			</div>
		);
	}
	return (
		<div className='shelterCard transition-all border shadow hover:shadow-lg cursor-pointer p-5 mt-5' onClick={handleClick}>
			<h1 className='shelterName'> {props.Name} </h1>
			{props['Sites'][0]['Address'].length !== 0 ? <AddressCard {...props.['Sites'][0]['Address']}/> : null}
			{props['Sites'][0]['Phones'].length !== 0 ? <PhoneCard {...props.['Sites'][0]['Phones']}/> : null}

			<p className='shelterWebsite'>
				<a href={`http://${props.Sites[0].URL}`}>{props.Sites[0].URL}</a>{' '}
			</p>
		</div>
	);
};

export default ShelterCard;
