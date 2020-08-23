/** @format */

import APIWrapper from './APIWrapper';

const API = new APIWrapper(process.env.REACT_APP_211_API_KEY);

beforeEach(() => {
	fetch.resetMocks();
});

//test API.getSessionID()

it('makes a get request to the 211 api and returns a new session ID', async () => {
	fetch.mockResponseOnce(
		JSON.stringify([{ session_id: '0ZokOVgx3DBUHou2iBGZ' }])
	);
	const response = await API.getSessionID();
	//expect response to have object with property session_id
	expect(response).toEqual([{ session_id: '0ZokOVgx3DBUHou2iBGZ' }]);
	expect(fetch).toHaveBeenCalledTimes(1);
});

it('catches errors and returns null', async () => {
	fetch.mockReject(() => 'API Failure');
	const result = await API.getSessionID();
	expect(result).toEqual(null);
});

//test API.getCategories()

it('returns an array of objects, each with a categories property', async () => {
	fetch.mockResponseOnce(JSON.stringify([{ category: 'Crisis Hotlines' }]));
	const result = await API.getCategories();
	//expect result to have category property, expect typeof property?
	expect(result).toEqual([{ category: 'Crisis Hotlines' }]);
	expect(fetch).toHaveBeenCalledTimes(1);
});

it('catches errors and returns null', async () => {
	fetch.mockReject(() => 'API Failure');
	const result = await API.getCategories();
	expect(result).toEqual(null);
});

//test API.getResources()

it('returns an array of objects with resource data', async () => {
	fetch.mockResponseOnce(JSON.stringify([{ key: 'INFO4302' }]));
	const result = await API.getResource();
	//expect result to contain objects having properties called: 'key', string, 'name', string and 'sites', array
	expect(result).toEqual([{ key: 'INFO4302' }]);
	expect(fetch).toHaveBeenCalledTimes(1);
});

it('catches errors and returns null', async () => {
	fetch.mockReject(() => 'API Failure');
	const result = await API.getResource();
	expect(result).toEqual(null);
});

//test API.getCountyByZipCode()

it('returns an array of objects with county data', async () => {
	fetch.mockResponseOnce(
		JSON.stringify([{ c_id: '2335', county: 'Clackamas', state: 'OR' }])
	);
	const result = await API.getCountyByZipCode();
	expect(result).toEqual([{ c_id: '2335', county: 'Clackamas', state: 'OR' }]);
	expect(fetch).toHaveBeenCalledTimes(1);
});

it('catches errors and returns null', async () => {
	fetch.mockReject(() => 'API Failure');
	const result = await API.getCountyByZipCode();
	expect(result).toEqual(null);
});

