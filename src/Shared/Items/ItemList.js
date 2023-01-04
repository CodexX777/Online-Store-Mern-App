import React from "react";
import Items from "./Items";
import "./ItemList.css";

const ItemList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="not-found">
        <h2>No Items found.</h2>
      </div>
    );
  }

  console.log(props);

  return (
    <div className="item-panel">
      <ul className="item-list">
        {props.items.map((item, index) => (
          <Items
            id={item._id}
            key={index}
            quantity={item.prodStock}
            name={item.prodName}
            price={item.prodPrice}
            image={item.imageUrl}
            rating={item.rating}
            uid={item.uid}
            description={item.prodDesc}
            stock={item.prodStock}
            sellerProd={props.sellerProd}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
