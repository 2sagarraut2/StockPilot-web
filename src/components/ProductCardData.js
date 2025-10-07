import React from "react";

const ProductCardData = ({ label, name }) => {
  return (
    <span>
      <span className="text-xs">{label}</span>
      <h5 className="font-semibold">{name}</h5>
    </span>
  );
};

export default ProductCardData;
