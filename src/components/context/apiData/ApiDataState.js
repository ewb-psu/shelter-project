
import React, { useReducer, useEffect } from 'react';
import ApiDataContext from './ApiDataContext';
import ApiDataReducer from './ApiDataReducer';
import APIWrapper from '../../../APIWrapper';

export const ApiDataState = (props) => {

	const api = new APIWrapper(process.env.REACT_APP_211_API_KEY);
	

	const initialState = {
		sessionID: null,
		categories: [],
		resources: [],
		arrayOfLocations: [],
		mapCenter: ['45.00', '-122.50'], // defaut map center position to Portland Oregon
		zoomLevel: 10
	};

	const [state, dispatch] = useReducer(ApiDataReducer, initialState);

	const setCategories = (categories) => {
	    dispatch({ type: 'SET_CATEGORIES', payload: categories });
    };
    
	const setResources = (resources) => {
		dispatch({ type: 'SET_RESOURCES', payload: resources });
    };

	const setArrayOfLocations = (newCoords) => {
		console.log(newCoords)
		dispatch({type: 'SET_ARRAY_OF_COORDS', payload: newCoords})
	}

	const setMapCenter = (newCoords) => {
		console.log(newCoords)
		dispatch({type: 'SET_MAP_CENTER', payload: newCoords})
	}
	
	const setZoomLevel = (zoomLevel) => {
		dispatch({type: 'SET_ZOOM_LEVEL', payload: zoomLevel})
	}

    useEffect( () => { 
		//TODO check localStorage first.
        const getCategories = async () => {
            const categories = await api.getCategories()
            setCategories(categories)
        }
		getCategories()

    }, [])


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
				setZoomLevel

			}}>
			{props.children}
		</ApiDataContext.Provider>
	);
};

export default ApiDataState;
