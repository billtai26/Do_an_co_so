import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect'

function AppBar({ mode, setMode }) {
  return (
    <Box sx={{
      backgroundColor: 'primary.light',
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}>
      <ModeSelect mode={mode} setMode={setMode} />
    </Box>
  )
}

export default AppBar
