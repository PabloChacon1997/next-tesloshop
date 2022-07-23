import { FC, useState } from 'react';

import NextLink from 'next/link';
import { Typography, Grid, Link, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { ItemCounter } from '../ui';
import { ICartProduct } from '../../interfaces';
import { useContext } from 'react';
import { CartContext } from '../../context';



interface Props {
  editable: boolean;
}

export const CartList: FC<Props> = ({editable = false}) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const changeQuantity = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  }

  const onHandlerDelete = (product: ICartProduct) => {
    removeCartProduct(product);
  }


  return (
    <>
      {
        cart.map(product => (
          <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug + product.size}>
            <Grid item xs={3}>
              {/* TODO: Llevar a la página del producto */}
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component='img'
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{ product.title }</Typography>
                <Typography variant='body1'>Talla <strong>{ product.size }</strong> </Typography>

                {/* Condicional */}
                {
                  editable
                  ? <ItemCounter 
                    currentValue={product.quantity}
                    updatedQuantity={(newQuantity) => changeQuantity(product, newQuantity)}
                    maxValue={10} />
                  : <Typography variant='h5'>{product.quantity} { product.quantity >1 ? 'productos': 'producto' }</Typography>
                }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{ `$${product.price}` }</Typography>
              {/* Editable */}
              {
                editable && (
                  <Button 
                    variant='text' 
                    color='secondary'
                    onClick={() => onHandlerDelete(product)}
                  >
                    Remover
                  </Button>
                )
              }
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
