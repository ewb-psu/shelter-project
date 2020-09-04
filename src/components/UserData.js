/** @format */

import React, { useState, useEffect, useContext } from 'react';
import ExclusiveOption from './ExclusiveOption';
import TextInput from './TextInput';
// import '../Assets/FieldSelector.scss';
import APIWrapper from '../APIWrapper.js';
import InputLabel from './InputLabel';
import CountySelect from './CountySelect';
import Spinner from '../Assets/spinner.gif';
import ApiDataContext from './context/apiData/ApiDataContext';
import FieldSelectorContext from './context/fieldSelectorContext/FieldSelectorContext';
import ThemeDataContext from './context/themeData/ThemeDataContext';
import { useHistory } from 'react-router-dom';

const APIKey = process.env.REACT_APP_211_API_KEY;
const API = new APIWrapper(APIKey);

const UserData = (props) => {
	const fieldSelectorContext = useContext(FieldSelectorContext);
	const apiDataContext = useContext(ApiDataContext);
	const themeDataContext = useContext(ThemeDataContext);
	let history = useHistory();

	async function callAPI() {
		//check category state to see if it has already been populated from local storage, possibly avoid making another api call (even though it would be with the same session id)
		console.log('trigger callAPI');
		console.log(apiDataContext.categories.length);
		if (apiDataContext !== null)
			if (apiDataContext.categories.length === 0) await API.initialize();
	}

	//TODO move this last piece of state and handler function into context.....which context?
	const [isLoading, setIsLoading] = useState(false);
	const handleIsLoading = () => {
		setIsLoading(!isLoading);
	};

	const findLocation = () => {
		// // console.log(
		// "Then we'd try to find their location using a Google API. For now...";
		// // );
		fieldSelectorContext.setZipcode('97206');
		fieldSelectorContext.setCounty('Clackamas');
	};

	//restores form state upon backwards navigation
	useEffect(() => {
		callAPI();
		if (JSON.parse(localStorage.getItem('fsContext'))) {
			const age = JSON.parse(localStorage.getItem('fsContext')).age;
			const familySize = JSON.parse(localStorage.getItem('fsContext'))
				.familySize;
			const zipcode = JSON.parse(localStorage.getItem('fsContext')).zipCode;
			const county = JSON.parse(localStorage.getItem('fsContext')).county;
			const gender = JSON.parse(localStorage.getItem('fsContext')).gender;
			const categorySelected = JSON.parse(localStorage.getItem('fsContext'))
				.categorySelected;
			const catID = JSON.parse(localStorage.getItem('fsContext')).categoryId;
			const serviceName = JSON.parse(localStorage.getItem('fsContext'))
				.serviceName;
			const buttonState = JSON.parse(localStorage.getItem('fsContext'))
				.buttonState;
			fieldSelectorContext.setAge(age);
			fieldSelectorContext.setFamilySize(familySize);
			fieldSelectorContext.setZipcode(zipcode);
			fieldSelectorContext.setCounty(county);
			fieldSelectorContext.setGender(gender);
			fieldSelectorContext.setCategorySelected(categorySelected);
			fieldSelectorContext.setCategoryId(catID);
			fieldSelectorContext.setServiceName(serviceName);
			fieldSelectorContext.setButtonState(buttonState);
		}
	}, []);

	//monitors the state of fieldSelector.zipCode. When it becomes a valid zip,
	//an api call is made to populate an array with all the possible counties that zipcode could be in.
	useEffect(() => {
		const handleValidZip = async () => {
			console.log('handleValidZip');
			if (
				fieldSelectorContext.setIsZipCodeValid(fieldSelectorContext.zipCode)
					.valid
			) {
				await API.getCountyByZipCode({
					zip: fieldSelectorContext.zipCode,
				})
					.then((data) => {
						fieldSelectorContext.setCounty(data[0]['county']);
						fieldSelectorContext.getAllPossibleCountiesByZip(
							fieldSelectorContext.zipCode
						);
					})
					.catch((err) => {
						// TODO: we'll probably want to take action here to resolve the error
						console.log(err);
					});
			}
		};
		handleValidZip();
	}, [fieldSelectorContext.zipCode]);

	const nextPage = () => {
		console.log(fieldSelectorContext);
		if (fieldSelectorContext.setIsPageDataValid()) {
			history.push('/resources');
		}
	};

	//return a spinner while waiting for data from api to populate category buttons
	if (apiDataContext.categories)
		if (apiDataContext.categories.length === 0 || isLoading) {
			return (
				<img
					src={Spinner}
					className='mx-auto'
					style={{ width: '200px' }}
					alt='a spinner gif, indicating that something is still loading'
				/>
			);
		}

	return (
		<div>
			<div className='text-center mt-16 px-16'>
				<h1>Welcome to the 211 info web application.</h1>
				<p>
					tell us a little about yourself so we can find you the best services.
				</p>
			</div>

			<div
				className={
					'py-16 mx-5 sm:mx-16 sm:mx-16 lg:mx-32 grid grid-cols-4 grid-auto-rows gap-y-5 border shadow field-selector ' +
					themeDataContext.themeColor
				}>
				<div className='mt-5 col-start-1 col-span-4 '>
					<InputLabel label='Gender'>
						<ExclusiveOption
							items={['Male', 'Female', 'Trans Male', 'Trans Female']}
							validator={fieldSelectorContext.isGenderValid}
						/>
					</InputLabel>
				</div>

				<div className='col-start-1 col-span-4 row-start-2 '>
					<InputLabel label='Age'>
						<TextInput
							name='age'
							value={fieldSelectorContext.age}
							validator={fieldSelectorContext.isAgeValid}
							placeholder='32'
						/>
					</InputLabel>
				</div>

				<div className='col-start-1 col-span-4 row-start-3'>
					<div id='zip-and-county' className='flex flex-col'>
						<InputLabel label='ZIP' className=''>
							<TextInput
								name='zip'
								value={fieldSelectorContext.zipCode}
								validator={fieldSelectorContext.isZipCodeValid}
								placeholder='97333'
							/>
						</InputLabel>
					</div>
				</div>

				<div className='col-start-1 col-span-4 row-start-4'>
					{fieldSelectorContext.possibleCounties ? (
						<InputLabel label='County'>
							<CountySelect name='County' />
						</InputLabel>
					) : (
						<InputLabel label='County'>
							<TextInput
								name='county'
								value={fieldSelectorContext.county}
								validator={fieldSelectorContext.isCountyValid}
								placeholder='Multnomah'
							/>
						</InputLabel>
					)}
				</div>

				<div className='col-start-1 lg:col-start-3'>
					{/* <button id='your-location-button' className='p-2 border flex flex-col' onClick={findLocation}>
				Your location
			</button> */}
					<button id='toResources' className='p-2 border ' onClick={nextPage}>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserData;
