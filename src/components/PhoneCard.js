import React from 'react';
import Collapsible from 'react-collapsible';
import PhoneNumber from './PhoneNumber'

const PhoneCard = (props) => {

  const isValidPhone = (phones)=>{
    return /\d/.test(phones['Phone']);
  }

  if(isValidPhone(props[0])){
    return(
      <Collapsible trigger="Phone Number">
        {Object.keys(props).map((index, i)=>
            <PhoneNumber {...isValidPhone(props[index]) ? props[index] : null} key={i}/>
          )}
      </Collapsible>
    );
  }

  return null;

}

export default  PhoneCard;
