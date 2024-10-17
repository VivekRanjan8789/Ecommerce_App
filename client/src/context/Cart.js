import { useState, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({children}) => {
      
     const [cart, setCart] = useState([]);

     useEffect(()=>{
        const existingCartProduct = localStorage.getItem('cart')
        if(existingCartProduct) setCart(JSON.parse(existingCartProduct))
     },[])

     return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
     )
}

export { CartProvider, CartContext };

