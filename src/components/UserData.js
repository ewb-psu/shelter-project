
import React, { useState, useEffect, useContext } from 'react';
import ExclusiveOption from './ExclusiveOption';
import TextInput from './TextInput';
import '../Assets/FieldSelector.scss';
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
		console.log(fieldSelectorContext)
		if(fieldSelectorContext.setDoValidation('true')){
			history.push('/resources')
		}
	}

	//return a spinner while waiting for data from api to populate category buttons
	if (apiDataContext.categories.length === 0 || isLoading) {
		return <img src={Spinner} style={{ width: '200px' }} alt='a spinner gif, indicating that something is still loading'/>;
	}

	return (
		<div className={'field-selector ' + themeDataContext.themeColor}>
			<InputLabel label='Gender'>
				<ExclusiveOption
					items={['Male', 'Female', 'Trans Male', 'Trans Female']}
					validator={fieldSelectorContext.setIsGenderValid}
				/>
			</InputLabel>
			<InputLabel label='Age'>
				<TextInput
					name='age'
					value={fieldSelectorContext.age}
					validator={fieldSelectorContext.setIsAgeValid}
					placeholder='32'
				/>
			</InputLabel>
			<div id='zip-and-county'>
				<InputLabel label='ZIP'>
					<TextInput
						name='zip'
						value={fieldSelectorContext.zipCode}
						validator={fieldSelectorContext.setIsZipCodeValid}
						placeholder='97333'
					/>
				</InputLabel>
				{fieldSelectorContext.possibleCounties ? (
					<InputLabel label='County'>
						<CountySelect name='County' />
					</InputLabel>
				) : (
					<InputLabel label='County'>
						<TextInput
							name='county'
							value={fieldSelectorContext.county}
							validator={fieldSelectorContext.setIsCountyValid}
							placeholder='Multnomah'
						/>
					</InputLabel>
				)}
				<InputLabel label='Family Size'>
					<TextInput
						name='familySize'
						value={fieldSelectorContext.familySize}
						validator={fieldSelectorContext.setIsFamilySizeValid}
						placeholder='How many people are in your family?'
					/>
				</InputLabel>
			</div>

			<button id='your-location-button' onClick={findLocation}>
				Your location
			</button>

			<button id='toResources' onClick={nextPage}>
				resources
			</button>
		</div>
	);
};

export default UserData;
