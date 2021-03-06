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

  async function handleClick() {
    try {
      props.handleIsLoading();
      if (true) { //TODO if true? why?
        //If category selected
        //Make getResource call with category data
        //If subCategory selected
        //Make getResource call with subCategory data
        //If subestCategory selected
        //Make getResource call with service name data

        if (userDataContext.categorySelected === 3) {
          obj["st"] = "s";

          const result = await API.getResource(obj);
          if (!result.ok) {
            history.push({
              pathname: "/error",
              state: {
                error: result,
              },
            });
          } else {
            console.log("heres the result", result);

            apiDataContext.setResources(result);
            sessionStorage.setItem(
              "apiDataContext",
              JSON.stringify(apiDataContext)
            );
            sessionStorage.setItem(
              "userDataContext",
              JSON.stringify(userDataContext)
            );
            history.push("/info");
          }
        } else if (userDataContext.categorySelected === 2) {
          obj["st"] = "sc";
          obj["sn"] = "";
          const result = await API.getResource(obj);
          if (!result.ok) {
            history.push({
              pathname: "/error",
              state: {
                error: result,
              },
            });
          } else {
            apiDataContext.setResources(result);
            sessionStorage.setItem(
              "apiDataContext",
              JSON.stringify(apiDataContext)
            );
            sessionStorage.setItem(
              "userDataContext",
              JSON.stringify(userDataContext)
            );
            history.push("/info");
          }
        } else {
          obj["st"] = "c";
          obj["sn"] = "";
          const result = await API.getResource(obj);
          if (!result.ok) {
            history.push({
              pathname: "/error",
              state: {
                error: result,
              },
            });
          } else {
            apiDataContext.setResources(result);
            sessionStorage.setItem(
              "apiDataContext",
              JSON.stringify(apiDataContext)
            );
            sessionStorage.setItem(
              "userDataContext",
              JSON.stringify(userDataContext)
            );
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
      className="transition-all py-2 px-6 border border-orange-600 hover:bg-orange-600 hover:text-white rounded-full text-orange-600 mx-auto"
    >
      Submit
    </button>
  );
}
export default SubmitButton;
