/** @format */

import React, { useContext, useEffect, useState, useRef } from 'react';
// import '../Assets/TextInput.scss';
import InvalidEntryMessage from './InvalidEntryMessage';
import ThemeDataContext from './context/themeData/ThemeDataContext'
import UserDataContext from '../components/context/userData/UserDataContext';

const TextInput = (props) => {
	const userDataContext = useContext(UserDataContext);
	const themeDataContext = useContext(ThemeDataContext);
	let invalidEntryMessage = '';
	let valid = null;

	const onlyNumbers = (str) => {
		let characterArray = str.split('');
		let numberArray = characterArray.filter(
			(character) => '0123456789'.indexOf(character) !== -1
		);
		return numberArray.join('');
	};

	let textInputState = useRef({})
	useEffect(() => {
		const inputName = props.name
		switch(inputName) {
			case 'age':
			textInputState.current = {
				name: props.name,
				value: userDataContext.age,
				validator: userDataContext.setIsAgeValid,
				onChange: userDataContext.setAge
			}
			break
			case 'zip':
			textInputState.current = {
				name: props.name,
				value: userDataContext.zipCode,
				validator: userDataContext.setIsZipCodeValid,
				onChange: userDataContext.setZipcode
			}
			break
			case 'county':
			textInputState.current = {
				name: props.name,
				value: userDataContext.county,
				validator: userDataContext.setIsCountyValid,
				onChange: userDataContext.setCounty
			}
			break
			case 'familySize':
			textInputState.current = {
				name: props.name,
				value: userDataContext.familySize,
				validator: userDataContext.setIsFamilySizeValid,
				onChange: userDataContext.setFamilySize
			}
			break
			default:
			break

		}
	}, [userDataContext])


	const handleChange = (e) => {
		let newValue = e.currentTarget.value;
		if (props.name === 'Age' || props.name === 'ZIP') newValue = onlyNumbers(newValue);
		textInputState.current.onChange(newValue);
	};


	const validate = () => {
		if (!props.validator) return { valid: true, message: '' };
		let value = props.value;
		let validEntryClass = '';
		let invalidEntryMessage = '';

		// Check if given value is valid
		let validityObject = props.validator(value)
		// let validityObject = userDataContext.setIsCountyValid(value);

		// Note the results for reference in the render
		const valid = validityObject.valid;

		if (validityObject.valid === false)
			invalidEntryMessage = validityObject.message;

		if (validityObject.valid === true) invalidEntryMessage = '';
	};

	let value = props.value;
	let validEntryClass = '';
	// Find the correct validity class to add to our elements
	if (valid === true) validEntryClass = 'valid-entry ';
	if (valid === false) validEntryClass = 'invalid-entry ';

	// Apply filter to entry, if one exists
	if (props.filter) value = props.filter(value);

	// If we've been asked to validate, do it

	if (userDataContext.doValidation) validate();


	return (
		<>
			<input
				value={value}
				placeholder={props.placeholder}
				id={props.name.toLowerCase() + '-input'}
				className={'text-input  ' + validEntryClass + themeDataContext.themeColor}
				onChange={handleChange}
				type='text'
			/>
			<hr className={'w-2/3 border underline ' + validEntryClass + themeDataContext.themeColor} />
			

			<InvalidEntryMessage message={props.validator ? props.validator.message : ''} />
		</>
	);
};

export default TextInput;

