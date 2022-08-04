import { GetServerSideProps } from 'next';
import { useState, useContext, useEffect } from 'react';
import { getProviders, getSession, signIn } from 'next-auth/react';

import { AuthContext } from '../../context/auth';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import { AuthLayout } from "../../components/layouts"
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';

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

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then( prov => {
      // console.log(prov);
      setProviders(prov);

    })
  }, [])
  


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


  const onLoginUser = async( {email, password}: FormData ) => {
    setShowError(false);
    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    //   return;
    // }

    // const destination = router.query.page?.toString() || '';
    // router.replace(destination);

    await signIn('credentials', { email, password });
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
              <NextLink href={router.query.page ? `/auth/register?page=${router.query.page}`:'/auth/register'} passHref>
                <Link underline='always'>
                  ¿No tienes cuenta? Crea una
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
              <Divider sx={{ width: '100%', mb: 2 }}/>

                {
                  Object.values(providers).map((provider: any) => {
                    if(provider.id==='credentials') return (<div key='credentials'></div>);
                    return (
                      <Button
                        key={provider.id}
                        variant='outlined'
                        fullWidth
                        color='primary'
                        sx={{ mb: 1 }}
                        onClick={() => signIn(provider.id)}
                      >{provider.name}</Button>
                    )
                  })
                }

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

export default LoginPage