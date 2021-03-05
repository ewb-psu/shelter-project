/** @format */

import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ApiDataContext from "./ApiDataContext";
import ApiDataReducer from "./ApiDataReducer";
import APIWrapper from "../../../APIWrapper";

export const ApiDataState = (props) => {
  const APIKey = process.env.REACT_APP_211_API_KEY;
  const API = new APIWrapper(APIKey);
  const history = useHistory();

  //initial state, passed as a parameter to useReducer
  let initialState = {};
  if (sessionStorage.getItem("apiDataContext")) {
    initialState = JSON.parse(sessionStorage.getItem("apiDataContext"));
  } else {
    initialState = {
      sessionID: null,
      categories: [],
      resources: [],
      arrayOfLocations: [],
      mapCenter: ["45.5135", "-122.6801"], // defaut map center position to Portland Oregon
      zoomLevel: 10,
    };
  }

  //invoke useReducer passing in our imported reducer function and initial state. returns dispatch method for updating the returned state.
  const [state, dispatch] = useReducer(ApiDataReducer, initialState);

  //each function below dispatches new state to our reducer.
  const setCategories = (categories) => {
    console.log(categories);
    dispatch({ type: "SET_CATEGORIES", payload: categories });
  };

  const setMapCenter = (newCoords) => {
    console.log("new map center coords", newCoords);
    dispatch({ type: "SET_MAP_CENTER", payload: newCoords });
  };

  const setResources = (resources) => {
    //TODO set map center position to be the first resource location here?
    // const filteredResources = resources.filter(resource => {
    // 	// console.log(resource)
    // 	return resource.Sites[0].lat !== ""
    // })
    // console.log(filteredResources)
    // console.log(filteredResources[0].Sites[0].Latitude)
    // console.log( filteredResources[0].Sites[0].Longitude)
    // setMapCenter([filteredResources[0].Sites[0].Latitude, filteredResources[0].Sites[0].Longitude])

    dispatch({ type: "SET_RESOURCES", payload: resources });
  };

  const setZoomLevel = (zoomLevel) => {
    dispatch({ type: "SET_ZOOM_LEVEL", payload: zoomLevel });
  };

  //populates our categories array in context with data from API.getCategories.
  useEffect(() => {
    const getCategories = async () => {
      const result = await API.getCategories();
      if (!result.ok) {
        history.push({
          pathname: "/error",
          state: {
            error: result,
          },
        });
      }
      setCategories(result);
      if (!sessionStorage.getItem("apiDataContext"))
        sessionStorage.setItem(
          "apiDataContext",
          JSON.stringify({ categories: result })
        );
    };

    if (state.categories.length === 0) getCategories();
  }, []);

  return (
    <ApiDataContext.Provider
      value={{
        sessionID: state.sessionID, // TODO where is the setter for this?
        categories: state.categories,
        resources: state.resources,
        mapCenter: state.mapCenter,
        zoomLevel: state.zoomLevel,
        setCategories,
        setResources,
        setMapCenter,
        setZoomLevel,
      }}
    >
      {props.children}
    </ApiDataContext.Provider>
  );
};

export default ApiDataState;
