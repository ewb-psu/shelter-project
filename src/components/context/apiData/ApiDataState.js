
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
	};

	const [state, dispatch] = useReducer(ApiDataReducer, initialState);

	const setCategories = (categories) => {
	    dispatch({ type: 'SET_CATEGORIES', payload: categories });
    };
    
	const setResources = (resources) => {
		dispatch({ type: 'SET_RESOURCES', payload: resources });
    };


    useEffect( () => { 
		
        const getCategories = async () => {
            const categories = await api.getCategories()
            setCategories(categories)
        }
        getCategories()
    }, [])


	return (
		<ApiDataContext.Provider
			value={{
				sessionID: state.sessionID,
				categories: state.categories,
				resources: state.resources,
				setCategories,
				setResources,
			}}>
			{props.children}
		</ApiDataContext.Provider>
	);
};

export default ApiDataState;
