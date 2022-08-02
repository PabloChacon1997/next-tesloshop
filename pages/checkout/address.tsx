import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../context';
// import { GetServerSideProps } from 'next';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ShopLayout } from "../../components/layouts"
import { countries } from '../../utils';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  seed: string;
  city: string;
  country: string;
  phone: string;
}

const AddressPage = () => {

  const { updateAddress } = useContext(CartContext);

  const router = useRouter();


  const getAddressFromCookie = (): FormData => {
    return {
      firstName: Cookie.get('firstName') || '',
      lastName: Cookie.get('lastName') || '',
      address: Cookie.get('address') || '',
      address2: Cookie.get('address2') || '',
      seed: Cookie.get('seed') || '',
      city: Cookie.get('city') || '',
      country: Cookie.get('country') || '',
      phone: Cookie.get('phone') || '',
    }
  }
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookie()
  });


  const onSubmitAddress = (data: FormData) => {
    updateAddress(data);
    router.push('/checkout/summary');
  }

  return (
    <ShopLayout title={"Direccion"} pageDescription={"Confirmar direccion del destino"}>
      <Typography variant="h1" component='h1'>Dirección</Typography>


      <form
        onSubmit={handleSubmit(onSubmitAddress)}
      >

        <Grid container spacing={2} sx={{ mt: 2 }}>

          <Grid item xs={12} sm={6}>
            <TextField 
              label='Nombre'
              variant='filled'
              fullWidth
              { 
                ...register('firstName', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2 , message: 'Minimo 2 caracteres'}
                }) 
              }
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Apellido' 
              variant='filled'
              fullWidth 
              { 
                ...register('lastName', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2 , message: 'Minimo 2 caracteres'}
                }) 
              }
              error={!!errors.lastName}
              helperText={errors.lastName?.message}  
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Direccion' 
              variant='filled' 
              fullWidth
              { 
                ...register('address', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2 , message: 'Minimo 2 caracteres'}
                }) 
              }
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Direccion 2 (opcional)' 
              variant='filled' 
              fullWidth
              { 
                ...register('address2') 
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Ciudad' 
              variant='filled' 
              fullWidth 
              { 
                ...register('city', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2 , message: 'Minimo 2 caracteres'}
                }) 
              }
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Codigo Postal' 
              variant='filled' 
              fullWidth 
              { 
                ...register('seed', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2 , message: 'Minimo 2 caracteres'}
                }) 
              }
              error={!!errors.seed}
              helperText={errors.seed?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant='filled'
                label='Pais'
                defaultValue={ Cookie.get('country') || countries[0].code}
                { 
                  ...register('country', {
                    required: 'Este campo es requerido',
                  })
                }
                error={!!errors.seed}
              >
                {
                  countries.map( country =>(

                    <MenuItem 
                      key={country.code}
                      value={country.code}
                    >{country.name}</MenuItem>
                  ))
                }
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Telefono' 
              variant='filled' 
              fullWidth 
              { 
                ...register('phone', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2 , message: 'Minimo 2 caracteres'}
                }) 
              }
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
          <Button type='submit' color='secondary' className='circular-btn' size='large'>
            Revisar Pedido
          </Button>
        </Box>
      </form>

    </ShopLayout>
  )
}

// export const getServerSideProps:GetServerSideProps = async( { req } ) => {

//   const { token='' } = req.cookies;
//   let isValidToken = false;


//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     console.log(error);
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: '/auth/login?page=/checkout/address',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }

export default AddressPage