import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';

import { AuthLayout } from "../../components/layouts"
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { tesloApi } from '../../api';

import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/router';



type FormData = {
  email: string,
  password: string,
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


  const onLoginUser = async( {email, password}: FormData ) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    router.replace('/');
  }

  return (
    <AuthLayout title={"Ingresar"}>
      <form
        onSubmit={handleSubmit(onLoginUser)}
      >
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component='h1'>Iniciar Sesión</Typography>
              <Chip 
                label='No reconocemos este usuario/cotraseña' 
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex': 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant='filled'
                fullWidth
                { 
                  ...register('email', {
                    required: 'Este campo es requerido',
                    validate: validations.isEmail
                  }) 
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                type='password'
                variant='filled'
                fullWidth
                { 
                  ...register('password', {
                    required: 'Este campo es requerido',
                    minLength: { value: 6 , message: 'Minimo 6 caracteres'}
                  }) 
                }
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/register' passHref>
                <Link underline='always'>
                  ¿No tienes cuenta? Crea una
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage