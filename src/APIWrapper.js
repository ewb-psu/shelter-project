/** @format */

class APIWrapper {
	constructor(APIKey) {
		this.credentials = {
			APIKey: APIKey,
		};

		// Enums
		this.serviceType = {
			category: 'C',
			subCategory: 'SC',
			serviceName: 'S',
			LocationOrProviderName: 'N',
		};
	}

	async initialize() {
		//check localstorage for sessionId and if present, use it for credentials and return {ok:true}
		if (JSON.parse(localStorage.getItem('sessionId'))) {
			this.credentials['sid'] = localStorage.getItem('sessionId')[0].session_id;
			console.log('sessionId set from localStorage');
			return { ok: true };
		} else {
			//get sessionID from api
			let data = await this.getSessionID();
			//if theres an http error return the data with the error. otherwise set credentials.sid to the return value of getSessionID() and return {ok:true}
			if (!data.ok) return data;
			this.credentials['sid'] = data[0]['session_id'];
			console.log('API initalized, new sessionID');
			return { ok: true };
		}
	}

	async getSessionID() {
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/GetSessionID/?ip={apikey: "${this.credentials.APIKey}"}`
			);
			//if theres an http error, create new Error object, and assign some properties to be rendered by the error route. throw the error.
			if (!response.ok) {
				const errorObject = new Error();
				errorObject.ok = false;
				errorObject.status = response.status;
				errorObject.statusText = response.statusText;
				errorObject.message = await response.text();
				throw errorObject;
			}
			let data = await response.json();
			//set ok property
			data.ok = true;
			//save sessionId in localstorage
			localStorage.setItem('sessionId', JSON.stringify(data));
			return data;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async getCategories() {
		let parameters = this.credentials;
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/GetCategories/?ip=${JSON.stringify(
					parameters
				)}`
			);
			//if theres an http error, create new Error object, and assign some properties to be rendered by the error route. throw the error.
			if (!response.ok) {
				const errorObject = new Error();
				errorObject.ok = false;
				errorObject.status = response.status;
				errorObject.statusText = response.statusText;
				errorObject.message = await response.text();
				throw errorObject;
			}
			let data = await response.json();
			data.ok = true;
			return data;
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	//TODO: This function will have to loop/map to different shelter info components or shelter info maps them
	async getResource(obj) {
		let parameters = { ...this.credentials, ...obj };
		// console.log(parameters);
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(
					parameters
				)}`
			);
			if (!response.ok) {
				const errorObject = new Error();
				errorObject.ok = false;
				errorObject.status = response.status;
				errorObject.statusText = response.statusText;
				errorObject.message = await response.text();

				throw errorObject;
			}
			let data = await response.json();
			data.ok = true
			console.log('heres the resources', data);
			return data;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async getCountyByZipCode(obj) {
		let parameters = { ...obj, ...this.credentia };
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/GetCounty/?ip=${JSON.stringify(
					parameters
				)}`
			);
			if (!response.ok) {
				const errorObject = new Error();
				errorObject.ok = false;
				errorObject.status = response.status;
				errorObject.statusText = response.statusText;
				errorObject.message = await response.text();
				throw errorObject;
			}
			let data = await response.json();
			data.ok = true;
			console.log(data)
			return data;
		} catch (error) {
			console.log(error);
			return error;
		}
	}


	////////////////////// these methods don't appear to be used in the application thus far.
	
	async getKeywords(obj) {
		let parameters = { ...obj, ...this.credentials };
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/GetCategories/?ip=${JSON.stringify(
					parameters
				)}`
			);
			let data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async serviceNameSearch(obj) {
		let parameters = { ...obj, ...this.credentials };
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(
					parameters
				)}`
			);

			let data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async detailDrilldown(obj) {
		let parameters = { ...obj, ...this.credentials };
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/ProviderDetail/?ip=${JSON.stringify(
					parameters
				)}`
			);
			let data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

export default APIWrapper;
