/** @format */

import APIWrapper from './APIWrapper';

const API = new APIWrapper(process.env.REACT_APP_211_API_KEY);

beforeEach(() => {
	fetch.resetMocks();
});

//test API.getSessionID()
describe('tests for getSession() method of APIWrapper class', () => {

	it('makes a get request to the 211 api and returns a new session ID', async () => {
		fetch.mockResponseOnce(
			JSON.stringify([{ session_id: '0ZokOVgx3DBUHou2iBGZ' }])
		);
		const result = await API.getSessionID();
		//expect result to have object with property session_id
		console.log(result)
		const mockResponse = [{ session_id: '0ZokOVgx3DBUHou2iBGZ' }]
		mockResponse.ok = true
		expect(result).toEqual(mockResponse);
		expect(fetch).toHaveBeenCalledTimes(1);
	});

	//include a test here to make sure sessionID is saved to localStorage.

	it('catches errors and returns null', async () => {
		fetch.mockReject(() => 'API Failure'); // <-----try mockResponseOnce here instead. stringify it, then it should work.
		const result = await API.getSessionID();
		console.log(result)
		expect(result).toEqual(null);
	});


	//include tests here to handle to different http error codes??

});

//test API.getCategories()

it('returns an array of objects, each with a categories property', async () => {
	fetch.mockResponseOnce(JSON.stringify([{ category: 'Crisis Hotlines' }]));
	const result = await API.getCategories();
	//expect result to have category property, expect typeof property?
	const mockResult = [{ category: 'Crisis Hotlines' }]
	mockResult.ok = true
	expect(result).toEqual(mockResult);
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
