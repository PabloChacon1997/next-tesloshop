import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'

import { lightTheme } from '../themes'
import { UIProvider, CartProvider, AuthProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>

      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider isLoggedIn={false}>
          <CartProvider cart={[]} numberOfItems={0} subTotal={0} tax={0} total={0} isLoaded={false}>
            <UIProvider isMenuOpen={false}>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
      
    </SessionProvider>
  )
}

export default MyApp
