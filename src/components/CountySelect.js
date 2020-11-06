import React, {useContext} from 'react';
import ThemeDataContext from './context/themeData/ThemeDataContext'
import UserDataContext from './context/userData/UserDataContext'
// import '../Assets/CountySelect.scss';


const CountySelect = (props) =>  {


  const userDataContext = useContext(UserDataContext) 
  const themeDataContext = useContext(ThemeDataContext)
  // let valid = null

    let value = userDataContext.county
    
    return (

      <select
        value = {value}
        id= {props.name.toLowerCase()+'input'}
        className= {'m-0 p-0 text-input' + themeDataContext.themeColor + ' county-select'}
        onChange= {e => {
            let newValue = e.currentTarget.value
            if(props.filter)
              newValue = props.filter(newValue)
            userDataContext.setCounty(newValue)
          }
        }
       counties = {userDataContext.counties}
      >
        <option value = '' disabled>Choose your county:</option>
        {userDataContext.possibleCounties.map((county,index) => {
          return (
            <option key = {index} value = {county}>{county}</option>
          )
        })}
      </select>
    )
  
}

export default CountySelect;
