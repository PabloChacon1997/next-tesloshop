import { FC, useContext } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { CartContext } from '../../context';
import { currency } from '../../utils';
import { IOrder } from '../../interfaces';

interface Props {
  order?: IOrder
}


export const OrdenSummary: FC<Props> = ({ order }) => {
  const { numberOfItems,subTotal, total, tax } =  useContext(CartContext);
  
  const summaryValues = order ? order : { numberOfItems,subTotal, total, tax };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography> {summaryValues.numberOfItems} { summaryValues.numberOfItems > 1 ? 'productos': 'producto' } </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 })%</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt:2 }}>
        <Typography variant='subtitle1'>Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'>{currency.format(summaryValues.total)}</Typography>
      </Grid>
    </Grid>
  )
}
