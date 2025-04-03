import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index.tsx'
import { ThemeProvider } from './components/basic/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="landing-theme">
        <Router />
        </ThemeProvider>

  </StrictMode>,
)
