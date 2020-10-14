/** @format */

import React, { useState, useContext } from 'react';
import UserDataContext from '../context/userData/UserDataContext';
import SearchBar from '../SearchBar/SearchBar';
import CategorySelector from '../categorySelector/CategorySelector';
import InputLabel from '../InputLabel';
import SubmitButton from '../SubmitButton/SubmitButton.js';
import ThemeDataContext from '../context/themeData/ThemeDataContext.js';

const Resources = (props) => {
	const userDataContext = useContext(UserDataContext);
	const themeDataContext = useContext(ThemeDataContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleIsLoading = () => {
		setIsLoading(!isLoading);
	};

	return (
		<div className={`flex flex-col items-center justify-center mx-5 sm:mx-16 lg:mx-64 max-w-screen-xl field-Selector ${themeDataContext.themeColor}`}>
			<div className='border shadow w-full my-16 px-5 py-5 flex justify-end'>
				<SearchBar handleIsLoading={handleIsLoading} />
			</div>
			<div className='border shadow w-full'>
				<CategorySelector />
			</div>
			<div className='mt-16'>
				<SubmitButton handleIsLoading={handleIsLoading} />
			</div>
		</div>
	);
};


export default Resources;
