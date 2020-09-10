/** @format */

import React from 'react';

const ErrorPage = (props) => {
	console.log(props);
	return (
		<div className='w-full text-center mt-32'>
			<p>{props.location.state.error.status}</p>
			<p>{props.location.state.error.message}</p>
		</div>
	);
};

export default ErrorPage;
