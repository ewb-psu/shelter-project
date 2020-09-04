/** @format */

import React, { useEffect } from 'react';
//import '../Assets/shelter_info.scss';

const ShelterCard = (props) => {
	return (
		<div className='shelterCard border p-5 mt-5'>
			<h1 className='shelterName'> {props.Name} </h1>
			<p className='shelterWebsite'>
				{' '}
				<a href={`http://${props.Sites[0].URL}`}>{props.Sites[0].URL}</a>{' '}
			</p>
			<h2 className='resources'>Resources</h2>
		</div>
	);
};

export default ShelterCard;
