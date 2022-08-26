import { FC, useContext } from 'react';

import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import { ItemCounter } from '../ui';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { CartContext } from '../../context';



interface Props {
  editable: boolean;
  products?: IOrderItem[]
}

export const CartList: FC<Props> = ({editable = false, products}) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const changeQuantity = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  }

  const onHandlerDelete = (product: ICartProduct) => {
    removeCartProduct(product);
  }

  const productsToShow = products ? products: cart;


  return (
    <>
      {
        productsToShow.map(product => (
          <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug + product.size}>
            <Grid item xs={3}>
              {/* TODO: Llevar a la página del producto */}
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={product.image }
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
                    updatedQuantity={(newQuantity) => changeQuantity(product as ICartProduct, newQuantity)}
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
                    onClick={() => onHandlerDelete(product as ICartProduct)}
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
