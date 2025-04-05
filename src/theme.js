// theme.js
import { createTheme } from '@mui/material/styles'

// Create a theme instance that accepts mode as a parameter
export const getTheme = (mode) => {
  return createTheme({
    trello: {
      appBarHeight: '58px',
      boardBarHeight: '60px'
    },
    palette: {
      mode: mode
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: '#dcdde1',
              borderRadius: '8px'
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'white'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderWidth: '0.8px',
            '&:hover': { borderWidth: '2px' }
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { fontSize: '0.875rem' }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: '0.875rem',
            '& fieldset': {
              border: 'none',
              boxShadow: '0 0 0 0.5px rgba(255, 255, 255, 0.5)'
            },
            '&:hover fieldset': {
              border: 'none',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.8)'
            },
            '&.Mui-focused fieldset': {
              border: 'none',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 1)'
            }
          }
        }
      }
    }
  })
}


// Default export (for backward compatibility)
const defaultTheme = getTheme()
export default defaultTheme
