import { Chip, Grid, Link, Typography } from "@mui/material"
import NextLink from 'next/link';
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { ShopLayout } from "../../components/layouts"

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
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">
            Orden {params.row.id}
          </Link>
        </NextLink>
      )
    },
  }
]

const rows = [
  { id: 1,paid: true, fullname: 'Andrés Chacón' },
  { id: 2,paid: false, fullname: 'Juan Rios' },
  { id: 3,paid: false, fullname: 'Ferando Herrera' },
  { id: 4,paid: true, fullname: 'Anna Hetchin' },
  { id: 5,paid: false, fullname: 'Johan Laporte' },
  { id: 6,paid: true, fullname: 'Tony Kroos' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title={"Historial de órdenes"} pageDescription={"Historial de órdenes de cliente"}>
      <Typography variant="h1" component='h1'>Historial de Ordenes</Typography>

      <Grid>
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

export default HistoryPage