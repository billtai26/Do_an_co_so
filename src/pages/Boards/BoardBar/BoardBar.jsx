import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import SortIcon from '@mui/icons-material/Sort'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useState } from 'react'
import { capitalizeFirstLetter } from '~/utils/formatters'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import DateRangeIcon from '@mui/icons-material/DateRange'
import LowPriorityIcon from '@mui/icons-material/LowPriority'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board, onSortChange, onFilterChange }) {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [sortAnchorEl, setSortAnchorEl] = useState(null)
  const [activeSort, setActiveSort] = useState('default')
  const [activeFilter, setActiveFilter] = useState('all')

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget)
  }

  const handleSortClose = () => {
    setSortAnchorEl(null)
  }

  const handleSortSelect = (sortType) => {
    setActiveSort(sortType)
    if (onSortChange) onSortChange(sortType)
    handleSortClose()
  }

  const handleFilterSelect = (filterType) => {
    setActiveFilter(filterType)
    if (onFilterChange) {
      if (filterType === 'all') {
        onFilterChange([])
      } else {
        onFilterChange([filterType])
      }
    }
    handleFilterClose()
  }

  const filterOpen = Boolean(filterAnchorEl)
  const sortOpen = Boolean(sortAnchorEl)

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      overflowY: 'hidden',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={{
            ...MENU_STYLES,
            bgcolor: activeFilter !== 'all' ? 'primary.100' : 'transparent'
          }}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          onClick={handleFilterClick}
        />
        <Menu
          anchorEl={filterAnchorEl}
          open={filterOpen}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem 
            onClick={() => handleFilterSelect('all')} 
            selected={activeFilter === 'all'}
          >
            <ListItemIcon>
              <FormatListBulletedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>All Tasks</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={() => handleFilterSelect('todo')} 
            selected={activeFilter === 'todo'}
          >
            <ListItemIcon>
              <CheckCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Todo</ListItemText>
          </MenuItem>
          <MenuItem 
            onClick={() => handleFilterSelect('doing')} 
            selected={activeFilter === 'doing'}
          >
            <ListItemIcon>
              <PlayCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Doing</ListItemText>
          </MenuItem>
          <MenuItem 
            onClick={() => handleFilterSelect('done')} 
            selected={activeFilter === 'done'}
          >
            <ListItemIcon>
              <CheckCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Done</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={() => handleFilterSelect('high-priority')} 
            selected={activeFilter === 'high-priority'}
          >
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>High Priority</ListItemText>
          </MenuItem>
          <MenuItem 
            onClick={() => handleFilterSelect('medium-priority')} 
            selected={activeFilter === 'medium-priority'}
          >
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Medium Priority</ListItemText>
          </MenuItem>
          <MenuItem 
            onClick={() => handleFilterSelect('low-priority')} 
            selected={activeFilter === 'low-priority'}
          >
            <ListItemIcon>
              <LowPriorityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Low Priority</ListItemText>
          </MenuItem>
        </Menu>
        <Chip
          sx={{
            ...MENU_STYLES,
            bgcolor: activeSort !== 'default' ? 'primary.100' : 'transparent'
          }}
          icon={<SortIcon />}
          label="Sort"
          clickable
          onClick={handleSortClick}
        />
        <Menu
          anchorEl={sortAnchorEl}
          open={sortOpen}
          onClose={handleSortClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem 
            onClick={() => handleSortSelect('default')}
            selected={activeSort === 'default'}
          >
            <ListItemIcon>
              <FormatListBulletedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Default</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={() => handleSortSelect('deadline-asc')}
            selected={activeSort === 'deadline-asc'}
          >
            <ListItemIcon>
              <AccessTimeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>By Deadline (Earliest)</ListItemText>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortSelect('deadline-desc')}
            selected={activeSort === 'deadline-desc'}
          >
            <ListItemIcon>
              <DateRangeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>By Deadline (Latest)</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={() => handleSortSelect('priority-desc')}
            selected={activeSort === 'priority-desc'}
          >
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>By Priority (Highest)</ListItemText>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortSelect('priority-asc')}
            selected={activeSort === 'priority-asc'}
          >
            <ListItemIcon>
              <LowPriorityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>By Priority (Lowest)</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
        <Button
          variant="outlined" 
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 36,
              height: 36,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/473448564_2069625416794085_8117495553887305624_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Mpt-3OUltsQQ7kNvwF84bA7&_nc_oc=AdlI8LY6iVOalVWap5LobSnSfXBfz9zFRLYRaCFMcBxyj-vpbkUgW2hv2qUqYnsDJPY&_nc_zt=24&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=6ap2TfTY3lGQ0NnyhzwErA&oh=00_AfFXd7tpIuEDrc7dq1IlGNUQlzMhgETmewr7w-ChyA6B0Q&oe=67F7E728" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/461432459_2606978432821588_3454035682558945814_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ap9zXCqrxF8Q7kNvgGNcM6H&_nc_oc=AdnvYbfHqaDTGmrFouDXSL6D_ows2KO1TNxg_Kav4d9o3KHj3IIeCxzLuaPewkTyNYo&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=iScz0G1NbcEEyaZQQR9uAA&oh=00_AYFzGRW20ef0bP_mMsbSHQvT_0BrLYNlcLLy8aCzNr8IsA&oe=67F325B9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/151184088_3824016630985908_1609593348639139959_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qoW6V9vI3VwQ7kNvgF_Hm5G&_nc_oc=Adk52ESJxZPIz2NPX1cxnyAm4xXIBqc3q_aJmg3xKUFVM1tqCvxwwY6rLgz83pyR_PM&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=_YdzWKyebDtClJmUrCfvxA&oh=00_AYEQM9BY1kQhdrwZrYbBq4IE-qPskzXGHAy2-gKK88HalA&oe=6814D2DD" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/481993368_3076417225848625_1391952600017220461_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EZ_jBNvmfoYQ7kNvgENmFkp&_nc_oc=AdnGtpAs58e6EW5nHZgyNBgoVbkH0lxnT9oX-6isNRbXocwBl4PHI_GAc9036jQfQr4&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=n8SnLVDKHi8acSX_d3KN6A&oh=00_AYHy1u44ZRGRPHv1po5vsPT5WV1iFjwQfpQdiGfEPzgMgw&oe=67F330E9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/448083977_2183122202023574_407376023877496326_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qmf3C46FpxAQ7kNvgF3OzBI&_nc_oc=AdmLFPfBYXDo4D1bRVdqMvU5MMKFl_exNU9EwU1R2drG9un6N2i5aKZkRmqMyp9auuw&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=Rt0KciQeYRk18F2_SaDcgQ&oh=00_AYGflJuxd3lC0fKarO2JxO_qHgCsksx4xONxFIpZDZ-7Ww&oe=67F32308" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/239462814_2349880831812471_7302002402268342362_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9yYZpTrsLr8Q7kNvgHJIV3Q&_nc_oc=AdlD04DEPzLiDJUXPZ2f1S7uSaYhL6HwoM7rwDJMNQEDn0UNZnKWQnserZk9M1qU5uE&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=_olA1okMbkEJR9s__r4vSg&oh=00_AYHycJp235urpi_-Jsjge_oNjYSnjG1HUECZoujrnXpnXw&oe=67F30D4B" />
          </Tooltip>

          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="http://bit.ly/3DPb1RW" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/461432459_2606978432821588_3454035682558945814_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ap9zXCqrxF8Q7kNvgGNcM6H&_nc_oc=AdnvYbfHqaDTGmrFouDXSL6D_ows2KO1TNxg_Kav4d9o3KHj3IIeCxzLuaPewkTyNYo&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=iScz0G1NbcEEyaZQQR9uAA&oh=00_AYFzGRW20ef0bP_mMsbSHQvT_0BrLYNlcLLy8aCzNr8IsA&oe=67F325B9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/151184088_3824016630985908_1609593348639139959_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qoW6V9vI3VwQ7kNvgF_Hm5G&_nc_oc=Adk52ESJxZPIz2NPX1cxnyAm4xXIBqc3q_aJmg3xKUFVM1tqCvxwwY6rLgz83pyR_PM&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=_YdzWKyebDtClJmUrCfvxA&oh=00_AYEQM9BY1kQhdrwZrYbBq4IE-qPskzXGHAy2-gKK88HalA&oe=6814D2DD" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/481993368_3076417225848625_1391952600017220461_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EZ_jBNvmfoYQ7kNvgENmFkp&_nc_oc=AdnGtpAs58e6EW5nHZgyNBgoVbkH0lxnT9oX-6isNRbXocwBl4PHI_GAc9036jQfQr4&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=n8SnLVDKHi8acSX_d3KN6A&oh=00_AYHy1u44ZRGRPHv1po5vsPT5WV1iFjwQfpQdiGfEPzgMgw&oe=67F330E9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/448083977_2183122202023574_407376023877496326_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qmf3C46FpxAQ7kNvgF3OzBI&_nc_oc=AdmLFPfBYXDo4D1bRVdqMvU5MMKFl_exNU9EwU1R2drG9un6N2i5aKZkRmqMyp9auuw&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=Rt0KciQeYRk18F2_SaDcgQ&oh=00_AYGflJuxd3lC0fKarO2JxO_qHgCsksx4xONxFIpZDZ-7Ww&oe=67F32308" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/239462814_2349880831812471_7302002402268342362_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9yYZpTrsLr8Q7kNvgHJIV3Q&_nc_oc=AdlD04DEPzLiDJUXPZ2f1S7uSaYhL6HwoM7rwDJMNQEDn0UNZnKWQnserZk9M1qU5uE&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=_olA1okMbkEJR9s__r4vSg&oh=00_AYHycJp235urpi_-Jsjge_oNjYSnjG1HUECZoujrnXpnXw&oe=67F30D4B" />
          </Tooltip>
          
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
