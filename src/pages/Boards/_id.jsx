import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useState, useMemo } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { teal } from '@mui/material/colors'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

function Board() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode')
    return savedMode || 'light'
  })

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const actualMode = mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode

  const theme = useMemo(
    () =>
      createTheme({
        trello: {
          appBarHeight: '58px',
          boardBarHeight: '60px'
        },
        palette: {
          mode: actualMode,
          primary: teal,
          secondary: teal
        }
      }),
    [actualMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', bgcolor: 'background.default' }}>
        <AppBar mode={mode} setMode={setMode} />
        <BoardBar />
        <BoardContent />
      </Container>
    </ThemeProvider>
  )
}

export default Board
