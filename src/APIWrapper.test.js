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
		const result = await API.getSessionID();
		//expect result to have object with property session_id
		const mockResponse = [{ session_id: '0ZokOVgx3DBUHou2iBGZ' }];
		mockResponse.ok = true;
		expect(result).toEqual(mockResponse);
		expect(fetch).toHaveBeenCalledTimes(1);
	});

	//include a test here to make sure sessionID is saved to localStorage.

	it('catches errors and returns the name, status, and message, properties', async () => {

		const mockErrorObject = new Error()
		mockErrorObject.ok = false
		mockErrorObject.status = 404
		mockErrorObject.statusText = 'file not found'
		mockErrorObject.message = 'testing getSessionID()'


		fetch.mockReject(mockErrorObject); 
		const result = await API.getSessionID();

		expect(result.name).toEqual('Error');
		expect(result.ok).toEqual(false);
		expect(result.status).toEqual(404)
		expect(result.statusText).toEqual('file not found');
		expect(result.message).toEqual('testing getSessionID()');

	});


//test API.getCategories()

it('returns an array of objects, each with a categories property', async () => {
	fetch.mockResponseOnce(JSON.stringify([{ category: 'Crisis Hotlines' }]));
	const result = await API.getCategories();
	//expect result to have category property, expect typeof property?
	const mockResult = [{ category: 'Crisis Hotlines' }];
	mockResult.ok = true;
	expect(result).toEqual(mockResult);
	expect(fetch).toHaveBeenCalledTimes(1);
});

it('catches errors and returns the name, status, and message properties', async () => {
	const mockErrorObject = new Error()
	mockErrorObject.ok = false
	mockErrorObject.status = 404
	mockErrorObject.statusText = 'file not found'
	mockErrorObject.message = 'testing getCategories()'


	fetch.mockReject(mockErrorObject);
	const result = await API.getCategories();

	expect(result.ok).toEqual(false);
	expect(result.name).toEqual('Error');
	expect(result.status).toEqual(404);
	expect(result.statusText).toEqual('file not found');
	expect(result.message).toEqual('testing getCategories()');
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
