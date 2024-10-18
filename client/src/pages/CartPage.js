import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { CartContext } from "../context/Cart";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { Auth, setAuth } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(20);

  // total price calculation
    useEffect(()=>{
        calculatetotalPrice();
    },[totalPrice, cart])

  const calculatetotalPrice = () => {
     let total = 0;
     cart?.map((product)=> (
        total = Number(total) + Number(product.price)
     ));
     setTotalPrice(total);
  }

   // remove product from cart
    const handleRemove = (id) => {
        let myCart = [...cart]
        const idx = myCart.findIndex((item)=> item._id == id)  // finding idx of product in array to remove the product
        myCart.splice(idx,1)
        setCart(myCart);
        localStorage.setItem('cart', JSON.stringify(myCart));
      };
  

  return (
    <Layout>
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">{`Hello ${
              Auth?.token ? Auth?.user?.name : ""
            }`}</h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    !Auth?.token ? ", Please login to checkout products" : ""
                  }`
                : `Your cart is empty`}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            {cart.map((product) => (
              <div className="row m-2 card flex-row" key={product?._id}>
                <div className="col-md-4">
                  <img
                    src={` http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    className ="card-img-top"
                    width = "200px"
                    height= "200px"
                  />
                </div>
                <div className="col-md-8 p-3">
                     <p>{product.name}</p>
                     <p>{product.description}</p>
                     <p>Price ${product.price}</p>
                     <button className="btn btn-danger" onClick={()=>{handleRemove(product._id)}}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
             <h2 >Cart Summary</h2>
             <p >Total | Checkout | Payment</p>
             <hr />
             <h4>Total: ${totalPrice} </h4>

             {
              Auth?.user?.address ?(
                <>
                  <div className="mb-3">
                      <h4>Current Address</h4>
                      <h5>{Auth?.user?.address}</h5>
                      <button className="btn btn-outline-warning" onClick={()=>{navigate('/dashboard/user/profile')}}>Update address</button>
                  </div>
                </>
              ):
              (<>
                <div className="mb-3">
                  {
                    Auth?.token ? (
                      <>
                        <button className="btn btn-outline-warning" onClick={()=>{navigate('/dashboard/user/profile')}}>Update Address</button>
                      </>
                    ) : (
                      <button className="btn btn-outline-warning" onClick={()=>{navigate('/login', {state: '/cart'})}}>Please Login To Checkout</button>
                    )
                  }
                </div>
              </>)
             }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
