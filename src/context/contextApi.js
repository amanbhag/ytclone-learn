import React, { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoryData(selectedCategory);
  }, [selectedCategory]);

  const fetchSelectedCategoryData = async (query) => {
    setLoading(true);
    try {
      const { contents } = await fetchDataFromApi(`search/?q=${query}`);
      console.log("contents: ", contents);
      setSearchResults(contents);
      console.log("searchResults: ", searchResults);

      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
    // fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
    //   console.log("contents: ", contents.length);
    //   setSearchResults(contents);
    //   console.log("SearchResults: ", searchResults);
    // }
    // );
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        selectedCategory,
        setSelectedCategory,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
