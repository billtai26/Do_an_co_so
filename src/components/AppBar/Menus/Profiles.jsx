import React from 'react'
import { Box } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    handleClose()
    navigate('/profile')
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar 
            sx={{ width: 36, height: 36 }}
            alt="Avatar"
            src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/473448564_2069625416794085_8117495553887305624_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=e9ImDwM5T90Q7kNvwEmYLLY&_nc_oc=Adn1U9ifGPLETuNMLlTQooT-cTNxvEoKd_KkxBb4oC2VO_imDTkZIGkO24woxYmuiNg&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=Pa_iKT8iMs_nBRd6GTnk-g&oh=00_AfGj28E5rdS-fPHz0ZEK80yUkXaRvrXtJGF6tpnAbUKw-A&oe=680A93A6"
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Avatar sx={{ width: 30, height: 30, mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 30, height: 30, mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
