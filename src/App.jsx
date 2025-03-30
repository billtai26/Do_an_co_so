import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect({ mode, setMode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const handleChange = (event) => {
    const newMode = event.target.value
    setMode(newMode)
    localStorage.setItem('theme-mode', newMode)
  }

  // Convert system preference to actual mode
  const actualMode = mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize="small" /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function ModeToggle({ mode, setMode }) {
  return (
    <Button
      onClick={() => {
        const newMode = mode === 'light' ? 'dark' : 'light'
        setMode(newMode)
        localStorage.setItem('theme-mode', newMode)
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode')
    return savedMode || 'light'
  })

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  
  // Convert system preference to actual mode
  const actualMode = mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode

  const theme = createTheme({
    palette: {
      mode: actualMode
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ModeSelect mode={mode} setMode={setMode} />
      <hr />
      <ModeToggle mode={mode} setMode={setMode} />
      <hr />
      <div>anhtaidev</div>

      <Typography variant="body2" color="text.secondary">Test Typography</Typography>

      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <br />
      <AccessAlarmIcon />
      <ThreeDRotation />

      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[100] }} />
    </ThemeProvider>
  )
}

export default App