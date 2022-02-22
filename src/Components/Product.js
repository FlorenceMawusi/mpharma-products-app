import React from 'react';


function Product({product, price, handleDelete, handleEdit}) {
  return (
    <>
    
      <center>
        <h1>{product.name}</h1>
        <h3>{price.price} cedis</h3>
        <button onClick={() => handleEdit(product.id)}>Edit</button>
        <button onClick={() => handleDelete(product.id)}>Delete</button>
      </center>
    </>
  );
}

export default Product;


