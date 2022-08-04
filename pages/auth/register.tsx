import { useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { getSession, signIn } from 'next-auth/react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';

import { AuthLayout } from "../../components/layouts"
import NextLink from 'next/link'
import { validations } from '../../utils';

import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { AuthContext } from '../../context/auth/AuthContext';
import { useRouter } from 'next/router';


type FormData = {
  name: string,
  email: string,
  password: string,
};

const RegisterPage = () => {

  const router = useRouter();
  const { registerUser } = useContext(AuthContext);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onRegsiterForm = async({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    // const destination = router.query.page?.toString() || '';
    // router.replace(destination);

    await signIn('credentials', { email, password });
  }

  return (
    <AuthLayout title={"Registrarse"}>
      <form
        onSubmit={handleSubmit(onRegsiterForm)} 
      >
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component='h1'>Crear Cuenta</Typography>
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
                label='Nombre'
                type='text'
                variant='filled'
                fullWidth
                { 
                  ...register('name', {
                    required: 'Este campo es requerido',
                    minLength: { value: 2 , message: 'Minimo 2 caracteres'}
                  }) 
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Correo'
                type='email'
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
                Registrar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={router.query.page ? `/auth/login?page=${router.query.page}`:'/auth/login'} passHref>
                <Link underline='always'>
                  ¿Ya tienes cuenta? Ingresar
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const session = await getSession({req});

  const { page='/' } = query;

  if (session) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default RegisterPage