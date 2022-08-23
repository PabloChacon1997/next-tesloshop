import { GetServerSideProps, NextPage } from 'next';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import AirplaneTicketOutlined from '@mui/icons-material/AirplaneTicketOutlined';

import { CartList, OrdenSummary } from '../../../components/cart';
import { AdminLayout } from '../../../components/layouts';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';


interface Props {
  order: IOrder
}

const AdminOrderPage:NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <AdminLayout 
      title={'Orden'} 
      subTitle={`Ver orden: ${order._id}`} 
      icon={<AirplaneTicketOutlined />}
    >
      {
        order.isPaid ?(
          <Chip 
            sx={{ my: 2 }}
            label='Pago - Completado'
            variant='outlined'
            color='success'
            icon={<CreditScoreOutlined />}
          />
        )
          :(
            <Chip 
              sx={{ my: 2 }}
              label='Pago - Pendiente'
              variant='outlined'
              color='error'
              icon={<CreditCardOffOutlined />}
            />
          )
      }
      

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} products={ order.orderItems } />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({ order.numberOfItems }{ order.numberOfItems > 1 ? 'productos':'producto' })</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Direccion de entrega</Typography>
              </Box>

              <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
              <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${shippingAddress.address2}`: '' }</Typography>
              <Typography>{ shippingAddress.city }, { shippingAddress.seed }</Typography>
              <Typography>{ shippingAddress.country }</Typography>
              <Typography>{ shippingAddress.phone }</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Orden</Typography>
              </Box>

              <OrdenSummary order={order}/>
              <Box sx={{mt: 3}} display='flex' flexDirection='column'>
                <Box display='flex' flexDirection='column'>

                  {
                    order.isPaid ?
                      (
                        <Chip 
                          sx={{ my: 2, flex: 1 }}
                          label='Pago - Completado'
                          variant='outlined'
                          color='success'
                          icon={<CreditScoreOutlined />}
                        />
                      )
                      :
                      (
                        <Chip 
                          sx={{ my: 2, flex: 1 }}
                          label='Pago - Pendiente'
                          variant='outlined'
                          color='error'
                          icon={<CreditCardOffOutlined />}
                        />
                      )
                  }
                </Box>
                
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const { id='' } = query;

  const order = await dbOrders.getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
        permanent: false,
      }
    }
  }

  return {
    props: {
      order,
    }
  }
}

export default AdminOrderPage