
const ApiDataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CATEGORIES':
			return { ...state, categories: action.payload };

		case 'SET_RESOURCES':
			return { ...state, resources: action.payload };

		default:
			return;
	}
};

export default ApiDataReducer;
