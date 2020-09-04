
const ApiDataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CATEGORIES':
			return { ...state, categories: action.payload };

		case 'SET_RESOURCES':
			return { ...state, resources: action.payload };

		// case 'SET_ARRAY_OF_COORDS':
		// 	console.log(state, action.payload)
		// 	return { ...state, arrayOfCoords: [...state.arrayOfCoords, action.payload] };
		case 'SET_ARRAY_OF_COORDS':
			console.log(state, action.payload)
			return { ...state, arrayOfCoords: action.payload };

		default:
			return;
	}
};

export default ApiDataReducer;
