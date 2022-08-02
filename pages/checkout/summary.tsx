import { CartContext } from '../../context';
import { useContext } from 'react';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import NextLink from 'next/link';
import { CartList, OrdenSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { countries } from '../../utils';



const SummaryPage = () => {

  const { shippingAddress, numberOfItems } = useContext(CartContext);

  if (!shippingAddress) return <></>;

  const { firstName, lastName, address, address2, city, country, seed, phone } = shippingAddress;

  return (
    <ShopLayout title={'Resumen de Orden'} pageDescription={'Carrito de compras dresumen de la orden'}>
      <Typography variant='h1' component='h1'>Resumen de Orden</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false}/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({ numberOfItems } { numberOfItems === 1 ? 'Producto': 'Productos' })</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography>{ firstName } { lastName }</Typography>
              <Typography>{ address }{ address2 ? `, ${address2}`: '' }</Typography>
              <Typography>{ city }, { seed }</Typography>
              <Typography>{ countries.find(c => c.code === country)?.name}</Typography>
              <Typography>{ phone }</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
              <Typography variant='subtitle1'>Orden</Typography>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <OrdenSummary />
              <Box sx={{mt: 3}}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage