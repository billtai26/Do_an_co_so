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
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
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
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
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
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/473448564_2069625416794085_8117495553887305624_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=e9ImDwM5T90Q7kNvwEmYLLY&_nc_oc=Adn1U9ifGPLETuNMLlTQooT-cTNxvEoKd_KkxBb4oC2VO_imDTkZIGkO24woxYmuiNg&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=Pa_iKT8iMs_nBRd6GTnk-g&oh=00_AfGj28E5rdS-fPHz0ZEK80yUkXaRvrXtJGF6tpnAbUKw-A&oe=680A93A6" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/461432459_2606978432821588_3454035682558945814_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=QyyCPxvLV2MQ7kNvwHAnVO4&_nc_oc=AdnYjxzPkgnOy1P4PYAQSPwMqJ8m4jebbWDGR-NXI3yrhVdU7YuXU70hSs0-H5iIJVs&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=HdATcakR20Sm8dzL_vvGAA&oh=00_AfGoxQf6oApjWOKFnMWqp0rzDTqNQ7_vpJfAU2gQ8jkxbQ&oe=68091EB9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/481993368_3076417225848625_1391952600017220461_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=RWQAvQ7OGMAQ7kNvwHtw6_I&_nc_oc=AdmTGuwQ_DNQkRZNS5gUyExtiDEuuiiuPglwOihrahTrMqiqf_TDXLUc4oLpQwiLgkI&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=rOUwaM3ep--al4ZcQx_9pA&oh=00_AfHNVmny8aX7P0DqHMBTXcAi5zugQIp48uP9iuLbrfQkyw&oe=6808F1A9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/151184088_3824016630985908_1609593348639139959_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=sjJ_Vk6599UQ7kNvwHD9zl9&_nc_oc=AdnWrCbe8948iW8NrgbsbP3zwJf5b3zubiqMfzsH5bc8D7ltgLQ8bLhPeVR-Yhp3j3g&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=Tr-LXmke6M-OexzDsEYoJg&oh=00_AfH4EjHDtO53myHLIXcPCLqHqh4u82DJNubiBFaURem_zQ&oe=682A939D" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/448083977_2183122202023574_407376023877496326_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=1rDiMWInvVMQ7kNvwEzscFI&_nc_oc=AdnmM9AEvvUecCad0khT1UV1avI7GnvDVCfcY8zoCbTXNn27vyMk1T20xlOJ1UjW6tI&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=adnmnVuworKVAzv8-LerjQ&oh=00_AfHQ-fIy-qvk2snGToHIdVtmMpkld99IcLD1HRv5mGixlA&oe=68091C08" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/239462814_2349880831812471_7302002402268342362_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=e3cuAfkehIQQ7kNvwH0IJuY&_nc_oc=Adkbzv862Dksl7HXqOAosseLxLz_iTsMCzbSVB8lmvFSZBLAY7VPohKVhWtIkv5O7yI&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=jIsiQJttScuMHzXKT-_ehQ&oh=00_AfEpZJNxX3STBAyiXAkbAU1IZeqTfcKO5zJZk0MJx1AfPA&oe=6809064B" />
          </Tooltip>

          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/473448564_2069625416794085_8117495553887305624_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Mpt-3OUltsQQ7kNvwF84bA7&_nc_oc=AdlI8LY6iVOalVWap5LobSnSfXBfz9zFRLYRaCFMcBxyj-vpbkUgW2hv2qUqYnsDJPY&_nc_zt=24&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=6ap2TfTY3lGQ0NnyhzwErA&oh=00_AfFXd7tpIuEDrc7dq1IlGNUQlzMhgETmewr7w-ChyA6B0Q&oe=67F7E728" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/457561003_540150391881880_1395814564666247754_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=p9E6boRiiNQQ7kNvwFQi8Kr&_nc_oc=Adnifz-gBh3V1fqEgZdzKU0cfHUEzZDSGIlmBFuzu3iIkXi9prayMn5HpBc8-vk7yHE&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=2QuGhMBsSZ9JHNiGu3midQ&oh=00_AfGiYy2JNGcdmqCsrVtXp6zB1f0balAHq7L7XzqCivP3sA&oe=68090703" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
