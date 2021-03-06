import { useState, useContext } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";

import { ShopLayout } from "../../components/layouts"
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";

import { ICartProduct, IProduct } from '../../interfaces';
import { dbProducts} from '../../database';
import { ISize } from '../../interfaces';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart';


interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });


  const selectecdSize = (size:ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const changeQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    addProductToCart(tempCartProduct);
    router.push('/cart');
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow 
            images={ product.images }
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* Titulos */}
            <Typography variant="h1" component='h1'>{product.title}</Typography>
            <Typography variant="subtitle1" component='h2'>{`$${product.price}`}</Typography>
            {/* Cantidad */}
            <Box sx={{my: 2}}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter 
                currentValue={tempCartProduct.quantity} 
                updatedQuantity={changeQuantity}  
                maxValue={product.inStock} 
              />
              <SizeSelector 
                // selectedSize={product.sizes[0]} 
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={selectecdSize}
              />
            </Box>

            {/* Agregar al carrito */}
            {
              product.inStock > 0
                ? (
                  <Button 
                    color="secondary" 
                    className="circular-btn"
                    onClick={onAddProduct}
                    disabled={!tempCartProduct.size}
                  >
                    {
                      tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    }
                  </Button>
                ): (
                  <Chip label='No hay disponibles' color="error" variant="outlined"></Chip>
                )
            }

            {/* <Chip label='No hay disponibles' color="error" variant="outlined"></Chip> */}
            {/* Description */}
            <Box sx={{mt: 3}}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{ product.description }</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


/**
 * Tarea
 * getStaticPaths
 * blockung
 * 
 * getStaticProps
 * revalidar cada 24h
 */


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductsSlugs();
  return {
    paths: productSlugs.map( ({slug}) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug='' } = params as {slug: string};
  const product = await dbProducts.getProductsBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 *24
  }
}


// export const getServerSideProps: GetServerSideProps = async ({query}) => {
//   const product = await dbProducts.getProductsBySlug(`${query.slug}`);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

export default ProductPage