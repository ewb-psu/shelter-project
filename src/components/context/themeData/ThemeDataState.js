
import React, { useReducer } from 'react';
import ThemeDataContext from './ThemeDataContext';
import ThemeDataReducer from './ThemeDataReducer';

const ThemeDataState = (props) => {
	const initialState = {
		themeColor: 'light',
	};

	const [state, dispatch] = useReducer(ThemeDataReducer, initialState);
	console.log(state);

	const setThemeColor = (color) => {
		dispatch({ type: 'SET_THEME_COLOR', payload: color });
	};

	return (
		<ThemeDataContext.Provider
			value={{
				themeColor: state.themeColor,
				setThemeColor,
			}}>
			{props.children}
		</ThemeDataContext.Provider>
	);
};

export default ThemeDataState;
