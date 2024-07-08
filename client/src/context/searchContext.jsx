import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <SearchContext.Provider value={[searchText, setSearchText]}>
        {children}
      </SearchContext.Provider>
    </>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
