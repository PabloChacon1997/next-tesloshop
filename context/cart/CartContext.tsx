

import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';

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

  // Orders
  createOrder: () => Promise<void>;
}

export const CartContext = createContext({} as ContextProps);
