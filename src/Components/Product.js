import React from 'react';
import '../App.css';


function Product({product, price, handleDelete, handleEdit}) {
  return (
    <>
      <ul className="cards">
        <li>
          <a href="" className="card">
            <img src="https://i.imgur.com/2DhmtJ4.jpg" className="card__image" alt="" />
            <div className="card__overlay">        
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
                <div className="card__header-text">
                  <h3 className="card__title">{product.name}</h3>
                  <span className="card__status">{price.price} cedis</span>
                </div>
              </div>
              <div>
                <button 
                  className="product_button" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(product.id);
                  }}
                  >Edit
                  </button>
                <button
                  className="product_button"
                  onClick={(e) => {
                    e.preventDefault();
                    {
                      handleDelete(product.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
              
            </div>
          </a>
      </li>  
    </ul>
      
    </>
  );
}

export default Product;


