import React from 'react';


function Product({product}) {
  return (
    <>
    
      <center>
        <h1>{product.name}</h1>
        <h3>{product.prices[0].price} cedis</h3>
        <button /*onClick={handleEdit}*/>Edit</button>
        <button /*onClick={handleDelete}*/>Delete</button>
      </center>
    </>
  );
}

export default Product;


