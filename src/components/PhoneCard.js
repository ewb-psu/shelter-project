import React, { useContext } from 'react';
import Collapsible from 'react-collapsible';
import PhoneNumber from './PhoneNumber'

const PhoneCard = (props) => {
  console.log(props)

  if(Object.keys(props).length > 1){
    return(
      <Collapsible trigger="Phone Numbers">
        {Object.keys(props).map((index)=>
            <PhoneNumber {...props[index]}/>
          )}
      </Collapsible>
    );
  }
  else{
    return(
    <Collapsible trigger="Phone Number">
        <PhoneNumber {...props[0]}/>
    </Collapsible>)
  }

}

export default  PhoneCard;
