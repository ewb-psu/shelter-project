/** @format */

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIWrapper from '../../APIWrapper';

import ApiDataContext from '../context//apiData/ApiDataContext';
import UserDataContext from '../context/userData/UserDataContext';

const SearchBar = ({ handleIsLoading }) => {
	const apiDataContext = useContext(ApiDataContext);
	const userDataContext = useContext(UserDataContext);
	const [search, setSearch] = useState('');
	const [filtered, setFiltered] = useState([]);
	const history = useHistory();

	//parameters for api call to get resources. based on category chosen from search menu dropdown.
	let obj = {
		sn: '',
		st: '',
		age: Number(userDataContext.age),
		gender: userDataContext.gender,
		zip: Number(userDataContext.zipCode),
		county: userDataContext.county,
		catid: '',
	};

	const APIKey = process.env.REACT_APP_211_API_KEY;
	const API = new APIWrapper(APIKey);

	//here we unpack the return object from API.getCategories() into the searchTermsArr which we will filter through later.
	const searchTermsArr = [];
	if (apiDataContext.categories) {
		apiDataContext.categories.forEach((entry) => {
			searchTermsArr.push({
				name: entry.category,
				categoryID: entry.categoryID,
				categorySelected: 1,
			});
			entry.subcat.forEach((subentry) => {
				searchTermsArr.push({
					name: subentry.subcategory,
					categoryID: subentry.subcategoryID,
					categorySelected: 2,
				});
				subentry.subcatterm.forEach((term) => {
					searchTermsArr.push({
						name: term.sterm,
						categorySelected: 3,
					});
				});
			});
		});
	}

	//here we filter through the searchTerms on keypress.
	const handleChange = (e) => {
		setSearch(e.target.value);
		const filteredArr = searchTermsArr.filter((term) => {
			const regex = new RegExp(e.target.value, 'gi');
			return term.name.match(regex);
		});
		setFiltered(filteredArr);
	};

	//much of this code is lifted from handleClick() in submitButton.js
	//adapted slightly to fit our use case.
	const handleClickSearchResult = async (item) => {
		//activate spinner
		handleIsLoading();

		// county validation
		await userDataContext.goBehavior();

		//if form inputs have valid entries
		if (userDataContext.validateUserData()) {
			localStorage.setItem('userDataContext', JSON.stringify(userDataContext));
			//If category selected(1)
			//Make getResource call with categoryID.
			//If subCategory selected(2)
			////Make getResource call with subCategoryID.
			//If subestCategory selected(3)
			////Make getResource call with service name.
			if (item.categorySelected === 3) {
				obj['st'] = 's';
				obj.sn = item.name;
				apiDataContext.setResources(await API.getResource(obj));
				history.push('/info');
			} else if (item.categorySelected === 2) {
				obj['st'] = 'sc';
				obj['sn'] = '';
				obj.catid = item.categoryID;
				apiDataContext.setResources(await API.getResource(obj));
				history.push('/info');
			} else {
				obj['st'] = 'c';
				obj['sn'] = '';
				obj.catid = item.categoryID;
				apiDataContext.setResources(await API.getResource(obj));
				history.push('/info');
			}
		}
	};

	//call handleClickSearchResult on the first element in the filtered array when someone hits submit.
	const handleSubmit = (e) => {
		e.preventDefault();
		handleClickSearchResult(filtered[0]);
	};


	//add an event listener (containing annonymous function to clear search results element)
	// on mount and remove it when component unmounts.
	useEffect(() => {
		window.addEventListener('click', (e) => {
			setFiltered([])
		})
		return () => {
			window.removeEventListener('click', (e) => {
				setFiltered([])
			})
		};
	}, [])


	return (
		<div className='w-full'>
			<div className=''>
				<form
					onSubmit={handleSubmit}
					className=' flex items-center justify-center  ml-auto'>
					<label htmlFor='search' className='w-full'>
						<input
							type='text'
							name='search'
							value={search}
							onChange={handleChange}
							style={{ backgroundColor: 'rgba(1, 169, 198,0.4)' }}
							className='color-black leading-10 w-full boder rounded rounded-r-none color-black'
							placeHolder='Search...'
						/>
					</label>
					<button
						className='border p-2 hover:bg-themeTeal'
						onClick={handleSubmit}>
						Submit
					</button>
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
						className='cursor-pointer hover:bg-themeTeal w-full'
						onClick={() => {
							handleClickSearchResult(item);
						}}>
						{item.name}
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
