import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Collapse
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const TaskTimeline = ({ tasks = [] }) => {
  const [expanded, setExpanded] = useState(true)

  const groupTasksByDate = () => {
    const groups = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    tasks.forEach(task => {
      if (!task.deadline) return

      const taskDate = new Date(task.deadline)
      taskDate.setHours(0, 0, 0, 0)
      const timeDiff = taskDate.getTime() - today.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

      let group
      if (daysDiff < 0) {
        group = 'Overdue'
      } else if (daysDiff === 0) {
        group = 'Today'
      } else if (daysDiff === 1) {
        group = 'Tomorrow'
      } else if (daysDiff <= 7) {
        group = 'This Week'
      } else if (daysDiff <= 30) {
        group = 'This Month'
      } else {
        group = 'Later'
      }

      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(task)
    })

    // Sort tasks within each group by priority and time
    Object.keys(groups).forEach(group => {
      groups[group].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        const priorityDiff = (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2)
        if (priorityDiff !== 0) return priorityDiff
        return new Date(a.deadline) - new Date(b.deadline)
      })
    })

    return groups
  }

  const getGroupColor = (group) => {
    switch (group) {
    case 'Overdue':
      return 'error'
    case 'Today':
      return 'warning'
    case 'Tomorrow':
      return 'info'
    case 'This Week':
      return 'success'
    default:
      return 'default'
    }
  }

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
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const groupedTasks = groupTasksByDate()
  const groups = ['Overdue', 'Today', 'Tomorrow', 'This Week', 'This Month', 'Later']

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Timeline
        </Typography>
        <IconButton onClick={() => setExpanded(!expanded)} size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        {groups.map(group => (
          groupedTasks[group]?.length > 0 && (
            <Box key={group} sx={{ mb: 3 }}>
              <Chip
                label={`${group} (${groupedTasks[group].length})`}
                color={getGroupColor(group)}
                sx={{ mb: 1 }}
              />

              <List dense>
                {groupedTasks[group].map(task => (
                  <ListItem
                    key={task._id}
                    sx={{
                      bgcolor: 'background.default',
                      mb: 0.5,
                      borderRadius: 1,
                      opacity: task.completed ? 0.7 : 1
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {task.completed && (
                            <CheckCircleIcon color="success" fontSize="small" />
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: task.completed ? 'line-through' : 'none'
                            }}
                          >
                            {task.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(task.deadline)}
                          </Typography>
                          {task.priority && (
                            <Chip
                              icon={<PriorityHighIcon />}
                              label={task.priority}
                              size="small"
                              color={getPriorityColor(task.priority)}
                              sx={{ height: 20 }}
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )
        ))}

        {Object.keys(groupedTasks).length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
            No tasks scheduled.
          </Typography>
        )}
      </Collapse>
    </Paper>
  )
}

export default TaskTimeline