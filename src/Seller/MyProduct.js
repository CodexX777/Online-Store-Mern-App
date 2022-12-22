import React, { useEffect, useState,useContext } from "react";
import ItemList from "../Shared/Items/ItemList";
import { useHttpClient } from "../Hooks/http-hook";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorModal from "../Shared/FormElements/ErrorModal";
import { AuthContext } from "../context/auth-context";



const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const auth=useContext(AuthContext);
  const { sendRequest, error, clearError, isLoading } = useHttpClient();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/myproducts/${auth.uid}`,"GET",null,{
            "Authorization":"Bearer "+auth.token
          }
        );

        setProducts(responseData);
      } catch (error) {}
    };
    fetchItems();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <div className="item-display-box">
        <ItemList items={products} sellerProd={true} />
      </div>
    </React.Fragment>
  );
};

export default MyProduct;
