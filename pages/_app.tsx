import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UiProvider } from '@/context/ui';
import { EntriesProvider } from '@/context/entries';
import { ThemeProvider, CssBaseline } from '@mui/material'
import { LightTheme, DarkTheme } from "../themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UiProvider>
        <ThemeProvider theme={DarkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </EntriesProvider>
  )
}
