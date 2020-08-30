/** @format */

import React, { useContext, useEffect, useState, useRef } from 'react';
// import '../Assets/TextInput.scss';
import InvalidEntryMessage from './InvalidEntryMessage';
import ThemeDataContext from './context/themeData/ThemeDataContext'
import FieldSelectorContext from '../components/context/fieldSelectorContext/FieldSelectorContext';

const TextInput = (props) => {
	const fieldSelectorContext = useContext(FieldSelectorContext);
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
				value: fieldSelectorContext.age,
				validator: fieldSelectorContext.setIsAgeValid,
				onChange: fieldSelectorContext.setAge
			}
			break
			case 'zip':
			textInputState.current = {
				name: props.name,
				value: fieldSelectorContext.zipCode,
				validator: fieldSelectorContext.setIsZipCodeValid,
				onChange: fieldSelectorContext.setZipcode
			}
			break
			case 'county':
			textInputState.current = {
				name: props.name,
				value: fieldSelectorContext.county,
				validator: fieldSelectorContext.setIsCountyValid,
				onChange: fieldSelectorContext.setCounty
			}
			break
			case 'familySize':
			textInputState.current = {
				name: props.name,
				value: fieldSelectorContext.familySize,
				validator: fieldSelectorContext.setIsFamilySizeValid,
				onChange: fieldSelectorContext.setFamilySize
			}
			break
			default:
			break

		}
	}, [fieldSelectorContext])


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
		// let validityObject = FieldSelectorContext.setIsCountyValid(value);

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

	if (fieldSelectorContext.doValidation) validate();


	return (
		<>
			<input
				value={value}
				placeholder={props.placeholder}
				id={props.name.toLowerCase() + '-input'}
				className={'text-input ' + validEntryClass + themeDataContext.themeColor}
				onChange={handleChange}
				type='text'
			/>
			<hr className={'border underline ' + validEntryClass + themeDataContext.themeColor} />
			

			<InvalidEntryMessage message={props.validator ? props.validator.message : ''} />
		</>
	);
};

export default TextInput;
// /** @format */

// import React, { useContext } from 'react';
// import '../Assets/TextInput.scss';
// import InvalidEntryMessage from './InvalidEntryMessage';
// import { ThemeContext } from '../ThemeContext';
// import FieldSelectorContext from '../components/context/fieldSelectorContext/FieldSelectorContext';

// const TextInput = (props) => {
// 	const fieldSelectorContext = useContext(FieldSelectorContext);
// 	const themeContext = useContext(ThemeContext);
// 	let invalidEntryMessage = '';
// 	let valid = null;



// 	const handleChange = (e) => {
// 		let newValue = e.currentTarget.value;
// 		if (props.filter) newValue = props.filter(newValue);
// 		props.onChange(newValue);
// 	};

// 	const validate = () => {
// 		if (!props.validator) return { valid: true, message: '' };
// 		let value = props.value;
// 		let validEntryClass = '';
// 		let invalidEntryMessage = '';

// 		// Check if given value is valid
// 		// let validityObject = props.validator(value)
// 		let validityObject = FieldSelectorContext.setIsCountyValid(value);

// 		// Note the results for reference in the render
// 		const valid = validityObject.valid;

// 		if (validityObject.valid === false)
// 			invalidEntryMessage = validityObject.message;

// 		if (validityObject.valid === true) invalidEntryMessage = '';
// 	};

// 	let value = props.value;
// 	let validEntryClass = '';
// 	// Find the correct validity class to add to our elements
// 	if (valid === true) validEntryClass = 'valid-entry ';
// 	if (valid === false) validEntryClass = 'invalid-entry ';

// 	// Apply filter to entry, if one exists
// 	if (props.filter) value = props.filter(value);

// 	// If we've been asked to validate, do it
// 	// if(props.shouldValidate)
// 	// console.log(fieldSelectorContext);
// 	if (fieldSelectorContext.doValidation) validate();


// 	return (
// 		<>
// 			<input
// 				value={value}
// 				placeholder={props.placeholder}
// 				id={props.name.toLowerCase() + '-input'}
// 				className={'text-input ' + validEntryClass + themeContext}
// 				onChange={handleChange}
// 				type='text'
// 			/>
// 			<div className={'underline ' + validEntryClass + themeContext}></div>
// 			<InvalidEntryMessage message={invalidEntryMessage} />
// 		</>
// 	);
// };

// export default TextInput;
