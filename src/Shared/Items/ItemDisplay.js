import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import LoadingSpinner from "../LoadingSpinner";
import ErrorModal from "../FormElements/ErrorModal";
import { useHttpClient } from "../../Hooks/http-hook";

const ItemDisplay = () => {
  const [products, setProducts] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/api/products/`
        );

        setProducts(responseData);
      } catch (error) {}
    };
    fetchItems();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="item-display-box">
        <ItemList items={products} />
      </div>
    </React.Fragment>
  );
};

export default ItemDisplay;
