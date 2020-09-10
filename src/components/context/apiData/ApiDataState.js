/** @format */

import React, { useReducer, useEffect } from 'react';
import ApiDataContext from './ApiDataContext';
import ApiDataReducer from './ApiDataReducer';
import APIWrapper from '../../../APIWrapper';

export const ApiDataState = (props) => {
	const api = new APIWrapper(process.env.REACT_APP_211_API_KEY);

	//initial state, passed as a parameter to useReducer
	const initialState = {
		sessionID: null,
		categories: [],
		resources: [],
		arrayOfLocations: [],
		mapCenter: ['45.00', '-122.50'], // defaut map center position to Portland Oregon
		zoomLevel: 10,
	};

	//invoke useReducer passing in our imported reducer function and initial state. returns dispatch method for updating the returned state.
	const [state, dispatch] = useReducer(ApiDataReducer, initialState);

	//each function below dispatches new state to our reducer.
	const setCategories = (categories) => {
		dispatch({ type: 'SET_CATEGORIES', payload: categories });
	};

	const setResources = (resources) => {
		dispatch({ type: 'SET_RESOURCES', payload: resources });
	};

	const setArrayOfLocations = (newCoords) => {
		console.log(newCoords);
		dispatch({ type: 'SET_ARRAY_OF_COORDS', payload: newCoords });
	};

	const setMapCenter = (newCoords) => {
		console.log(newCoords);
		dispatch({ type: 'SET_MAP_CENTER', payload: newCoords });
	};

	const setZoomLevel = (zoomLevel) => {
		dispatch({ type: 'SET_ZOOM_LEVEL', payload: zoomLevel });
	};

	//once, when the component mounts, get categories from api to populate buttons.
	// useEffect(() => {
	// 	const getCategories = async () => {
	// 		console.log('getting categories');
	// 		const categories = await api.getCategories();
	// 		console.log(categories)
	// 		console.log(categories.ok)
	// 		setCategories(categories);
	// 	};
	// 	getCategories();
	// }, []);

	//whenever state.categories changes, run a log statement to see the state change.
	useEffect(() => {
		//TODO check localStorage first.
		console.log(state.categories);
	}, [state.categories]);

	return (
		<ApiDataContext.Provider
			value={{
				sessionID: state.sessionID, // TODO where is the setter for this?
				categories: state.categories,
				resources: state.resources,
				arrayOfLocations: state.arrayOfLocations,
				mapCenter: state.mapCenter,
				zoomLevel: state.zoomLevel,
				setCategories,
				setResources,
				setArrayOfLocations,
				setMapCenter,
				setZoomLevel,
			}}>
			{props.children}
		</ApiDataContext.Provider>
	);
};

export default ApiDataState;
