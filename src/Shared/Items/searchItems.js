import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHttpClient } from "../../Hooks/http-hook";
import LoadingSpinner from "../LoadingSpinner";
import ErrorModal from "../FormElements/ErrorModal";
import ItemList from "./ItemList";

const SearchItems = () => {
  const location = useLocation();
  const { query } = location.state;
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await sendRequest(
          `http://localhost:5000/api/products/search/${query}`
        );
        setResults(res);
      } catch (error) {}
    };

    fetchSearch();
  }, [sendRequest, query]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />

      <div className="item-display-box">
        <ItemList items={results} />
      </div>
    </>
  );
};

export default SearchItems;
