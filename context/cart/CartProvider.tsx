import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { CartContext, cartReducer } from './';

import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  seed: string;
  city: string;
  country: string;
  phone: string;
}


const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,

  shippingAddress: undefined,
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
    if(Cookie.get('firstName')) {
      let cookieAddress: ShippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        seed: Cookie.get('seed') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
      } 
      dispatch({ type: '[Cart]-LoadAddress from cookie', payload: cookieAddress });
    }
  }, []);
  


  useEffect(() => {
    if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart]);
 

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev,0);
    const subTotal = state.cart.reduce((prev, current) => (current.quantity* current.price) + prev,0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);


    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }

    dispatch({type: '[Cart]-Update order summary', payload: orderSummary});
  }, [state.cart])
  

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart]-Change product quantity', payload: product })
  }


  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart]-Remove product in cart', payload: product })
  }

  const updateAddress = (address: ShippingAddress) => {
    dispatch({ type: '[Cart]-UpdatedAddress from cookie', payload: address });
  }

  return (
    <CartContext.Provider value={{
      ...state,

      //  Methods
      addProductToCart,
      updateCartQuantity,
      removeCartProduct,
      updateAddress,
    }}>
      { children }
    </CartContext.Provider>
  )
}