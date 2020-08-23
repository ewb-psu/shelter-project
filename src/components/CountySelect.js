import React, {useContext} from 'react';
import ThemeDataContext from './context/themeData/ThemeDataContext'
import FieldSelectorContext from './context/fieldSelectorContext/FieldSelectorContext'
import '../Assets/CountySelect.scss';


const CountySelect = (props) =>  {


  const fieldSelectorContext = useContext(FieldSelectorContext) 
  const themeDataContext = useContext(ThemeDataContext)
  let valid = null

    let value = fieldSelectorContext.county
    
    return (

      <select
        value = {value}
        id= {props.name.toLowerCase()+'input'}
        className= {'text-input' + themeDataContext.themeColor + ' county-select'}
        onChange= {e => {
            let newValue = e.currentTarget.value
            if(props.filter)
              newValue = props.filter(newValue)
            fieldSelectorContext.setCounty(newValue)
          }
        }
       counties = {fieldSelectorContext.counties}
      >
        <option value = '' disabled>Choose your county:</option>
        {fieldSelectorContext.possibleCounties.map((county,index) => {
          return (
            <option key = {index} value = {county}>{county}</option>
          )
        })}
      </select>
    )
  
}

export default CountySelect;
