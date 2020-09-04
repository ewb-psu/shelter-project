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
		//check localstorage for sessionId and if present, use it for credentials, otherwise, get new sessionId to use for credentials
		if (JSON.parse(localStorage.getItem('sessionId'))) {
			this.credentials['sid'] = localStorage.getItem('sessionId')[0].session_id;
			console.log('sessionId set from localStorage');
		} else {
			let data = await this.getSessionID();
			console.log(data);
			this.credentials['sid'] = data[0]['session_id'];
			console.log('API initalized, new sessionID');
		}
	}

	async getSessionID() {
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/GetSessionID/?ip={apikey: "${this.credentials.APIKey}"}`
			);
			let data = await response.json();
			console.log('getSessionID(): ', data);
			//save sessionId in localstorage
			localStorage.setItem('sessionId', JSON.stringify(data));
			return data;
		} catch (error) {
			console.log(error);
			return null;
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
			let data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	//TODO: This function will have to loop/map to different shelter info components or shelter info maps them
	async getResource(obj) {
		let parameters = { ...this.credentials, ...obj };
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(
					parameters
				)}`
			);
			let data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async getCountyByZipCode(obj) {
		let parameters = { ...obj, ...this.credentials };
		try {
			let response = await fetch(
				`https://www.navigateopen.info/pubres/api/GetCounty/?ip=${JSON.stringify(
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
		} catch(error) {
			console.log(error)
			return null
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
		} catch(error) {
			console.log(error)
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
		} catch(error) {
			console.log(error)
			return null
		}
	}
}

export default APIWrapper;
