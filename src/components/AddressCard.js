import React, { useContext } from 'react';
import Collapsible from 'react-collapsible';
import Address from './Address'

const AddressCard = (props) => {
  console.log(props)

  if(Object.keys(props).length > 1){
    return(
      <Collapsible trigger="Addresses">
        {Object.keys(props).map((index)=>
            <Address {...props[index]}/>
          )}
      </Collapsible>
    );
  }
  else{
    return(
    <Collapsible trigger="Address">
        <Address {...props[0]}/>
    </Collapsible>)
  }

}

export default  AddressCard;
