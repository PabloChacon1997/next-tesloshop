import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import NextLink from 'next/link';

import { CartList, OrdenSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';


const OrderPage = () => {
  return (
<ShopLayout title={'Resumen de la orden: 1'} pageDescription={'Resumen de la orden'}>
      <Typography variant='h1' component='h1'>Orden: ABC123</Typography>

      {/* <Chip 
        sx={{ my: 2 }}
        label='Pago - Pendiente'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip 
        sx={{ my: 2 }}
        label='Pago - Completado'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false}/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                <NextLink href='/checkput/address' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography>Andrés Chacón</Typography>
              <Typography>PANA NORTE- ESC CEDEÑO</Typography>
              <Typography>Cuenca, EC 456</Typography>
              <Typography>Ecuador</Typography>
              <Typography>+593 985679670</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
              <Typography variant='subtitle1'>Orden</Typography>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <OrdenSummary />
              <Box sx={{mt: 3}}>
                {/* TODO: Metodo de pago */}
                <h1>Pagar</h1>
                <Chip 
                  sx={{ my: 2 }}
                  label='Pago - Completado'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage