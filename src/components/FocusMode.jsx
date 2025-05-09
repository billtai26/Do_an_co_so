import { useState } from 'react'
import {
  Box,
  Typography,
  Switch,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  FormControlLabel,
  Chip,
  IconButton,
  Collapse,
  FormGroup
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'

const FocusMode = ({ tasks = [], onToggleComplete, enabled, onToggle }) => {
  const [showCompleted, setShowCompleted] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const filteredTasks = tasks.filter(task => {
    if (!enabled) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadline = task.deadline ? new Date(task.deadline) : null
    return deadline && deadline.getTime() === today.getTime()
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by priority first
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const priorityDiff = priorityOrder[a.priority || 'low'] - priorityOrder[b.priority || 'low']
    if (priorityDiff !== 0) return priorityDiff

    // Then by deadline
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline)
    }
    return 0
  })

  const incompleteTasks = sortedTasks.filter(task => !task.completed)
  const completedTasks = sortedTasks.filter(task => task.completed)

  const getPriorityColor = (priority) => {
    switch (priority) {
    case 'high': return 'error'
    case 'medium': return 'warning'
    case 'low': return 'info'
    default: return 'default'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Focus Mode
          </Typography>
          <IconButton onClick={() => setExpanded(!expanded)} size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={enabled}
              onChange={(e) => onToggle(e.target.checked)}
              color="primary"
            />
          }
          label={enabled ? 'On' : 'Off'}
        />
      </Box>

      <Collapse in={expanded}>
        <FormGroup sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
              />
            }
            label="Show completed tasks"
          />
        </FormGroup>

        <List sx={{ width: '100%' }}>
          {incompleteTasks.map(task => (
            <ListItem
              key={task._id}
              sx={{
                bgcolor: 'background.default',
                mb: 1,
                borderRadius: 1
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task._id)}
                />
              </ListItemIcon>
              <ListItemText
                primary={task.title}
                secondary={
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    {task.priority && (
                      <Chip
                        icon={<PriorityHighIcon />}
                        label={task.priority}
                        size="small"
                        color={getPriorityColor(task.priority)}
                        sx={{ height: 20 }}
                      />
                    )}
                    {task.deadline && (
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={formatDate(task.deadline)}
                        size="small"
                        variant="outlined"
                        sx={{ height: 20 }}
                      />
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}

          {showCompleted && completedTasks.map(task => (
            <ListItem
              key={task._id}
              sx={{
                bgcolor: 'background.default',
                mb: 1,
                borderRadius: 1,
                opacity: 0.7
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task._id)}
                />
              </ListItemIcon>
              <ListItemText
                primary={task.title}
                sx={{ textDecoration: 'line-through' }}
              />
            </ListItem>
          ))}

          {sortedTasks.length === 0 && (
            <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
              {enabled ? 'No tasks due today.' : 'No tasks available.'}
            </Typography>
          )}
        </List>
      </Collapse>
    </Paper>
  )
}

export default FocusMode