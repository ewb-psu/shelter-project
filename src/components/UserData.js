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
import UserDataContext from './context/userData/UserDataContext';
import ThemeDataContext from './context/themeData/ThemeDataContext';
import { useHistory } from 'react-router-dom';

const APIKey = process.env.REACT_APP_211_API_KEY;
const API = new APIWrapper(APIKey);

const UserData = (props) => {
	const userDataContext = useContext(UserDataContext);
	const apiDataContext = useContext(ApiDataContext);
	const themeDataContext = useContext(ThemeDataContext);
	let history = useHistory();

	//TODO move this last piece of state and handler function into context.....which context?
	const [isLoading, setIsLoading] = useState(false);
	const handleIsLoading = () => {
		setIsLoading(!isLoading);
	};

	// TODO get this working with some api.....
	const findLocation = () => {
		// // console.log(
		// "Then we'd try to find their location using a Google API. For now...";
		// // );
		userDataContext.setZipcode('97206');
		userDataContext.setCounty('Clackamas');
	};

	useEffect(() => {
		async function callAPI() {
			//check category state to see if it has already been populated from local storage, possibly avoid making another api call (even though it would be with the same session id)
			if ('categories' in apiDataContext)
				if (apiDataContext.categories.length === 0) {
					//no categories found in context so call api method initialize, which calls getSessionID() which makes http request to server for credentials.
					const result = await API.initialize();
					//if data ok === false, redirect to error route and set data to state as error object.
					if (!result.ok) {
						history.push({
							pathname: '/error',
							state: {
								error: result,
							},
						});
					}
				}
		}
		callAPI();
	}, []);

	//monitors the state of userData.zipCode. When it becomes a valid zip,
	//an api call is made to populate an array with all the possible counties that zipcode could be in.
	useEffect(() => {
		const handleValidZip = async () => {
			console.log('handleValidZip');
			if (
				userDataContext.setIsZipCodeValid(userDataContext.zipCode, false).valid
			) {
				await API.getCountyByZipCode({
					zip: userDataContext.zipCode,
				})
					.then((data) => {
						//if data ok === false, redirect to error route and set data to state as error object.
						if (!data.ok) {
							history.push({
								pathname: '/error',
								state: {
									error: data,
								},
							});
						}
						userDataContext.setCounty(data[0]['county']);
						userDataContext.getAllPossibleCountiesByZip(
							userDataContext.zipCode
						);
					})
					.catch((err) => {
						// TODO: we'll probably want to take action here to resolve the error
						console.log(err);
					});
			}
		};
		handleValidZip();
	}, [userDataContext.zipCode]);

	useEffect(() => {
		const getCategories = async () => {
			const result = await API.getCategories();
			if (!result.ok) {
				console.log(result);
				history.push({
					pathname: '/error',
					state: {
						error: result,
					},
				});
			}
			apiDataContext.setCategories(result);
		};
		getCategories();
	}, []);

	const nextPage = () => {
		console.log(userDataContext);
		if (userDataContext.validateUserData()) {
			history.push('/resources');
			themeDataContext.setShowNav(true)
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
		<div className=''>
			<div className='text-center mt-16 px-16'>
				<h1>Welcome to the 211 info web application.</h1>
				<p>
					tell us a little about yourself so we can find you the best services.
				</p>
			</div>

			<div
				className={
					'py-16 mx-5 sm:mx-16 lg:mx-32 grid grid-cols-4 grid-auto-rows gap-y-5 border shadow field-selector ' +
					themeDataContext.themeColor
				}>
				<div className='mt-5 col-start-1 col-span-4 '>
					<InputLabel label='Gender'>
						<ExclusiveOption
							items={['Male', 'Female', 'Trans Male', 'Trans Female']}
							validator={userDataContext.isGenderValid}
						/>
					</InputLabel>
				</div>

				<div className='col-start-1 col-span-4 row-start-2 '>
					<InputLabel label='Age'>
						<TextInput
							name='age'
							value={userDataContext.age}
							validator={userDataContext.isAgeValid}
							placeholder='32'
						/>
					</InputLabel>
				</div>

				<div className='col-start-1 col-span-4 row-start-3'>
					<div id='zip-and-county' className='flex flex-col'>
						<InputLabel label='ZIP' className=''>
							<TextInput
								name='zip'
								value={userDataContext.zipCode}
								validator={userDataContext.isZipCodeValid}
								placeholder='97333'
							/>
						</InputLabel>
					</div>
				</div>

				<div className='col-start-1 col-span-4 row-start-4'>
					{userDataContext.possibleCounties ? (
						<InputLabel label='County'>
							<CountySelect name='County' />
						</InputLabel>
					) : (
						<InputLabel label='County'>
							<TextInput
								name='county'
								value={userDataContext.county}
								validator={userDataContext.isCountyValid}
								placeholder='Multnomah'
							/>
						</InputLabel>
					)}
				</div>

				<div className='col-start-1 lg:col-start-3'>
					<button
						id='toResources'
						className='p-2 border transition-all hover:bg-themeTeal '
						onClick={nextPage}>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserData;
