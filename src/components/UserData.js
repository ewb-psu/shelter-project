/** @format */

import React, { useState, useEffect, useContext, Fragment } from "react";
import ExclusiveOption from "./ExclusiveOption";
import TextInput from "./TextInput";
// import '../Assets/FieldSelector.scss';
import APIWrapper from "../APIWrapper.js";
import InputLabel from "./InputLabel";
import CountySelect from "./CountySelect";
import Spinner from "../Assets/spinner.gif";
import ApiDataContext from "./context/apiData/ApiDataContext";
import UserDataContext from "./context/userData/UserDataContext";
import ThemeDataContext from "./context/themeData/ThemeDataContext";
import { useHistory } from "react-router-dom";

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

	const findLocation = () => {
		let api_key = '&key=AIzaSyDM-iDklxh8fn6hNOGHBDgsj3CDMnU2X3w&';
		let api_url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
		if ("geolocation" in navigator) {
				// check if geolocation is supported/enabled on current browser
				navigator.geolocation.getCurrentPosition(function success(position) {
				fetch(`${api_url}${position.coords.latitude},${position.coords.longitude}${api_key}`)
				.then(response => response.json()) 
				.then(data => {
				  const postalCodeData = data.results[0].address_components.filter((addressComponent)=>{
				  return addressComponent.types[0]==="postal_code"
				  })
				  const zipcode = (postalCodeData[0].long_name)
				  userDataContext.setZipcode(zipcode)
				}, error => {
				  console.log(error);
				})
				return null;
				});
			} 
			else 
			{
			  console.log('geolocation is not enabled on this browser')
			}
	};

			// for when getting location is a success
				// axios.get(`${api_url}${position.coords.latitude},${position.coords.longitude}${api_key}`)
				// .then(response => {
				//   const postalCodeData = response.data.results[0].address_components.filter((ziggslife)=>{
				//   return ziggslife.types[0]==="postal_code"
				//   })
				//   const zipcode = (postalCodeData[0].long_name)
				//   userDataContext.setZipcode(zipcode)
				// }, error => {
				//   console.log(error);
				// })
				// return null;
				// });

	useEffect(() => {
		async function callAPI() {
			//check category state to see if it has already been populated from local storage, possibly avoid making another api call (even though it would be with the same session id)
			if ('categories' in apiDataContext)
				if (apiDataContext.categories.length === 0) {
					//no categories found in context so call api method initialize, which calls getSessionID() which makes http request to server for credentials.
					const result = await API.initialize();
					//if data ok === false, redirect to error route and set data to state as error object.
					console.log(result)
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
		//findLocation(); its best we dont do this on load because users tend to just hit block.  We probably should make a button for lazy users
	}, []);

	//monitors the state of userData.zipCode. When it becomes a valid zip,
	//an api call is made to populate an array with all the possible counties that zipcode could be in.
	useEffect(() => {
		const handleValidZip = async () => {
			console.log('handleValidZip');
			if (userDataContext.setIsZipCodeValid(userDataContext.zipCode, false).valid) {
				userDataContext.setDoValidation(false);
				await API.getCountyByZipCode({
					zip: userDataContext.zipCode,
				})
					.then((data) => {

						//if data ok === false, redirect to error route and set data to state as error object.
						//TODO add something here to indicate what api call threw the error.
						if (!data.ok) {
							history.push({
								pathname: '/error',
								state: {
									error: data,
								},
							});
						}
						userDataContext.setCounty(data[0]['county']);
						userDataContext.getAllPossibleCountiesByZip(userDataContext.zipCode);

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
			console.log(result)
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

	useEffect(() => {
		let userDataIsValid = userDataContext.isUserDataValid();
		console.log(userDataIsValid && userDataContext.doValidation)
		if (userDataIsValid && userDataContext.doValidation) {
			history.push('/resources');
			themeDataContext.setShowNav(true);
			userDataContext.clearIsUserDataValid();
			userDataContext.setDoValidation(false);
		}
	});

	const nextPage = () => {
		userDataContext.setDoValidation(true);
	 	userDataContext.validateUserData();

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
		<Fragment>
			<div className='text-center mt-16 lg:mx-32 '>
				<h1>Welcome to the 211 Resource Locator.</h1>
				<p>
					Please tell us a little about yourself so we can find you the best services.
				</p>
			</div>

			<div
				className={
					'rounded-lg py-16 mx-5 sm:mx-16 xl:mx-16 grid grid-cols-4 grid-auto-rows gap-y-5 border shadow field-selector  ' +
					themeDataContext.themeColor
				}>
				<div className=' mt-5 col-start-1 col-span-4 '>
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
						type="submit"
						id="toResources"
						className="border transition-all border-orange-600 rounded-full py-2 px-4 md:px-6 lg:ml-auto lg:mx-0 font-medium hover:bg-orange-600 text-orange-600 hover:text-white"
						onClick={nextPage}
					>
						Submit
					</button >
					<button ype="submit"
						id="toResources"
						className="border transition-all border-orange-600 rounded-full py-2 px-4 md:px-6 lg:ml-auto lg:mx-0 font-medium hover:bg-orange-600 text-orange-600 hover:text-white"
						onClick={nextPage}onClick={findLocation}>Find My Zipcode</button>
				</div>
			</div>
		</Fragment>
	);
 
};

export default UserData;
