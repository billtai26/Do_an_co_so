import { Fragment } from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CommentIcon from '@mui/icons-material/Comment'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const ActivityLog = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
    case 'create':
      return <AddCircleOutlineIcon color="success" />
    case 'edit':
      return <EditIcon color="primary" />
    case 'delete':
      return <DeleteOutlineIcon color="error" />
    case 'move':
      return <SwapHorizIcon color="info" />
    case 'complete':
      return <CheckCircleOutlineIcon color="success" />
    case 'comment':
      return <CommentIcon color="primary" />
    case 'vote':
      return <ThumbUpIcon color="primary" />
    default:
      return <EditIcon />
    }
  }

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + ' years ago'
    
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + ' months ago'
    
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + ' days ago'
    
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + ' hours ago'
    
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + ' minutes ago'
    
    return Math.floor(seconds) + ' seconds ago'
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Activity Log
      </Typography>
      
      <List>
        {activities.map((activity, index) => (
          <Fragment key={activity?.id}>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ mt: 1 }}>
                {getActivityIcon(activity.type)}
              </ListItemIcon>
              <ListItemText
                primary={activity.description}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {activity.user}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                    >
                      {formatTimeAgo(activity.timestamp)}
                    </Typography>
                  </Typography>
                }
              />
            </ListItem>
          </Fragment>
        ))}
        {activities.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
            No activity yet.
          </Typography>
        )}
      </List>
    </Paper>
  )
}

export default ActivityLog