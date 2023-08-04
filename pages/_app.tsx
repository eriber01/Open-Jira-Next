import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UiProvider } from '@/context/ui';
import { EntriesProvider } from '@/context/entries';
import { ThemeProvider, CssBaseline } from '@mui/material'
import { LightTheme, DarkTheme } from "../themes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <EntriesProvider>
        <UiProvider>
          <ThemeProvider theme={DarkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </EntriesProvider>
    </>
  )
}
