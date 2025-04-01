import { Box } from '@mui/material'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profiles from './Menus/Profiles'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

function AppBar({ mode, setMode }) {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null)
  const openMobileMenu = Boolean(mobileMenuAnchor)

  const handleMobileMenuClick = (event) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Mobile Menu Button */}
        <IconButton
          size="large"
          aria-label="mobile menu"
          aria-controls="mobile-menu"
          aria-haspopup="true"
          onClick={handleMobileMenuClick}
          color="inherit"
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'primary.main' }}
        >
          <AppsIcon />
        </IconButton>
        
        {/* Apps Icon for Desktop */}
        <AppsIcon sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.main' }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} fontSize="small" inheritViewBox sx={{ color: 'primary.main' }} />
          <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}
          >Jira</Typography>
        </Box>
        
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>

        <Menu
          id="mobile-menu"
          anchorEl={mobileMenuAnchor}
          open={openMobileMenu}
          onClose={handleMobileMenuClose}
          MenuListProps={{
            'aria-labelledby': 'mobile-menu-button',
          }}
        >
          <MenuItem onClick={handleMobileMenuClose}>
            <Workspaces />
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Recent />
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Starred />
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Templates />
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button variant="outlined" fullWidth>Create</Button>
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-search" label="Search..." type="search" size="small" sx={{ minWidth: '120px' }} />
        <ModeSelect mode={mode} setMode={setMode} />

        <Tooltip title="Notifications">
          <Badge color="error" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
