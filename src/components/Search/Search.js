import React, { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ setSearchValue }) => {
  const [query, setQuery] = useState("");

  const valueChangedHandler = ({ target: { value } }) => {
    if (!value) {
      setSearchValue("");
    }
    setQuery(value);
  };

  const keyPressedHandler = async ({ key }) => {
    if (key === "Enter") {
      setSearchValue(query);
    }
  };

  return (
    <input
      type="text"
      className={styles.searchInput}
      value={query}
      placeholder="Search Movies - Press Enter"
      onChange={(e) => valueChangedHandler(e)}
      onKeyPress={(e) => keyPressedHandler(e)}
    />
  );
};

export default Search;
