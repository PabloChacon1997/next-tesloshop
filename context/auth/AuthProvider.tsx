import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import { tesloApi } from '../../api';
import Cookie from 'js-cookie';
import axios, { AxiosError } from 'axios';

export interface AuthState {
 isLoggedIn: boolean,
 user?: IUser
}


const AUTH_INITIAL_STATE: AuthState = {
 isLoggedIn: false,
 user: undefined,
}


export const AuthProvider:FC<PropsWithChildren<AuthState>>= ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);
  


  const checkToken = async () => {


    if (!Cookie.get('token')) return;

    try {
      
      // Llamar al endpoint
      const { data } = await tesloApi.get('/user/validate-token');
      const {token, user} = data;
      // Revalidar token
      Cookie.set('token', token);
      // Dispatch
      dispatch({ type: '[Auth]- Login', payload: user });
    } catch (error) {
      // Mal
      // Borrar token
      console.log(error, 'AuthProvider');
      Cookie.remove('token');
    }

  }

  const loginUser = async( email: string, password: string ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth]- Login', payload: user });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const logout = () => {
    Cookie.remove('token');
    Cookie.remove('cart');
    router.reload();
  }

  const registerUser = async (name: string ,email: string, password: string): Promise<{hasError: boolean;message?: string}> => {
    try {
      const { data } = await tesloApi.post('/user/register', {name, email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth]- Login', payload: user });
      return {
        hasError: false,
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        return {
          hasError: true,
          message: error.message
        }
      }

      return {
          hasError: true,
          message: 'No se pudo crear el usuario - intente nuevamente'
      }
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,

      //  Methods
      loginUser,
      registerUser,
      logout,
    }}>
      { children }
    </AuthContext.Provider>
  )
}