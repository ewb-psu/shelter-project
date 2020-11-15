/** @format */

import React, { useState, useContext } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CategorySelector from '../categorySelector/CategorySelector';
import SubmitButton from '../SubmitButton/SubmitButton.js';
import ThemeDataContext from '../context/themeData/ThemeDataContext.js';

const Resources = (props) => {
	const themeDataContext = useContext(ThemeDataContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleIsLoading = () => {
		setIsLoading(!isLoading);
	};

	return (
		<div className={`flex flex-col items-center justify-center mx-5 sm:mx-16 lg:mx-32 field-Selector ${themeDataContext.themeColor}`}>
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
