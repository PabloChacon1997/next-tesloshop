import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { ShopLayout } from "../../components/layouts"
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
  {field: 'id',headerName: 'ID',width: 100},
  {field: 'fullname',headerName: 'Nombre completo',width: 300},

  {
    field: 'paid',
    headerName: 'Pagado',
    description: 'Muestra si la orden fue pagada o no',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return (
        params.row.paid
          ? <Chip color="success" label='Pagada' variant="outlined"/>
          : <Chip color="error" label='No pagada' variant="outlined"/>
      )
    }
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">
            Orden {params.row.id}
          </Link>
        </NextLink>
      )
    },
  }
]

interface Props {
  orders: IOrder[],
}

const HistoryPage:NextPage<Props> = ({ orders }) => {
  
  const rows = orders.map( (order, index) => (
    { 
      id: index + 1,
      paid: order.isPaid,
      fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      orderId: order._id
    }
  ));


  return (
    <ShopLayout title={"Historial de órdenes"} pageDescription={"Historial de órdenes de cliente"}>
      <Typography variant="h1" component='h1'>Historial de Ordenes</Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session:any = await getSession({req});
  if(!session) {
    return {
      redirect: {
        destination: '/auth/login?page=/orders/history',
        permanent: false,
      }
    }
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    }
  }
}

export default HistoryPage