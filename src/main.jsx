// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { getTheme } from '~/theme' // Sửa thành import named export

// Tạo theme mặc định (light mode)
const defaultTheme = getTheme('light')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssVarsProvider theme={defaultTheme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </StrictMode>
)
