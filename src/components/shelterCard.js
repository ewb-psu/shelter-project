/** @format */

import React, {useEffect} from 'react';
//import '../Assets/shelter_info.scss';

const ShelterCard = (props) => {
	// console.log(props.Sites[0].Latitude)

	useEffect(() => {
		props.setCoords({
			lat: props.Sites[0].Latitude,
			lng: props.Sites[0].Longitude
		})
	}, [])

	return (
		<div className='shelterCard border p-5 mt-5'>
			<h1 className='shelterName'> {props.Name} </h1>
			{/* <h4 className='shelterAddress'> {Address} </h4> */}
			<p className='shelterWebsite'>
				{' '}
				<a>{props.Sites[0].URL}</a>{' '}
			</p>
			<h2 className='resources'>Resources</h2>
			{/* <ul className='resourcesList'>
			<ResourceList Resources={Resources} />
		</ul> */}
		</div>
	);
};

//Returns a list of the props
// function ResourceList(props) {
// 	const resources = props.Resources;
// 	//console.log(resources); For debugging purposes only
// 	if (!resources) return [];

// 	return resources.map((resource) => <li>{resource}</li>);
// }

export default ShelterCard;
