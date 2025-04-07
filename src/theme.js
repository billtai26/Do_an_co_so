import { createTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEDER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

// Create a theme instance that accepts mode as a parameter
export const getTheme = (mode) => {
  return createTheme({
    trello: {
      appBarHeight: APP_BAR_HEIGHT,
      boardBarHeight: BOARD_BAR_HEIGHT,
      boardContentHeight: BOARD_CONTENT_HEIGHT,
      columnHeaderHeight: COLUMN_HEDER_HEIGHT,
      columnFooterHeight: COLUMN_FOOTER_HEIGHT
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
            '*::-webkit-scrollbar-track': { m: 2 },
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
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.MuiTypography-body1': { fontSize: '0.875rem' }
          }
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
