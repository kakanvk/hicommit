import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { LoginProvider } from './service/LoginContext.tsx'
import { ClientUIProvider } from './service/ClientUIContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LoginProvider>
      <ClientUIProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
          <Toaster />
        </ThemeProvider>
      </ClientUIProvider>
    </LoginProvider>
  </BrowserRouter>
)
