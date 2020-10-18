/** @format */

import React, { useContext } from 'react';
import './SubmitButton.css';
import { useHistory } from 'react-router-dom';
import APIWrapper from '../../APIWrapper.js';
import ApiDataContext from '../context/apiData/ApiDataContext';
import UserDataContext from '../context/userData/UserDataContext';

function SubmitButton(props) {
	let history = useHistory();
	const APIKey = process.env.REACT_APP_211_API_KEY;
	const API = new APIWrapper(APIKey);
	const apiDataContext = useContext(ApiDataContext);
	const userDataContext = useContext(UserDataContext);

	// API.initialize();
	let obj = {
		sn: userDataContext.serviceName,
		st: '',
		age: Number(userDataContext.age),
		gender: userDataContext.gender,
		zip: Number(userDataContext.zipCode),
		county: userDataContext.county,
		catid: userDataContext.categoryId,
	};

	async function handleClick() {
		try {
			props.handleIsLoading();
			console.log(userDataContext)
			if (userDataContext.validateUserData()) {
				//save submit button state to local storage for use if / when user navigates backwards
				localStorage.setItem('apiDataContext', JSON.stringify(apiDataContext));
				localStorage.setItem(
					'userDataContext',
					JSON.stringify(userDataContext)
				);

				
				//If category selected
				//Make getResource call with category data
				//If subCategory selected
				//Make getResource call with subCategory data
				//If subestCategory selected
				//Make getResource call with service name data

				//TODO finish error handling code for getResource.
				if (userDataContext.categorySelected === 3) {
					obj['st'] = 's';
					apiDataContext.setResources(await API.getResource(obj));
					history.push('/info');
				} else if (userDataContext.categorySelected === 2) {
					obj['st'] = 'sc';
					obj['sn'] = '';
					apiDataContext.setResources(await API.getResource(obj));
					history.push('/info');
				} else {
					obj['st'] = 'c';
					obj['sn'] = '';
					apiDataContext.setResources(await API.getResource(obj));
					history.push('/info');
				}
				console.log('handleClick');
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<button
			type='submit'
			onClick={handleClick}
			className='transition-all p-2 sm:px-5 md:px-8 lg:px-16 border hover:bg-themeTeal rounded rounded-l-none mx-auto'>
			Submit
		</button>
	);
}
export default SubmitButton;
