import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { lightTheme } from '../themes'
import { UIProvider, CartProvider, AuthProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '' }} >
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
      </PayPalScriptProvider>
      
    </SessionProvider>
  )
}

export default MyApp
