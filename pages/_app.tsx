import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { Provider } from 'react-redux';
import { store } from '../redux/store';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserProvider supabaseClient={supabaseClient}>
        <Component  {...pageProps} />
      </UserProvider>
    </Provider>
  )
}

export default MyApp
