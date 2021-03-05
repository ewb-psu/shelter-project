/** @format */

import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import APIWrapper from "../../APIWrapper";

import ApiDataContext from "../context//apiData/ApiDataContext";
import UserDataContext from "../context/userData/UserDataContext";

const SearchBar = ({ handleIsLoading }) => {
  const apiDataContext = useContext(ApiDataContext);
  const userDataContext = useContext(UserDataContext);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const history = useHistory();

  //parameters for api call to get resources. based on category chosen from search menu dropdown.
  let obj = {
    sn: "",
    st: "",
    age: Number(userDataContext.age),
    gender: userDataContext.gender,
    zip: Number(userDataContext.zipCode),
    county: userDataContext.county,
    catid: "",
  };

  const APIKey = process.env.REACT_APP_211_API_KEY;
  const API = new APIWrapper(APIKey);

  //here we unpack the return object from API.getCategories() into the searchTermsArr which we will filter through later.
  const searchTermsArr = [];
  if (apiDataContext.categories) {
    apiDataContext.categories.forEach((entry) => {
      searchTermsArr.push({
        name: entry.category,
        categoryID: entry.categoryID,
        categorySelected: 1,
      });
      entry.subcat.forEach((subentry) => {
        searchTermsArr.push({
          name: subentry.subcategory,
          categoryID: subentry.subcategoryID,
          categorySelected: 2,
        });
        subentry.subcatterm.forEach((term) => {
          searchTermsArr.push({
            name: term.sterm,
            categorySelected: 3,
          });
        });
      });
    });
  }

  //here we filter through the searchTerms on keypress.
  const handleChange = (e) => {
    setSearch(e.target.value);
    const filteredArr = searchTermsArr.filter((term) => {
      const regex = new RegExp(e.target.value, "gi");
      return term.name.match(regex);
    });
    setFiltered(filteredArr);
  };

  //much of this code is lifted from handleClick() in submitButton.js
  //adapted slightly to fit our use case.
  const handleClickSearchResult = async (item) => {
    //activate spinner
    handleIsLoading();

    //if the item passed handleclicksearchresult is undefined, this will not run and no exception will be generated.
    //TODO decide how to handle undefined items.
    if (item) {
      sessionStorage.setItem("userDataContext", JSON.stringify(userDataContext));
      sessionStorage.setItem("apiDataContext", JSON.stringify(apiDataContext));

      //If category selected(1)
      //Make getResource call with categoryID.
      //If subCategory selected(2)
      ////Make getResource call with subCategoryID.
      //If subestCategory selected(3)
      ////Make getResource call with service name.
      if (item.categorySelected === 3) {
        obj["st"] = "s";
        obj.sn = item.name;
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
          history.push("/info");
        }
      } else if (item.categorySelected === 2) {
        obj["st"] = "sc";
        obj["sn"] = "";
		obj.catid = item.categoryID;
		
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
		  history.push("/info");
		}
		
      } else {
        obj["st"] = "c";
        obj["sn"] = "";
        obj.catid = item.categoryID;
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
		  history.push("/info");
		}
      }
    }
  };

  //call handleClickSearchResult on the first element in the filtered array when someone hits submit.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClickSearchResult(filtered[0]);
  };

  //add an event listener (containing annonymous function to clear search results element)
  // on mount and remove it when component unmounts.
  useEffect(() => {
    window.addEventListener("click", (e) => {
      setFiltered([]);
    });
    return () => {
      window.removeEventListener("click", (e) => {
        setFiltered([]);
      });
    };
  }, []);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className=" flex items-center justify-center  ml-auto"
      >
        <label htmlFor="search" className="w-full">
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
            className="color-black leading-10 w-full border border-orange-600 rounded-full rounded-r-none color-black"
            placeholder=" Search Resources"
          />
        </label>
        <button
          type="submit"
          className="border border-orange-600 rounded-full rounded-l-none border-l-0 p-2 text-orange-600 hover:bg-orange-600 hover:text-white"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>

      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyItems: "flex-start",
          backgroundColor: "#e0e0e0",
        }}
      >
        {filtered.map((item) => (
          <li
            className="cursor-pointer hover:bg-themeTeal w-full"
            onClick={() => {
              handleClickSearchResult(item);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
