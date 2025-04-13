import { useState, useEffect } from 'react'
import { 
  Modal, Box, Typography, IconButton, TextField, 
  Divider, Tabs, Tab, List, ListItem, ListItemText, 
  ListItemIcon, Checkbox, Button, Chip, Avatar,
  InputAdornment, Paper
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import AttachmentIcon from '@mui/icons-material/Attachment'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import AddIcon from '@mui/icons-material/Add'
import SendIcon from '@mui/icons-material/Send'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
}

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function TaskModal({ open, onClose, task, onTaskUpdate }) {
  const [tabValue, setTabValue] = useState(0)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [subtasks, setSubtasks] = useState([])
  const [newSubtask, setNewSubtask] = useState('')
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title || '')
      setEditedDescription(task.description || '')
      
      // Ensure subtasks have IDs
      const processedSubtasks = (task.subtasks || []).map(subtask => {
        if (typeof subtask === 'string') {
          return { id: `subtask-${Date.now()}-${Math.random()}`, text: subtask, completed: false }
        }
        return subtask.id ? subtask : { ...subtask, id: `subtask-${Date.now()}-${Math.random()}` }
      })
      setSubtasks(processedSubtasks)
      
      // Ensure comments have IDs
      const processedComments = (task.comments || []).map((comment, index) => {
        if (typeof comment === 'string') {
          return { 
            id: `comment-${Date.now()}-${index}`, 
            author: 'User', 
            text: comment, 
            timestamp: new Date().toISOString() 
          }
        }
        return comment.id ? comment : { ...comment, id: `comment-${Date.now()}-${index}` }
      })
      setComments(processedComments)
    }
  }, [task])

  if (!task) return null

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      const updatedSubtasks = [...subtasks, { id: `subtask-${Date.now()}`, text: newSubtask, completed: false }];
      setSubtasks(updatedSubtasks)
      setNewSubtask('')
      
      // Notify parent component of the update
      if (onTaskUpdate) {
        onTaskUpdate({
          ...task,
          subtasks: updatedSubtasks
        });
      }
    }
  }

  const handleSubtaskToggle = (subtaskId) => {
    const updatedSubtasks = subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
    );
    setSubtasks(updatedSubtasks);
    
    // Notify parent component of the update
    if (onTaskUpdate) {
      onTaskUpdate({
        ...task,
        subtasks: updatedSubtasks
      });
    }
  }

  const handleDeleteSubtask = (subtaskId) => {
    const updatedSubtasks = subtasks.filter(subtask => subtask.id !== subtaskId);
    setSubtasks(updatedSubtasks);
    
    // Notify parent component of the update
    if (onTaskUpdate) {
      onTaskUpdate({
        ...task,
        subtasks: updatedSubtasks
      });
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: `comment-${Date.now()}`,
        author: 'Current User',
        text: newComment,
        timestamp: new Date().toISOString()
      }
      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments)
      setNewComment('')
      
      // Notify parent component of the update
      if (onTaskUpdate) {
        onTaskUpdate({
          ...task,
          comments: updatedComments
        });
      }
    }
  }
  
  const handleSaveChanges = () => {
    // Create updated task with all changes
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
      subtasks: subtasks,
      comments: comments
    };
    
    // Notify parent component of all updates
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
    }
    
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="task-modal-title" variant="h6" component="h2">
            Task Details
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="task details tabs">
            <Tab icon={<CheckBoxOutlinedIcon />} label="Subtasks" />
            <Tab icon={<AttachmentIcon />} label="Attachments" />
            <Tab icon={<ChatBubbleOutlineIcon />} label="Comments" />
          </Tabs>
        </Box>

        {/* Subtasks Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a subtask"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
            />
            <Button 
              variant="contained" 
              onClick={handleAddSubtask}
              sx={{ ml: 1 }}
            >
              <AddIcon />
            </Button>
          </Box>
          
          <List>
            {subtasks.map((subtask) => (
              <ListItem 
                key={subtask.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSubtask(subtask.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                }
                sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={subtask.completed}
                    onChange={() => handleSubtaskToggle(subtask.id)}
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={subtask.text}
                  sx={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}
                />
              </ListItem>
            ))}
            {subtasks.length === 0 && (
              <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
                No subtasks yet. Add one above.
              </Typography>
            )}
          </List>
        </TabPanel>

        {/* Attachments Tab */}
        <TabPanel value={tabValue} index={1}>
          <Button 
            variant="outlined" 
            startIcon={<AttachmentIcon />}
            sx={{ mb: 2 }}
          >
            Add Attachment
          </Button>
          
          <List>
            {(task.attachments || []).length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
                No attachments yet.
              </Typography>
            ) : (
              (task.attachments || []).map((attachment, index) => (
                <ListItem 
                  key={`attachment-${index}`}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteOutlineIcon />
                    </IconButton>
                  }
                  sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}
                >
                  <ListItemIcon>
                    <AttachmentIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={attachment}
                    secondary="Uploaded on: date"
                  />
                </ListItem>
              ))
            )}
          </List>
        </TabPanel>

        {/* Comments Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      edge="end" 
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          
          {comments.map((comment) => (
            <Paper key={comment.id} elevation={1} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                  {comment.author?.charAt(0) || 'U'}
                </Avatar>
                <Typography variant="subtitle2">{comment.author}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {new Date(comment.timestamp).toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="body1">{comment.text}</Typography>
            </Paper>
          ))}
          
          {comments.length === 0 && (
            <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
              No comments yet. Start the conversation!
            </Typography>
          )}
        </TabPanel>

        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default TaskModal 