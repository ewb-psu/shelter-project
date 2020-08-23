const ThemeDataReducer = (state, action) => {
    switch(action.type) {
        case 'SET_THEME_COLOR':
            return {...state, themeColor: action.payload}
            default: 
            return
    }

}

export default ThemeDataReducer