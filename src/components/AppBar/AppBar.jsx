import { Box } from '@mui/material'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
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
import FilterListIcon from '@mui/icons-material/FilterList'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import LowPriorityIcon from '@mui/icons-material/LowPriority'
import TodayIcon from '@mui/icons-material/Today'
import DateRangeIcon from '@mui/icons-material/DateRange'
import Popover from '@mui/material/Popover'
import Chip from '@mui/material/Chip'

function AppBar({ mode, setMode, onSearch, onFilterChange }) {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [activeFilters, setActiveFilters] = useState([])
  const openMobileMenu = Boolean(mobileMenuAnchor)
  const openFilter = Boolean(filterAnchorEl)

  const handleMobileMenuClick = (event) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleFilterToggle = (filterType) => {
    setActiveFilters(prev => {
      const isAlreadyActive = prev.includes(filterType)
      const newFilters = isAlreadyActive
        ? prev.filter(filter => filter !== filterType)
        : [...prev, filterType]

      if (onFilterChange) {
        onFilterChange(newFilters)
      }
      return newFilters
    })
  }

  const handleRemoveFilter = (filterType) => {
    setActiveFilters(prev => {
      const newFilters = prev.filter(filter => filter !== filterType)
      if (onFilterChange) {
        onFilterChange(newFilters)
      }
      return newFilters
    })
  }

  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const clearSearch = () => {
    setSearchValue('')
    if (onSearch) {
      onSearch('')
    }
  }

  const getFilterLabel = (filter) => {
    switch (filter) {
    case 'todo': return 'Todo'
    case 'doing': return 'Doing'
    case 'done': return 'Done'
    case 'high-priority': return 'High Priority'
    case 'medium-priority': return 'Medium Priority'
    case 'low-priority': return 'Low Priority'
    case 'due-today': return 'Due Today'
    case 'due-this-week': return 'Due This Week'
    default: return filter
    }
  }

  const getFilterIcon = (filter) => {
    switch (filter) {
    case 'todo': return <CheckCircleOutlineIcon fontSize="small" />
    case 'doing': return <PlayCircleOutlineIcon fontSize="small" />
    case 'done': return <CheckCircleOutlineIcon fontSize="small" />
    case 'high-priority': return <PriorityHighIcon fontSize="small" />
    case 'medium-priority': return <PriorityHighIcon fontSize="small" />
    case 'low-priority': return <LowPriorityIcon fontSize="small" />
    case 'due-today': return <TodayIcon fontSize="small" />
    case 'due-this-week': return <DateRangeIcon fontSize="small" />
    default: return <FilterListIcon fontSize="small" />
    }
  }

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
        <Box sx={{ position: 'relative' }}>
          <TextField
            id="outlined-search"
            placeholder="Search tasks..."
            type="text"
            size="small"
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchValue && (
                    <IconButton
                      edge="end"
                      onClick={clearSearch}
                      sx={{ color: 'white', p: 0.5 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    onClick={handleFilterClick}
                    sx={{
                      color: 'white',
                      p: 0.5,
                      bgcolor: activeFilters.length > 0 ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                    }}
                  >
                    <FilterListIcon fontSize="small" />
                    {activeFilters.length > 0 && (
                      <Badge
                        badgeContent={activeFilters.length}
                        color="error"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              minWidth: '200px',
              maxWidth: '300px',
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

          <Popover
            id="filter-popover"
            open={openFilter}
            anchorEl={filterAnchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <Box sx={{ p: 2, width: 300 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Filter Tasks</Typography>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Status</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <MenuItem
                  onClick={() => handleFilterToggle('todo')}
                  selected={activeFilters.includes('todo')}
                  dense
                >
                  <ListItemIcon>
                    <CheckCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Todo</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilterToggle('doing')}
                  selected={activeFilters.includes('doing')}
                  dense
                >
                  <ListItemIcon>
                    <PlayCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Doing</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilterToggle('done')}
                  selected={activeFilters.includes('done')}
                  dense
                >
                  <ListItemIcon>
                    <CheckCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Done</ListItemText>
                </MenuItem>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" sx={{ mb: 1 }}>Priority</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <MenuItem
                  onClick={() => handleFilterToggle('high-priority')}
                  selected={activeFilters.includes('high-priority')}
                  dense
                >
                  <ListItemIcon>
                    <PriorityHighIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText>High</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilterToggle('medium-priority')}
                  selected={activeFilters.includes('medium-priority')}
                  dense
                >
                  <ListItemIcon>
                    <PriorityHighIcon fontSize="small" color="warning" />
                  </ListItemIcon>
                  <ListItemText>Medium</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilterToggle('low-priority')}
                  selected={activeFilters.includes('low-priority')}
                  dense
                >
                  <ListItemIcon>
                    <LowPriorityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Low</ListItemText>
                </MenuItem>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" sx={{ mb: 1 }}>Due Date</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <MenuItem
                  onClick={() => handleFilterToggle('due-today')}
                  selected={activeFilters.includes('due-today')}
                  dense
                >
                  <ListItemIcon>
                    <TodayIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Today</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilterToggle('due-this-week')}
                  selected={activeFilters.includes('due-this-week')}
                  dense
                >
                  <ListItemIcon>
                    <DateRangeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>This Week</ListItemText>
                </MenuItem>
              </Box>

              {activeFilters.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setActiveFilters([])
                      if (onFilterChange) onFilterChange([])
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Box>
              )}
            </Box>
          </Popover>
        </Box>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <Box sx={{
            display: { xs: 'none', sm: 'flex' },
            gap: 0.5,
            flexWrap: 'wrap',
            maxWidth: 300
          }}>
            {activeFilters.map(filter => (
              <Chip
                key={filter}
                label={getFilterLabel(filter)}
                size="small"
                icon={getFilterIcon(filter)}
                onDelete={() => handleRemoveFilter(filter)}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  '.MuiChip-deleteIcon': { color: 'white' },
                  '.MuiChip-icon': { color: 'white' }
                }}
              />
            ))}
          </Box>
        )}

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
