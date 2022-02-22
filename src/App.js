import React, {useState, useEffect, } from 'react'
import './App.css';
import Product from './Components/Product.js';


function App() {


  const [store, setStore] = useState();
  const [productname, setProductame] = useState('');
  const [price, setPrice] = useState('');
  //const [isadd, setIsadd] = useState(True);

  useEffect( () => {
      fetch('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
      .then(
        res => res.json()
      )
      .then(
        data => {

          const records = data.products.map((item, index) => ({
            id: item.id,
            name: item.name,
            pricesIds:  item?.prices.map(item=> item.id),
          }));
        
          const prices = data.products.map((post) => post.prices);
          const flatArray = prices.flat();
        
          const state = { products: records, prices: flatArray };
          console.log('state=',state);

          setStore(state)


        }
      )
      .catch(
        err => console.log('err=',err)
      )
  },[])
  
  
  const addProduct = (e) => {
    e.preventDefault();
    
    if (productname && price) {
      
      const newPrice = {
        id: store.prices.length +1,
        price: price,
        date: new Date().getTime().toString(),
      }
      console.log('price',newPrice);
      const newProduct = {
        id: store.products.length +1,
        name: productname,
        pricesIds: [newPrice.id]
      }
      console.log('product',newProduct);

       setStore(store =>{
         return ({
        prices: [...store.prices, newPrice],
        products: [...store.products, newProduct]
      })
       })

      setProductame('');
      setPrice('');

    } else {
      console.log('empty values')
    }

  
  }
  

  

  const handleEdit = (id) => {
    const specificProduct = store.products.find((product) => product.id === id);
    console.log(specificProduct)

    const specificPrice = store.prices.find((price) => price.id === id);
    console.log(specificPrice)

    setProductame(specificProduct.name);
    setPrice(specificPrice.price)
   // const editedProduct = {...specificProduct, ...specificProduct.name: productname}
  }

  const handleDelete = (id) => {
    console.log(id);

    const filteredProducts = store.products.filter(product => product.id !== id);

    
    console.log('f',filteredProducts)

    setStore(store =>{
      return ({
     prices: [...store.prices],
     products: filteredProducts
   })
    })

    
    
    
  }

  const checkPrice = p => {

  }

  console.log(store?.prices);
  console.log(store?.products);
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
      
      
      {store && store.products?.map(product => {

        const price = store.prices?.find( price =>{
          
          return(price.id === product.pricesIds[0])
        })
        
        return(
          
          <Product 
            key={product.id} 
            product={product}
            price={price}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )
      })
      }
      
    </div>
  );
}

export default App;
