
import React, { useReducer, useEffect } from 'react';
import UserDataContext from './UserDataContext';
import UserDataReducer from './UserDataReducer';
import APIWrapper from '../../../APIWrapper';

export const UserDataState = (props) => {
	const api = new APIWrapper(process.env.REACT_APP_211_API_KEY);
	const CensusAPIKey = process.env.REACT_APP_CENSUS_API_KEY;

	const initialState = {
		serviceName: '',
		buttonState: {
			category: '',
			subCat: [{ subCategory: '', subCatTerm: [{ sterm: '' }] }],
		},
		categoryId: '',
		categorySelected: '',
		county: '',
		zipCode: '',
		familySize: '',
		age: '',
		gender: '',
		possibleCounties: '',
		doValidation: '',
		validCounty: 'null', //bool
		isCountyValid: '', // obj
		isAgeValid: '',
		isZipCodeValid: 'null',
		isFamilySizeValid: '',
		isGenderValid: '',
	};

	const [state, dispatch] = useReducer(UserDataReducer, initialState);

	const setServiceName = (serviceName) => {
		dispatch({ type: 'SET_SERVICE_NAME', payload: serviceName });
	};
	const setButtonState = (newState) => {
		dispatch({ type: 'SET_BUTTON_STATE', payload: newState });
	};
	const setCategoryId = (newId) => {
		dispatch({ type: 'SET_CATEGORY_ID', payload: newId });
	};
	const setCategorySelected = (newCat) => {
		dispatch({ type: 'SET_CATEGORY_SELECTED', payload: newCat });
	};
	const setGender = (newGender) => {
		dispatch({ type: 'SET_GENDER', payload: newGender });
	};
	const setCounty = (newCounty) => {
		dispatch({ type: 'SET_COUNTY', payload: newCounty });
	};
	const setZipcode = (newZip) => {
		dispatch({ type: 'SET_ZIPCODE', payload: newZip });
	};
	const setFamilySize = (newFamSize) => {
		dispatch({ type: 'SET_FAMILY_SIZE', payload: newFamSize });
	};
	const setAge = (newAge) => {
		dispatch({ type: 'SET_AGE', payload: newAge });
	};
	const setPossibleCounties = (counties) => {
		dispatch({ type: 'SET_POSSIBLE_COUNTIES', payload: counties });
	};
	const setDoValidation = (input) => {
		dispatch({ type: 'SET_DO_VALIDATION', payload: input });
	};
	const setValidCounty = (input) => {
		dispatch({ type: 'SET_VALID_COUNTY', payload: input });
	};

	const setIsUserDataValid = (input) => {
		dispatch({type: 'SET_IS_GENDER_VALID', payload: {valid: ''}})
		dispatch({type: 'SET_IS_AGE_VALID', payload: {valid: ''}})
		dispatch({type: 'SET_IS_ZIP_CODE_VALID', payload: {valid: ''}})
		dispatch({type: 'SET_IS_COUNTY_VALID', payload: {valid: ''}})
	};

	const setIsCountyValid = (county) => {
		let valid = null;
		let message = '';
		if (!county) {
			dispatch({
				type: 'SET_IS_COUNTY_VALID',
				payload: { valid: false, message: 'Required entry.' },
			});
			return { valid: false, message: 'Required entry.' };
		} else if (state.validCounty) {
			dispatch({ type: 'SET_IS_COUNTY_VALID', payload: { valid: true, message } });
			return { valid: true, message };
		} else if (!state.validCounty) {
			dispatch({
				type: 'SET_IS_COUNTY_VALID',
				payload: { valid: false, message: 'This is not an OR or WA county.' },
			});
			return { valid: false, message: 'This is not an OR or WA county.' };
		}
	};

	const setIsFamilySizeValid = (familySize) => {
		let message = '';
		message = (familySize === ''? 'Invalid Entry' : '')

		let valid = familySize >= 0 && familySize <= 16;
		if (!valid) message = 'You don have that many chilren!';
		dispatch({ type: 'SET_IS_FAMILY_SIZE_VALID', payload: { valid: true, message } });
		return { valid, message };
	};

	const setIsGenderValid = (gender) => {
		let message = '';

		let empty = gender === '';
		if (empty) message = 'Required entry.';

		let valid = !empty;
		dispatch({ type: 'SET_IS_GENDER_VALID', payload: { valid: valid, message } });

		return { valid, message };
	};

	const setIsAgeValid = (age) => {
		let message = '';

		// Using a regex here to recognize positive non-leading zero integers
		let isPositiveInteger = /^[1-9]([0-9]*)$/.test(age);
		if (!isPositiveInteger)
			message = 'Invalid Entry';

		// TODO: Maybe remove this case.
		let isReallyOld = parseInt(age) >= 120;
		if (isReallyOld)
			message = "It's unlikely this age is correct. Is this a typo?";

		let valid = isPositiveInteger && !isReallyOld;
		dispatch({ type: 'SET_IS_AGE_VALID', payload: { valid: valid, message } });
		return { valid, message };
	};

	const setIsZipCodeValid = (zip, displayMessage) => {

		let message = '';


		let isPositiveInteger = /^([0-9]\d*)$/.test(zip);
		if (!isPositiveInteger)
			message = 'Please only use numbers in the ZIP code.';

		// TODO: Verify this assumption. ZIPs can be very weird
		console.log(zip)
		let correctLength = zip.length === 5;
		if (!correctLength)
			message = 'ZIP codes are usually 5 digits long. Is this mistyped?';

		let valid = correctLength && isPositiveInteger;
		message = (state.isZipCodeValid === 'null' ? '' : message)

		//Don't set message if funciton was called from useEffect
		message = (displayMessage ? message : '')
		valid = (displayMessage ? valid : '')

		console.log(message)
		dispatch({ type: 'SET_IS_ZIP_CODE_VALID', payload: { valid, message } });

		return {valid, message}

	};

	const isUserDataValid =  () => {

		return(state.isZipCodeValid.valid &&
		state.isCountyValid.valid &&
		state.isAgeValid.valid &&
		state.isFamilySizeValid.valid &&
		state.isGenderValid.valid)

	}

	const validateUserData = () => {
		setIsZipCodeValid(state.zipCode,true);
	 	setIsGenderValid(state.gender);
	 	setIsAgeValid(state.age);
	 	setIsCountyValid(state.county);
	 	setIsFamilySizeValid(state.familySize);
		return
	};

	const countyAPICall = async () => {
		console.log('trigger county api call')
		await fetch(
			/*https://cors-anywhere.herokuapp.com/ need to be removed for production. For testing purposes in localhost
      this proxy prevents cors errors from being thrown by chrome. When the project is hosted somewhere, these errors
      won't be an issue.*/
			`https://cors-anywhere.herokuapp.com/https://api.census.gov/data/timeseries/poverty/saipe?get=NAME&for=county:*&in=state:41,53&time=2018&key=${CensusAPIKey}`,
			{
				crossDomain: true,
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				const countiesORWA = [];
				data.forEach((el) =>
					countiesORWA.push(
						el[0].toLowerCase().split('').reverse().slice(7).reverse().join('')
					)
				);
				countiesORWA.shift();
				if (countiesORWA.includes(state.county.toLowerCase())) {
					setValidCounty(true);
				} else {
					setValidCounty(false);
				}
			})
			//Hardcoding here is a backup list of all counties serviced in case api fails.
			.catch((err) => {
				const countiesORWA = [
					'baker',
					'benton',
					'clackamas',
					'clatsop',
					'columbia',
					'coos',
					'crook',
					'curry',
					'deschutes',
					'douglas',
					'gilliam',
					'grant',
					'harney',
					'hood river',
					'jackson',
					'jefferson',
					'josephine',
					'klamath',
					'lake',
					'lane',
					'lincoln',
					'linn',
					'malheur',
					'marion',
					'morrow',
					'multnomah',
					'polk',
					'sherman',
					'tillamook',
					'umatilla',
					'union',
					'wallowa',
					'wasco',
					'washington',
					'wheeler',
					'yamhill',
					'clark',
					'cowlitz',
					'skamania',
					'wahkiakum',
				];
				if (countiesORWA.includes(state.county.toLowerCase())) {
					setValidCounty(true);
				} else {
					setValidCounty(false);
				}
			});
	};

	const getAllPossibleCountiesByZip = async (zip) => {
		setZipcode(zip);
		if (setIsZipCodeValid(zip).valid) {
			await api.getCountyByZipCode({
				zip: state.zipCode,
			}).then((data) => {

				setPossibleCounties(
					Object.values(data).map((value) => {
						return value['county'];
					})
				);
			});
		}
	};

	const goBehavior = async () => {
		await countyAPICall();
		await setDoValidation(true);
		await setDoValidation(false);
	};

	return (
		<UserDataContext.Provider
			value={{
				serviceName: state.serviceName,
				setServiceName,
				buttonState: state.buttonState,
				setButtonState,
				categoryId: state.categoryId,
				setCategoryId,
				categorySelected: state.categorySelected,
				setCategorySelected,
				gender: state.gender,
				setGender,
				county: state.county,
				setCounty,
				zipCode: state.zipCode,
				setZipcode,
				familySize: state.familySize,
				setFamilySize,
				age: state.age,
				setAge,
				possibleCounties: state.possibleCounties,
				setPossibleCounties,
				doValidation: state.doValidation,
				setDoValidation,
				validCounty: state.validCounty,
				setValidCounty,
				getAllPossibleCountiesByZip,
				countyAPICall,
				validateUserData,
				isUserDataValid,
				goBehavior,
				isCountyValid: state.isCountyValid,
				setIsCountyValid,
				isZipCodeValid: state.isZipCodeValid,
				setIsZipCodeValid,
				isAgeValid: state.isAgeValid,
				setIsAgeValid,
				isGenderValid: state.isGenderValid,
				setIsGenderValid,
				isFamilySizeValid: state.isFamilySizeValid,
				setIsFamilySizeValid,
				setIsUserDataValid
			}}>
			{props.children}
		</UserDataContext.Provider>
	);
};

export default UserDataState;
