/** @format */

import React, { useState, useEffect, useContext } from 'react';
import FieldSelectorContext from '../context/fieldSelectorContext/FieldSelectorContext';
import SearchBar from '../SearchBar/SearchBar';
import CategorySelector from '../categorySelector/CategorySelector';
import InputLabel from '../InputLabel';
import SubmitButton from '../SubmitButton/SubmitButton.js';
//import ThemeDataContext from '../context/themeData/ThemeDataContext.js';

const Resources = (props) => {
	const fieldSelectorContext = useContext(FieldSelectorContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleIsLoading = () => {
		setIsLoading(!isLoading);
	};

	return (
		//<div className={'field-selector ' + themeDataContext.themeColor}>
		<div className='flex flex-col items-center justify-center'>
			<div className='w-full flex justify-center'>
				<SearchBar handleIsLoading={handleIsLoading} />
			</div>
			{/* <InputLabel label='Resource'> */}
			<div className=''>
				<CategorySelector />
			</div>
			{/* </InputLabel> */}
			<div className='mt-32'>
				<SubmitButton handleIsLoading={handleIsLoading} />
			</div>
		</div>
	);
};

export default Resources;
