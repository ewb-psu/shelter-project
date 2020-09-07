/** @format */

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import APIWrapper from '../../APIWrapper';
import SubmitButton from '../SubmitButton/SubmitButton';

import ApiDataContext from '../context//apiData/ApiDataContext';
import UserDataContext from '../context/userData/UserDataContext';

const SearchBar = ({ handleIsLoading }) => {
	const apiDataContext = useContext(ApiDataContext);
	const userDataContext = useContext(UserDataContext);
	const [search, setSearch] = useState('');
	const [filtered, setFiltered] = useState([]);
	const history = useHistory();

	let obj = {
		sn: userDataContext.serviceName,
		st: '',
		age: Number(userDataContext.age),
		gender: userDataContext.gender,
		zip: Number(userDataContext.zipCode),
		county: userDataContext.county,
		catid: userDataContext.categoryId,
	};

	const APIKey = process.env.REACT_APP_211_API_KEY;
	const API = new APIWrapper(APIKey);

	//here we unpack the return object from API.getCategories() into the searchTermsArray.
	const searchTermsArr = [];
	if (apiDataContext.categories) {
		apiDataContext.categories.forEach((entry) => {
			searchTermsArr.push(entry.category);
			entry.subcat.forEach((subentry) => {
				searchTermsArr.push(subentry.subcategory);
				subentry.subcatterm.forEach((term) => {
					searchTermsArr.push(term.sterm);
				});
			});
		});
	}

	//here we filter through the searchTerms on keypress.
	const handleChange = (e) => {
		console.log(e.target.value);
		setSearch(e.target.value);
		const filteredArr = searchTermsArr.filter((term) => {
			const regex = new RegExp(e.target.value, 'gi');
			return term.match(regex);
		});
		setFiltered(filteredArr);
	};

	//most of this code is lifted from handleClick() in submitButton.js
	const handleClickSearchResult = async (item) => {
		//activate spinner
		handleIsLoading();
		//set service name in userData state
		userDataContext.setServiceName(item);
		// county validation
		await userDataContext.goBehavior();
		//if form inputs have valid entries 
		if (userDataContext.validateUserData()) {
			//save field selector state to local storage for use if / when user navigates backwards
			// localStorage.setItem(
			// 	'userDataState',
			// 	JSON.stringify(userDataContext)
			// );
			localStorage.setItem('userDataContext', JSON.stringify(userDataContext));
			obj.sn = item;
			//apiDataContext.setResources(await API.getKeywords(obj))
			history.push('/info');
			//If category selected
			//Make getResource call with category data
			//If subCategory selected
			////Make getResource call with subCategory data
			//If subestCategory selected
			////Make getResource call with service name data
			if (userDataContext.categorySelected === 3) {
				obj['st'] = 's';
				console.log(userDataContext.categorySelected);
				console.log(obj);
				apiDataContext.setResources(await API.getResource(obj));
			} else if (userDataContext.categorySelected === 2) {
				obj['st'] = 'sc';
				obj['sn'] = '';
				console.log(obj);
				console.log(userDataContext.categorySelected);
				apiDataContext.setResources(await API.getResource(obj));
			} else {
				obj['st'] = 'c';
				obj['sn'] = '';
				console.log(obj);
				console.log(userDataContext.categorySelected);
				apiDataContext.setResources(await API.getResource(obj));
			}
		}
		// the getResource call below works because the options are all hardcoded. Above, it doesn't work becasue obj (parameters for the http request) is missing many required properties.
		//this will be fixed when the refactor is complete and ispagedatavalid() passes, as well and obj being fully populated with necessary data
		apiDataContext.setResources(
			await API.getResource({
				APIKey: 'J7R0W5XK',
				catid: '2603',
				sn: '',
				st: 'c',
				zip: 97086,
			})
		);
		history.push('/info');
		handleIsLoading();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('here are some filtered results in state', filtered);
		console.log(obj);
	};

	return (
		<div className='w-full'>
			<div className=''>
				<form onSubmit={handleSubmit} className=' flex items-center justify-center  ml-auto'>
					<label htmlFor='search' className='w-full'>
						<input
							type='text'
							name='search'
							value={search}
							onChange={handleChange}
							style={{backgroundColor: '#E1F6EC'}}
							className='color-black leading-10 w-full boder rounded rounded-r-none color-black'
							placeHolder='Search...'
						/>
					</label>
					<SubmitButton handleIsLoading={handleIsLoading}>Submit</SubmitButton>
				</form>
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyItems: 'flex-start',
					backgroundColor: '#e0e0e0',
				}}>
				{filtered.map((item) => (
					<div
						onClick={() => {
							handleClickSearchResult(item);
						}}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
