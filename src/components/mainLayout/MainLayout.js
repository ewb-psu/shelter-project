/** @format */

import React, { useContext } from 'react';
import ThemeDataContext from '../context/themeData/ThemeDataContext';

const MainLayout = (props) => {
	const themeDataContext = useContext(ThemeDataContext);
	console.log(themeDataContext);
	return (
		<div className={'app ' + themeDataContext.themeColor}>
			<div id='left-gutter-container'>
				<button
					onClick={(e) =>
						themeDataContext.setThemeColor(
							themeDataContext.themeColor === 'light' ? 'dark' : 'light'
						)
					}>
					Swap Theme
				</button>
				Left Gutter
			</div>

			<div id='main-container'>{props.children}</div>

			<div id='right-gutter-container'>Right Gutter</div>
		</div>
	);
};

export default MainLayout;
