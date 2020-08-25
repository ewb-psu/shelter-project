import React, { useState, useEffect, useContext } from 'react';
import FieldSelectorContext from '../context/fieldSelectorContext/FieldSelectorContext';
import SearchBar from '../SearchBar/SearchBar';
import CategorySelector from '../CategorySelector/CategorySelector';
import InputLabel from '../InputLabel';
import SubmitButton from '../SubmitButton/SubmitButton.js';
//import ThemeDataContext from '../context/themeData/ThemeDataContext.js';

const Resources = (props) => {
  const fieldSelectorContext = useContext(FieldSelectorContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleIsLoading = () => {
		setIsLoading(!isLoading);
	};

  return(
    //<div className={'field-selector ' + themeDataContext.themeColor}>
    <div>
    <SearchBar handleIsLoading={handleIsLoading} />
    <InputLabel label='Resource'>
      <CategorySelector/>
    </InputLabel>
    <SubmitButton handleIsLoading={handleIsLoading} />
    </div>
  )
}

export default Resources
