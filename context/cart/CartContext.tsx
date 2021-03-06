

import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { ShippingAddress } from './';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;

  //  Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (producto: ICartProduct) => void;
  removeCartProduct: (producto: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);
