import React, { useContext } from 'react';
import Collapsible from 'react-collapsible';
import Address from './Address'

const AddressCard = (props) => {

  const isValidAddress = (addresses)=>{
    let valid = false;
    Object.keys(addresses).map((index)=>
      valid = /\d/.test(addresses[index]['Line1'])
    )
    return valid;
  }
  if(isValidAddress(props)){
    return(
      <Collapsible trigger="Address">
        {Object.keys(props).map((index)=>
            <Address {...props[index]}/>
          )}
      </Collapsible>
    );
  }

  return null
}

export default  AddressCard;
