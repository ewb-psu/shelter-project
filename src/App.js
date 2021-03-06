/** @format */

import React, { useEffect } from 'react';
import './App.scss';
import MainLayout from './components/mainLayout/MainLayout';
import UserData from './components/UserData';
import Shelter from './components/shetler.js';
import ApiDataState from './components/context/apiData/ApiDataState';
import UserDataState from './components/context/userData/UserDataState';
import ThemeDataState from './components/context/themeData/ThemeDataState';
import Resources from './components/Resources/Resources.js';
import ErrorPage from './components/ErrorPage.js'
import {
	HashRouter as Router,
	// Switch,
	Route,
	// Link,
	// Redirect,
} from 'react-router-dom';


const App = () => {
	//search sessionStorage for saved apiDataState and use it to set categories if found.
	useEffect(() => {
	
		//after 30 minutes, remove users sessionId from sessionStorage.
		setTimeout(() => {
			sessionStorage.removeItem('sessionId');
		}, 1800000);

		//a function to remove user data from sessionstorage
		// const cleanUp = () => {
		// 	// sessionStorage.removeItem('sessionId');
		// 	sessionStorage.removeItem('apiDataContext');
		// 	sessionStorage.removeItem('categories');
		// };
		
		// when user hits refresh, navigates away from the page or closes the browser tab, remove state values from sessionstorage.
		// window.addEventListener('beforeunload', cleanUp);
		// return () => {
		// 	window.removeEventListener('beforeUnload', cleanUp);
		// };
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
