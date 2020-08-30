/** @format */

import React, { useState, useEffect, useContext } from 'react';
// import './App.scss';
import APIWrapper from './APIWrapper.js';
import MainLayout from './components/mainLayout/MainLayout';
import UserData from './components/UserData';
import Shelter from './components/shetler.js';
import ApiDataState from './components/context/apiData/ApiDataState';
import FieldSelectorState from './components/context/fieldSelectorContext/FieldSelectorState';
import ThemeDataState from './components/context/themeData/ThemeDataState';
import ApiDataContext from './components/context/apiData/ApiDataContext';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import Resources from './components/Resources/Resources.js';


// can we get rid of this?
const navbar = {};
navbar.brand = { linkTo: '#', text: 'Portland Shelters' };
navbar.links = [
	{ linkTo: '#', text: 'Contact Us' },
	{ linkTo: '#', text: 'How many links do we need?' },
	{
		dropdown: false,
		text: 'Do we want a Dropdown?',
		links: [
			{ linkTo: '#', text: 'Dropdown Link 1' },
			{ linkTo: '#', text: 'Dropdown Link 2' },
		],
	},
];

const APIKey = process.env.REACT_APP_211_API_KEY;
const API = new APIWrapper(APIKey);

const App = () => {
	//search localStorage for saved apiDataState and use it to set categories if found.
	const apiDataContext = useContext(ApiDataContext);
	useEffect(() => {
		if (JSON.parse(localStorage.getItem('apiDataState'))) {
			console.log('trigger local storage');
			apiDataContext.setCategories(
				JSON.parse(localStorage.getItem('appState'))
			);
		}

		//a function to remove user data from localstorage
		const cleanUp = () => {
			// localStorage.removeItem('sessionId');
			localStorage.removeItem('fsContext')
			localStorage.removeItem('apiDataContext')
			localStorage.removeItem('categories') 

		}

		//after 30 minutes, remove users sessionId from localStorage.
		setTimeout(() => {
			localStorage.removeItem('sessionId');
		}, 1800000);

		//when user hits refresh, navigates away from the page or closes the browser tab, remove state values from localstorage.
		// window.addEventListener(
		// 	'beforeunload',
		// 	cleanUp
		// );
		// return () => {
		// 	window.removeEventListener('beforeUnload', cleanUp )
		// }
	}, []);

	return (
		<FieldSelectorState>
			<ApiDataState>
				<ThemeDataState>
						<Router>
					<MainLayout>
							<Route exact path='/'>
								<UserData />
							</Route>
							<Route path='/resources'>
								<Resources />
							</Route>
							<Route path='/info'>
								<Shelter />
							</Route>
					</MainLayout>
						</Router>
				</ThemeDataState>
			</ApiDataState>
		</FieldSelectorState>
	);
};

export default App;
