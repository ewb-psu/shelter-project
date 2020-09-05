
const ApiDataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CATEGORIES':
			return { ...state, categories: action.payload };
		case 'SET_RESOURCES':
			return { ...state, resources: action.payload };
		case 'SET_ARRAY_OF_COORDS':
			return { ...state, arrayOfLocations: action.payload };
		case 'SET_MAP_CENTER':
			return { ...state, mapCenter: action.payload };
		case 'SET_ZOOM_LEVEL':
			return { ...state, zoomLevel: action.payload };
		default:
			return;
	}
};

export default ApiDataReducer;
