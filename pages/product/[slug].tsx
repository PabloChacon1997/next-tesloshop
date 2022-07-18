import { Button, Box,Chip, Grid, Typography } from "@mui/material";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";

import { ShopLayout } from "../../components/layouts"
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";

import { IProduct } from '../../interfaces';
import { dbProducts} from '../../database';


interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
  // const { query } = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${query.slug}`);

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
              <ItemCounter />
              <SizeSelector 
                // selectedSize={product.sizes[0]} 
                sizes={product.sizes} 
              />
            </Box>

            {/* Agregar al carrito */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

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