import React from 'react';
import "../assets/FieldSelector.js.scss"

class FieldSelector extends React.Component {
    render() {
        return(
        <div className={"FieldSelector"}>
            <h1> Gender </h1>
            <div className={"GenderSelector"}>
                <div className={"Male"}>Male</div>
                <div className={"Transgender Male"}>Transgender Male</div>
                <div className={"Female"}>Female</div>

                <div className={"Transgender Female"}>Transgender Female</div>
            </div>
            <h1> Age </h1>
            <div className={"AgeSelector"}>

                <input type={"number"} value={"2"}/>
            </div>
            <h1> Donde Estas? </h1>
            <div className={"Location"}>
                <p>Zip Code: <input type={"Number"}/></p>
                <a href={"google.com"}>Your location</a>
            </div>
            <div className={"Services"}>
            </div>
        </div>

        );
    }
}

export default FieldSelector;