import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography } from '@mui/material';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';

const MenPage = () => {

  const { isError, isLoading, products } = useProducts('/products?gender=men')


  return (
    <ShopLayout title={'TesloShop - Men Category'} pageDescription={'Encuentra los mejores productos para hombres'}>
      <Typography variant='h1' component='h1' >Hombres</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>

      {
        isLoading
         ? (<FullScreenLoading />)
         : (<ProductList products={products} />)
      }
    </ShopLayout>
  )
}

export default MenPage