/** @format */

import APIWrapper from './APIWrapper';

const API = new APIWrapper(process.env.REACT_APP_211_API_KEY);

//reset the mock state before each new mock fetch call.
beforeEach(() => {
	fetch.resetMocks();
});

describe('tests for the getSessionID() method', () => {
	it('makes a get request to the 211 api and returns an array with an ok:true property, and an object element with a session ID property', async () => {
		fetch.mockResponseOnce(
			JSON.stringify([{ session_id: '0ZokOVgx3DBUHou2iBGZ' }])
		);
		const result = await API.getSessionID();
		expect(fetch).toHaveBeenCalledTimes(1);
		const mockResult = [{ session_id: '0ZokOVgx3DBUHou2iBGZ' }];
		mockResult.ok = true;
		expect(result).toEqual(mockResult);
	});

	it('throws errors correctly, returning the name, ok, status, statusText and message properties', async () => {
		const mockErrorObject = new Error();
		mockErrorObject.ok = false;
		mockErrorObject.status = 404;
		mockErrorObject.statusText = 'file not found';
		mockErrorObject.message = 'testing getSessionID()';

		fetch.mockReject(mockErrorObject);
		const result = await API.getSessionID();
		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result.name).toEqual('Error');
		expect(result.ok).toEqual(false);
		expect(result.status).toEqual(404);
		expect(result.statusText).toEqual('file not found');
		expect(result.message).toEqual('testing getSessionID()');
	});
});

describe('tests for the getCategories() method', () => {
	it('returns an array of json objects with an ok:true property, from a stringified http response', async () => {
		fetch.mockResponseOnce(JSON.stringify([{ category: 'Crisis Hotlines' }]));
		const result = await API.getCategories();
		expect(fetch).toHaveBeenCalledTimes(1);
		const mockResult = [{ category: 'Crisis Hotlines' }];
		mockResult.ok = true;
		expect(result).toEqual(mockResult);
	});

	it('throws errors correctly, returning the name, ok, status, statusText and message properties', async () => {
		const mockErrorObject = new Error();
		mockErrorObject.ok = false;
		mockErrorObject.status = 404;
		mockErrorObject.statusText = 'file not found';
		mockErrorObject.message = 'testing getCategories()';

		fetch.mockReject(mockErrorObject);
		const result = await API.getCategories();
		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result.ok).toEqual(false);
		expect(result.name).toEqual('Error');
		expect(result.status).toEqual(404);
		expect(result.statusText).toEqual('file not found');
		expect(result.message).toEqual('testing getCategories()');
	});
});

describe('test for the getResources() method', () => {
	it('returns an array with an ok:true property, containing elements which are objects with resource data', async () => {
		fetch.mockResponseOnce(JSON.stringify([{ key: 'INFO4302' }]));
		const result = await API.getResource();
		expect(fetch).toHaveBeenCalledTimes(1);
		const mockResult = [{ key: 'INFO4302' }];
		mockResult.ok = true;
		expect(result).toEqual(mockResult);
	});

	it('throws errors correctly, returning the name, ok, status, statusText and message properties', async () => {
		const mockErrorObject = new Error();
		mockErrorObject.ok = false;
		mockErrorObject.status = 404;
		mockErrorObject.statusText = 'file not found';
		mockErrorObject.message = 'testing getResources()';

		fetch.mockReject(mockErrorObject);
		const result = await API.getResource();
		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result.ok).toEqual(false);
		expect(result.name).toEqual('Error');
		expect(result.status).toEqual(404);
		expect(result.statusText).toEqual('file not found');
		expect(result.message).toEqual('testing getResources()');
	});
});

describe('test for the getCountyByZipCode', () => {
	it('returns an array of objects with county data', async () => {
		fetch.mockResponseOnce(
			JSON.stringify([{ c_id: '2335', county: 'Clackamas', state: 'OR' }])
		);
		const result = await API.getCountyByZipCode();
		expect(fetch).toHaveBeenCalledTimes(1);
		const mockResult = [{ c_id: '2335', county: 'Clackamas', state: 'OR' }];
		mockResult.ok = true;
		expect(result).toEqual(mockResult);
	});

	it('throws errors correctly, returning the name, ok, status, statusText and message properties', async () => {
		const mockErrorObject = new Error();
		mockErrorObject.ok = false;
		mockErrorObject.status = 404;
		mockErrorObject.statusText = 'file not found';
		mockErrorObject.message = 'testing getCountyByZipCode()';

		fetch.mockReject(mockErrorObject);
		const result = await API.getCountyByZipCode();
		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result.ok).toEqual(false);
		expect(result.name).toEqual('Error');
		expect(result.status).toEqual(404);
		expect(result.statusText).toEqual('file not found');
		expect(result.message).toEqual('testing getCountyByZipCode()');
	});
});
