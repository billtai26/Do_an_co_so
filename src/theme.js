import { createTheme } from '@mui/material/styles'
import { teal } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  palette: {
    mode: 'light',
    primary: teal,
    secondary: teal
  }
})

export default theme
