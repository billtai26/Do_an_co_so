import { extendTheme } from '@mui/material/styles'
import { teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  palette: {
    mode: 'light',
    primary: teal,
    secondary: teal
  }
})

export default theme