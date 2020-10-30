/** @format */

import React, { useContext } from "react";
import "./SubmitButton.css";
import { useHistory } from "react-router-dom";
import APIWrapper from "../../APIWrapper.js";
import ApiDataContext from "../context/apiData/ApiDataContext";
import UserDataContext from "../context/userData/UserDataContext";

function SubmitButton(props) {
  let history = useHistory();
  const APIKey = process.env.REACT_APP_211_API_KEY;
  const API = new APIWrapper(APIKey);
  const apiDataContext = useContext(ApiDataContext);
  const userDataContext = useContext(UserDataContext);
  console.log(userDataContext);

  // API.initialize();
  let obj = {
    sn: userDataContext.serviceName,
    st: "",
    age: userDataContext.age,
    gender: userDataContext.gender,
    zip: userDataContext.zipCode,
    county: userDataContext.county,
    catid: userDataContext.categoryId,
  };

//   sn: userDataContext.serviceName || JSON.parse(localStorage.getItem("userDataContext")).serviceName,
//   st: "",
//   age: userDataContext.age || JSON.parse(localStorage.getItem("userDataContext")).age,
//   gender: userDataContext.gender || JSON.parse(localStorage.getItem("userDataContext")).gender,
//   zip: userDataContext.zipCode || JSON.parse(localStorage.getItem("userDataContext")).zipCode,
//   county: userDataContext.county || JSON.parse(localStorage.getItem("userDataContext")).county,
//   catid: userDataContext.categoryId || JSON.parse(localStorage.getItem("userDataContext")).categoryId,
//   if (JSON.parse(localStorage.getItem("userDataContext"))) {
//     console.log(JSON.parse(localStorage.getItem("userDataContext")));
//     obj = {
//       sn: JSON.parse(localStorage.getItem("userDataContext")).serviceName,
//       st: "",
//       age: Number(JSON.parse(localStorage.getItem("userDataContext")).age),
//       gender: JSON.parse(localStorage.getItem("userDataContext")).gender,
//       zip: Number(JSON.parse(localStorage.getItem("userDataContext")).zipCode),
//       county: JSON.parse(localStorage.getItem("userDataContext")).county,
//       catid: JSON.parse(localStorage.getItem("userDataContext")).categoryId,
//     };
//   }

  async function handleClick() {
    try {
      props.handleIsLoading();
      if (true) {
        //save submit button state to local storage for use if / when user navigates backwards
        localStorage.setItem("apiDataContext", JSON.stringify(apiDataContext));
        localStorage.setItem(
          "userDataContext",
          JSON.stringify(userDataContext)
        );

        //If category selected
        //Make getResource call with category data
        //If subCategory selected
        //Make getResource call with subCategory data
        //If subestCategory selected
        //Make getResource call with service name data

        //TODO finish error handling code for getResource.
        if (userDataContext.categorySelected === 3) {
          obj["st"] = "s";
          const result = await API.getResource(obj);
          console.log(result);
          apiDataContext.setResources(result);
          history.push("/info");
        } else if (userDataContext.categorySelected === 2) {
          obj["st"] = "sc";
		  obj["sn"] = "";
		  console.log('trigger')
          const result = await API.getResource(obj);
          console.log(result);
          if (!result.ok) {
            history.push({
              pathname: "/error",
              state: {
                error: result,
              },
            });
          }
          console.log('heres the result',result);

          apiDataContext.setResources(result);
          history.push("/info");
        } else {
          obj["st"] = "c";
          obj["sn"] = "";
          console.log(obj);
          const result = await API.getResource(obj);
          console.log(result);
          console.log(result.ok);
          if (!result.ok) {
            history.push({
              pathname: "/error",
              state: {
                error: result,
              },
            });
          } else {
			console.log(result);

			apiDataContext.setResources(result);
			history.push("/info");
		  }
      
        }
        console.log("handleClick");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      className="transition-all p-2 sm:px-5 md:px-8 lg:px-16 border hover:bg-themeTeal rounded rounded-l-none mx-auto"
    >
      Submit
    </button>
  );
}
export default SubmitButton;
