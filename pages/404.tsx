import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ShopLayout } from '../components/layouts/ShopLayout';

const Custom404 = () => {
  return (
    <ShopLayout title={'Page Not Found'} pageDescription={'No hay nada que mostrar aqui'}>
      <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh-200px)' 
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
        <Typography marginLeft={2}>No encontramos ninguna pagina en este link</Typography>
      </Box>
    </ShopLayout>
  )
}

export default Custom404