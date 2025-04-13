import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index.tsx'
import { ThemeProvider } from './components/basic/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <>
        <ThemeProvider defaultTheme="dark" storageKey="landing-theme">
        <Router />
        </ThemeProvider>

  </>,
)
