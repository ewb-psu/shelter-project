/** @format */

import React, { useReducer } from 'react';
import ThemeDataContext from './ThemeDataContext';
import ThemeDataReducer from './ThemeDataReducer';

const ThemeDataState = (props) => {
	const initialState = {
		themeColor: 'light',
		showNav: false,
	};

	const [state, dispatch] = useReducer(ThemeDataReducer, initialState);
	console.log(state);

	const setThemeColor = (color) => {
		dispatch({ type: 'SET_THEME_COLOR', payload: color });
	};

	const setShowNav = (value) => {
		dispatch({ type: 'SET_SHOW_NAV', payload: value });
	};

	return (
		<ThemeDataContext.Provider
			value={{
				themeColor: state.themeColor,
				setThemeColor,
				showNav: state.showNav,
				setShowNav,
			}}>
			{props.children}
		</ThemeDataContext.Provider>
	);
};

export default ThemeDataState;
