import React, { useContext } from 'react';

const TrimetButton = (address) => {

  return(
    <div>
      <p> {address['Line1']} </p> <button>Trimet</button>
    </div>
  )

}
export default TrimetButton;
