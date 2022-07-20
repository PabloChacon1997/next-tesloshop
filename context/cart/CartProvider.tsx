import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { CartContext, cartReducer } from './';

import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';

export interface CartState {
 cart: ICartProduct[];
}


const CART_INITIAL_STATE: CartState = {
 cart: [],
}

export const CartProvider:FC<PropsWithChildren<CartState>>= ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {

    try {
      let cookie =  Cookie.get('cart') !== undefined ?  JSON.parse(Cookie.get('cart')!) : [];
      dispatch({type:'[Cart]-Load Cart from cookies | storage',payload: cookie});
    } catch (error) {
      dispatch({type:'[Cart]-Load Cart from cookies | storage',payload: []});
    }
    
  }, [])


  useEffect(() => {
    if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart]);
 


  const addProductToCart = (product: ICartProduct) => {
    const productInCart =  state.cart.some( p => p._id === product._id );
    if (!productInCart) return dispatch({ type: '[Cart]-Updated products in cart', payload: [...state.cart ,product] });

    const productWithDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
    if (!productWithDifferentSize) return dispatch({ type: '[Cart]-Updated products in cart', payload: [...state.cart ,product] });


    // Acumular
    const updatedProducts = state.cart.map( p => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({type: '[Cart]-Updated products in cart', payload: updatedProducts});

  }

  return (
    <CartContext.Provider value={{
      ...state,

      //  Methods
      addProductToCart
    }}>
      { children }
    </CartContext.Provider>
  )
}