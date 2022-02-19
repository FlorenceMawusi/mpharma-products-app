import React, {useState, useEffect} from 'react'
import './App.css';
import Product from './Components/Product.js';

function App() {

  const [products, setProducts] = useState([]);

  useEffect( () => {
      fetch('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
      .then(
        res => res.json()
      )
      .then(
        data => console.log('data=',data.products)
        
      )
      .catch(
        err => console.log('err=',err)
      )
    },[])

  return (
    <div className='App'>
      <div>
        <h2>Add Product</h2>
        <label>Name</label>
        <input type='text' />
        <br/>
        <label>Price</label>
        <input type='text' />
        <br/>
        <label>Date</label>
        <input type='date' />
        <button>Add</button>
      </div>
      <Product />
    </div>
  );
}

export default App;
