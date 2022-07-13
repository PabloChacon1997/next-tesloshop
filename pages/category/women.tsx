import { ShopLayout } from "../../components/layouts"
import { Typography } from '@mui/material';
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from '../../components/products';

const WomenPage = () => {

  const { isError, isLoading, products } = useProducts('/products?gender=women')

  return (
    <ShopLayout title={"TesloShop - Women Category"} pageDescription={"Encuentra los mejores productos para mujeres"} >
      <Typography variant='h1' component='h1' >Mujeres</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>


      {
        isLoading
         ? (<FullScreenLoading />)
         : (<ProductList products={products} />)
      }
    </ShopLayout>
  )
}

export default WomenPage