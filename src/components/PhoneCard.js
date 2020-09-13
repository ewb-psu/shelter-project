import React, { useContext } from 'react';
import Collapsible from 'react-collapsible';
import PhoneNumber from './PhoneNumber'

const PhoneCard = (props) => {

  const isValidPhone = (phones)=>{
    let valid = false;
    console.log(phones)
    Object.keys(phones).map((index)=>
      valid = /\d/.test(phones[index]['Phone'])
    )
    return valid;
  }

  if(isValidPhone(props)){
    return(
      <Collapsible trigger="Phone Number">
        {Object.keys(props).map((index)=>
            <PhoneNumber {...props[index]}/>
          )}
      </Collapsible>
    );
  }

  return null;

}

export default  PhoneCard;
