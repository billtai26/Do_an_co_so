/* eslint-disable no-unused-vars */
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { getTheme } from '~/theme' // Sửa thành import named export

// Cấu hình react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

// Tạo theme mặc định (light mode)
const defaultTheme = getTheme('light')

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <CssVarsProvider theme={defaultTheme}>
    <ConfirmProvider defaultOptions={{
      allowClose: false,
      dialogProps: { maxWidth: 'xs' },
      buttonOrder: ['confirm', 'cancel'],
      cancellationButtonProps: { color: 'inherit' },
      confirmationButtonProps: { color: 'secondary', variant: 'outlined' }
    }}>
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-left" theme="colored" />
    </ConfirmProvider>
  </CssVarsProvider>
  // </StrictMode>
)
