import React, {useState, useEffect, } from 'react'
import './App.css';
import Product from './Components/Product.js';
import normalize from 'json-api-normalizer';

function App() {

  const [products, setProducts] = useState([]);
  useEffect( () => {
      fetch('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
      .then(
        res => res.json()
      )
      .then(
        data => {
          console.log('data=',data.products)
          console.log('normalized data =', normalize(data))
          setProducts(data.products)
        })
      .catch(
        err => console.log('err=',err)
      )
    },[])

  
  const [productname, setProductame] = useState('');
  const [price, setPrice] = useState('');

  const addProduct = (e) => {
    e.preventDefault();
    if (productname && price) {
      const newProduct = {
        id : new Date().getTime().toString(),
        name: productname,
        prices: [{id: 0,
                  date: new Date().getTime().toString(),
                  price: price,
          }]

      }
      setProducts(products => {
        return[...products, newProduct];
      })

      setProductame('');
      setPrice('');

    }

  
  }
  

  

  const handleEdit = () => {

  }

  const handleDelete = () => {

  }

  return (
    <div className='App'>
      <h2>Add Product</h2>
      <form onSubmit={addProduct}>
        <div>
          <input 
            placeholder='Name' 
            type='text'
            value={productname}
            onChange={e => setProductame(e.target.value)}
          />
          
        </div>
        <div>  
          <input 
            placeholder='Price' 
            type='text'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          
        </div>
        
        <button type='submit'>Add</button>
        
      </form>
      
      
      {products.map( product => {
        return(
          <Product key={product.id} 
          product={product} 
          handleEdit={handleEdit}
          handleDelete={handleDelete}/>
        )
      })
      }
      
    </div>
  );
}

export default App;
