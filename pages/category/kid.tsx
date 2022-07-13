import { ShopLayout } from "../../components/layouts";
import { Typography } from '@mui/material';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from "../../components/products";
import { useProducts } from '../../hooks';




const KidPage = () => {

  const { isError, isLoading, products } = useProducts('/products?gender=kid')

  return (
    <ShopLayout title={"TesloShop - Kid Category"} pageDescription={"Encuentra los mejores productos para niños"} >
      <Typography variant='h1' component='h1' >Niños</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>


      {
        isLoading
         ? (<FullScreenLoading />)
         : (<ProductList products={products} />)
      }
    </ShopLayout>
  )
}

export default KidPage