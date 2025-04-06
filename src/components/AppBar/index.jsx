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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar({ mode, setMode }) {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null)
  const openMobileMenu = Boolean(mobileMenuAnchor)

  const handleMobileMenuClick = (event) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      '&::-webkit-scrollbar-track': { m: 2 },
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
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
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
        >
          <AppsIcon />
        </IconButton>
        
        {/* Apps Icon for Desktop */}
        <AppsIcon sx={{ display: { xs: 'none', md: 'block' }, color: 'white' }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} fontSize="small" inheritViewBox sx={{ color: 'white' }} />
          <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}
          >Jira</Typography>
        </Box>
        
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx = {{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' }
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>

        <Menu
          id="mobile-menu"
          anchorEl={mobileMenuAnchor}
          open={openMobileMenu}
          onClose={handleMobileMenuClose}
          MenuListProps={{
            'aria-labelledby': 'mobile-menu-button'
          }}
          PaperProps={{
            sx: {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
            }
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
            <Button
              sx = {{
                color: 'white',
                border: 'none',
                '&:hover': { border: 'none' }
              }}
              variant="outlined"
              fullWidth>
              Create
            </Button>
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          slotProps={{
            input:{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon
                  fontSize="small"
                  sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                  onClick={() => setSearchValue('')}
                />
              )
            }
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
        />
        <ModeSelect mode={mode} setMode={setMode} />

        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
