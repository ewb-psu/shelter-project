/** @format */

import React, { useEffect, useContext } from 'react';
import './App.scss';
import MainLayout from './components/mainLayout/MainLayout';
import UserData from './components/UserData';
import Shelter from './components/shetler.js';
import ApiDataState from './components/context/apiData/ApiDataState';
import UserDataState from './components/context/userData/UserDataState';
import ThemeDataState from './components/context/themeData/ThemeDataState';
import ApiDataContext from './components/context/apiData/ApiDataContext';
import Resources from './components/Resources/Resources.js';
import ErrorPage from './components/ErrorPage.js'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';


const App = () => {
	const apiDataContext = useContext(ApiDataContext);
	//search localStorage for saved apiDataState and use it to set categories if found.
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
			localStorage.removeItem('apiDataContext');
			localStorage.removeItem('categories');
		};
		//after 30 minutes, remove users sessionId from localStorage.
		setTimeout(() => {
			localStorage.removeItem('sessionId');
		}, 1800000);
		// when user hits refresh, navigates away from the page or closes the browser tab, remove state values from localstorage.
		window.addEventListener('beforeunload', cleanUp);
		return () => {
			window.removeEventListener('beforeUnload', cleanUp);
		};
	}, []);

	return (
		<UserDataState>
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
							<Route path='/error' component={ErrorPage} />
						</MainLayout>
					</Router>
				</ThemeDataState>
			</ApiDataState>
		</UserDataState>
	);
};

export default App;
