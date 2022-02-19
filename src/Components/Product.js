import React from 'react';


function Product({product}) {
  return (
    <>
    
      <center>
        <h1>{product.name}</h1>
        <h3>{product.price}</h3>
      </center>
    </>
  );
}

export default Product;


