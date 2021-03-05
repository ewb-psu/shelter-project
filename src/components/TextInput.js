/** @format */

import React, { useContext, useEffect, useState, useRef } from "react";
// import '../Assets/TextInput.scss';
import InvalidEntryMessage from "./InvalidEntryMessage";
import ThemeDataContext from "./context/themeData/ThemeDataContext";
import UserDataContext from "../components/context/userData/UserDataContext";
import {GoLocation} from 'react-icons/go'

const TextInput = (props) => {
  const userDataContext = useContext(UserDataContext);
  const themeDataContext = useContext(ThemeDataContext);
  let invalidEntryMessage = "";
  let valid = null;

  const onlyNumbers = (str) => {
    let characterArray = str.split("");
    let numberArray = characterArray.filter(
      (character) => "0123456789".indexOf(character) !== -1
    );
    return numberArray.join("");
  };

  let textInputState = useRef({});
  useEffect(() => {
    const inputName = props.name;
    switch (inputName) {
      case "age":
        textInputState.current = {
          name: props.name,
          value: userDataContext.age,
          validator: userDataContext.setIsAgeValid,
          onChange: userDataContext.setAge,
        };
        break;
      case "zip":
        textInputState.current = {
          name: props.name,
          value: userDataContext.zipCode,
          validator: userDataContext.setIsZipCodeValid,
          onChange: userDataContext.setZipcode,
        };
        break;
      case "county":
        textInputState.current = {
          name: props.name,
          value: userDataContext.county,
          validator: userDataContext.setIsCountyValid,
          onChange: userDataContext.setCounty,
        };
        break;
      case "familySize":
        textInputState.current = {
          name: props.name,
          value: userDataContext.familySize,
          validator: userDataContext.setIsFamilySizeValid,
          onChange: userDataContext.setFamilySize,
        };
        break;
      default:
        break;
    }
  }, [userDataContext]);

  const handleChange = (e) => {
    let newValue = e.currentTarget.value;
    if (props.name === "Age" || props.name === "ZIP")
      newValue = onlyNumbers(newValue);
    textInputState.current.onChange(newValue);
  };

  const validate = () => {
    if (!props.validator) return { valid: true, message: "" };
    let value = props.value;
    let validEntryClass = "";
    let invalidEntryMessage = "";

    // Check if given value is valid
    let validityObject = props.validator(value);
    // let validityObject = userDataContext.setIsCountyValid(value);

    // Note the results for reference in the render
    const valid = validityObject.valid;

    if (validityObject.valid === false)
      invalidEntryMessage = validityObject.message;

    if (validityObject.valid === true) invalidEntryMessage = "";
  };

  let value = props.value;
  let validEntryClass = "";
  // Find the correct validity class to add to our elements
  if (valid === true) validEntryClass = "valid-entry ";
  if (valid === false) validEntryClass = "invalid-entry ";

  // Apply filter to entry, if one exists
  if (props.filter) value = props.filter(value);

  // If we've been asked to validate, do it

  //if (userDataContext.doValidation) validate();

  const findLocation = () => {
    let api_key = "&key=AIzaSyDM-iDklxh8fn6hNOGHBDgsj3CDMnU2X3w&";
    let api_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(function success(position) {
        fetch(
          `${api_url}${position.coords.latitude},${position.coords.longitude}${api_key}`
        )
          .then((response) => response.json())
          .then(
            (data) => {
              const postalCodeData = data.results[0].address_components.filter(
                (addressComponent) => {
                  return addressComponent.types[0] === "postal_code";
                }
              );
              const zipcode = postalCodeData[0].long_name;
              userDataContext.setZipcode(zipcode);
            },
            (error) => {
              console.log(error);
            }
          );
        return null;
      });
    } else {
      console.log("geolocation is not enabled on this browser");
    }
  };

  return (
    <>
      <input
        value={value}
        placeholder={props.placeholder}
        id={props.name.toLowerCase() + "-input"}
        className={
          "text-input  " + validEntryClass + themeDataContext.themeColor
        }
        onChange={handleChange}
        type="text"
      />
      {/* {props.name === "zip" && (
        <button
          type="submit"
          id="toResources"
          className="transition-allpy-2 px-4 md:px-6 lg:ml-auto lg:mx-0 font-medium"
          onClick={findLocation}
        >
		<GoLocation className='text-3xl text-orange-600 inline hover:text-orange-400'/>
          <span className='text-orange-600 text-sm'>Find ZIP</span>
        </button>
      )} */}
      <hr
        className={
          "w-2/3 border underline " +
          validEntryClass +
          themeDataContext.themeColor
        }
      />

      <InvalidEntryMessage
        message={props.validator ? props.validator.message : ""}
      />
    </>
  );
};

export default TextInput;
