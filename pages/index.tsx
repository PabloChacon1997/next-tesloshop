import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';
import { useProducts } from '../hooks';



const HomePage: NextPage = () => {



  const { products, isLoading, isError } = useProducts('/products')

  return (
    <ShopLayout title='TesloShop - Home' pageDescription='Encuentra los mejores productos de TesloShop'>
      <Typography variant='h1' component='h1' >Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>
      {
        isLoading
          ? ( <FullScreenLoading /> )
          : ( <ProductList products={products}/> )
      }
      
    </ShopLayout>
  )
}

export default HomePage
