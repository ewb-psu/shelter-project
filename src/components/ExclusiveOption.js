/**
 * /*
 * A component meant to allow the user to select only one specific option
 * from a row of options (should de-select any other active option when
 * pressed).
 *
 * @format
 */

import React, { useState, useEffect, useContext } from 'react';
import '../Assets/ExclusiveOption.scss';
import InvalidEntryMessage from './InvalidEntryMessage';
import ThemeDataContext from './context/themeData/ThemeDataContext';
import UserDataContext from './context/userData/UserDataContext';

const ExclusiveGroup = (props) => {
	const [selected, setSelected] = useState(props.default ? props.default : '');
	const userDataContext = useContext(UserDataContext);

	//a wrapper function for setting state of variable 'selected', determines buttons style (chosen, not chosen)
	const handleSetSelected = (data) => {
		console.log('trigger', data);
		setSelected(data);
	};

	let valid = null;
	let invalidEntryMessage = '';

	//sets Selected state, saves information about buttons state in userDataContext, to be saved later in localStorage.
	const handleClick = (event, data, id, row) => {
		handleSetSelected(data);
		if (typeof data === 'string' && props.appendCategory) {
			userDataContext.setServiceName(data);
			props.appendCategory(this.props.row, id);
		} else if (typeof data === 'string') {
			//this case is when a gender button is being clicked.
			console.log(data);
			userDataContext.setGender(data);
		} else if (props.appendCategory) {
			userDataContext.setServiceName(data.label);
			props.appendCategory(props.row, id);
			//save service button selections to buttonState, which in turn is saved to localstorage on form submit
			if (row === 0) {
				userDataContext.setButtonState({
					...userDataContext.buttonState,
					category: data.label,
				});
			} else if (row === 1) {
				userDataContext.setButtonState({
					...userDataContext.buttonState,
					subCat: [
						{
							...userDataContext.buttonState.subCat[0],
							subCategory: data.label,
						},
					],
				});
			} else {
				userDataContext.setButtonState({
					...userDataContext.buttonState,
					subCat: [
						{
							...userDataContext.buttonState.subCat[0],
							subCatTerm: [{ sterm: data.label }],
						},
					],
				});
			}
		} else {
			userDataContext.setButtonState({
				...userDataContext.buttonState,
				category: data.label,
			});
			userDataContext.setServiceName(data.label);
		}
	};

	const validate = () => {
		if (!props.validator) return { valid: true, message: '' };
		let value = selected;
		let validEntryClass = '';
		let invalidEntryMessage = '';
		// Check if given value is valid
		let validityObject = props.validator(value);
		// Note the results for reference in the render
		valid = validityObject.valid;
		if (validityObject.valid === false)
			invalidEntryMessage = validityObject.message;
		if (validityObject.valid === true) invalidEntryMessage = '';
	};

	if (userDataContext.doValidation) validate();
	if (typeof props.appendCategory == 'function') {
		return (
			<div className=''>
				<div className='exclusive-group-container mx-auto inline '>
					<div
						className={`exclusive-group flex overflow-x-auto no-scroll${props.row} `}>
						{props.items.map((item, i) => (
							<ExclusiveButton
								handleSetSelected={handleSetSelected}
								selected={
									typeof item === 'string'
										? item === selected
										: item.label === selected.label
								}
								key={i}
								data={item}
								onClick={handleClick}
								appendCategory={props.appendCategory}
								id={i}
								row={props.row}
							/>
						))}
					</div>
					<InvalidEntryMessage
						message={props.validator ? props.validator.message : ''}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className='exclusive-group-container'>
			<div
				className={`exclusive-group flex flex-wrap overflow-x-auto no-scroll${props.row} `}>
				{props.items.map((item, i) => (
					<ExclusiveButton
						handleSetSelected={handleSetSelected}
						selected={
							typeof item === 'string'
								? item === selected
								: item.label === selected.label
						}
						key={i}
						data={item}
						onClick={handleClick}
						id={i}
						row={props.row}
					/>
				))}
			</div>
			<InvalidEntryMessage
				message={props.validator ? props.validator.message : ''}
			/>
		</div>
	);
};

export default ExclusiveGroup;

// Child component of ExclusiveGroup
const ExclusiveButton = (props) => {
	const themeDataContext = useContext(ThemeDataContext);
	const userDataContext = useContext(UserDataContext);

	useEffect(() => {
		//look for userDataState in localStorage. if its there, use it to determine which buttons should be styled when navigating backwards.
		// if (!JSON.parse(localStorage.getItem('submitButtonProps'))) return;

		if (props.row === undefined) {
			props.handleSetSelected(userDataContext.gender);
		}
		if (JSON.parse(localStorage.getItem('userDataContext')))
			if (
				props.data.label ===
					JSON.parse(localStorage.getItem('userDataContext')).buttonState.category ||
				props.data.label ===
					JSON.parse(localStorage.getItem('userDataContext')).buttonState.subCat[0]
						.subCategory ||
				props.data.label ===
					JSON.parse(localStorage.getItem('userDataContext')).buttonState.subCat[0]
						.subCatTerm[0].sterm
			) {
				props.handleSetSelected(props.data);
			}
	}, []);

	if (typeof props.data !== 'string' && props.appendCategory) {
		// Assume object like {label, image} and build an SVG button
		return (
			<div
				className='p-3 w-full border shadow text-center m-5 transition-all hover:shadow-lg cursor-pointer '
				onClick={(e) => {
					props.onClick(e, props.data, props.id, props.row);
				}} // changes the name of the pick in ExGroup's state.
			>
				<button
					style={{ width: '50px' }}
					className={
						'border p-3 exclusive-button ' +
						(props.selected ? 'selected ' : ' ') +
						themeDataContext.themeColor
					} // changes CSS and appearance when an option is selected/deselected
					
				>
					<img src={props.data.image} alt={props.data.label}></img>
				</button>
				<p className='text-xs'>{props.data.label}</p>
			</div>
		);
	}
	// For buttons with SVG images
	if (typeof props.data !== 'string') {
		// Assume object like {label, image} and build an SVG button
		return (
			<div className='p-3 w-full border shadow text-center m-5 transition-all hover:shadow-lg cursor-pointer '>
				<button
					style={{ width: '50px' }}
					className={
						'exclusive-button ' +
						(props.selected ? 'selected ' : ' ') +
						themeDataContext.themeColor
					} // changes CSS and appearance when an option is selected/deselected
					onClick={(e) => {
						props.onClick(e, props.data, props.id);
					}} // changes the name of the pick in ExGroup's state.
				>
					<img src={props.data.image}></img>
					{props.data.label}
				</button>
			</div>
		);
	}

	return (
		<div className=' border overflow-hidden'>
			<button
				style={{ width: '108px' }}
				className={
					'flex exclusive-button ' +
					(props.selected ? 'selected ' : ' ') +
					themeDataContext.themeColor
				} // changes CSS and appearance when an option is selected/deselected
				onClick={(e) => {
					props.onClick(e, props.data, props.id);
				}} // changes the name of the pick in ExGroup's state.
			>
				{props.data}
			</button>
		</div>
	);
};
