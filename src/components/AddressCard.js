import React, { useContext } from 'react';
import Collapsible from 'react-collapsible';
import Address from './Address'

const AddressCard = (props) => {

  const isValidAddress = (address)=>{
    return /\d/.test(address['Line1']);
  }

  if(isValidAddress(props[0])){
    return(
      <Collapsible trigger="Address">
        {Object.keys(props).map((index)=>
            <Address {...isValidAddress(props[index]) ? props[index] : null}/>
          )}
      </Collapsible>
    );
  }

  return null
}

export default  AddressCard;
