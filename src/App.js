import React, { useState, useEffect, } from 'react'
import './App.css';
import Product from './Components/Product.js';

const LOCAL_STORAGE_KEY = 'store_products';

function App() {


  const [store, setStore] = useState();
  const [productname, setProductame] = useState('');
  const [price, setPrice] = useState('');
  const [productId, setProductId] = useState(null);
  const [isAdd, setIsAdd] = useState(true);

  
  useEffect( () => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store))
    
  }, [store])

  useEffect(() => {
    fetch('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
      .then(
        res => res.json()
      )
      .then(
        data => {

          const records = data.products.map((item, index) => ({
            id: item.id,
            name: item.name,
            pricesIds: item?.prices.map(item => item.id),
          }));

          const prices = data.products.map((post) => post.prices);
          const flatArray = prices.flat();

          const state = { products: records, prices: flatArray };
          console.log('state=', state);

          // const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);

          // console.log('localstorage=',storedProducts );

          setStore(state)
          //storedProducts?setStore(storedProducts):
          // if (storedProducts) {
          //   setStore(state)
          // } else{
          //   setStore(storedProducts)
          // }
          


        }
      )
      .catch(
        err => console.log('err=', err)
      )
  }, [])


  const addEditProduct = (e) => {
    e.preventDefault();

    if (productname && price) {

      if (productId == null) {
        const newPrice = {
          id: store.prices.length + 1,
          price: parseInt(price),
          date: new Date().toISOString(),
        }
        console.log('price', newPrice);
        const newProduct = {
          id: store.products.length + 1,
          name: productname,
          pricesIds: [newPrice.id]
        }
        console.log('product', newProduct);

        setStore(store => {
          return ({
            prices: [...store.prices, newPrice],
            products: [newProduct,...store.products]
          })
        })
      } else {
        const oldProductIndex = store.products.findIndex(
          each => productId === each.id);

        const oldPriceIndex = store.prices.findIndex(
          each => store.products[oldProductIndex].pricesIds[0] === each.id);

        setStore(store => {

          if(store.prices[oldPriceIndex].price !== price){
            console.log('old=',store.prices[oldPriceIndex],'new=',price)
            const newPrice = {
              id: store.prices.length + 1,
              price: parseInt(price),
              date: new Date().toISOString(),
            }
            store.prices.push(newPrice);
            store.products[oldProductIndex].pricesIds.unshift(newPrice.id)
          }
          store.products[oldProductIndex] = {...store.products[oldProductIndex], name:productname}
          return (
            {
              products: store.products,
              prices: store.prices
            }
          )
        })
        
      }
      setProductame('');
      setPrice('');
      setProductId(null)
      setIsAdd(true)

    } else {
      console.log('empty values')
    }


  }




  const handleEdit = (id) => {
    
    
    const specificProduct = store.products.find((product) => product.id === id);
    console.log(specificProduct)

    const specificPrice = store.prices.find((price) => price.id === specificProduct.pricesIds[0]);
    console.log(specificPrice)

    setIsAdd(false)
    setProductId(specificProduct.id)
    setProductame(specificProduct.name);
    setPrice(specificPrice.price)


    // const editedProduct = {...specificProduct, ...specificProduct.name: productname}
  }

  const handleDelete = (id) => {
    console.log(id);

    const filteredProducts = store.products.filter(product => product.id !== id);


    console.log('f', filteredProducts)

    setStore(store => {
      return ({
        prices: [...store.prices],
        products: filteredProducts
      })
    })




  }

  const cancel = e => {
    e.preventDefault();
    setProductame('');
    setPrice('');
    setProductId(null)
    setIsAdd(true)

  }

  console.log(store?.prices);
  console.log(store?.products);
  return (
    <div>



      <div className="pageTitle title">
        {isAdd?
          <p>Add Product</p>:

          <p>Edit Product</p>
        } 
      </div>
      <form onSubmit={addEditProduct}>
        <div>
          <input
            placeholder='Name'
            type='text'
            className="name formEntry"
            value={productname}
            onChange={e => setProductame(e.target.value)}
          />

        </div>
        <div>
          <input
            placeholder='Price'
            type='text'
            className="name formEntry"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

        </div>

        {isAdd ?
          <button className="submit formEntry" type='submit'>Add</button> :
          <button className="submit formEntry" type='submit'>Save</button>
        }
        <button className="submit formEntry" onClick={cancel}type='button'>Cancel</button>
      </form>

      <ul className="cards">
      {store && store.products?.map(product => {

        const price = store.prices?.find(price => {

          return (price.id === product.pricesIds[0])
        })

        return (

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
      </ul>

    </div>
  );
}

export default App;
