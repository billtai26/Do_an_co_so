import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  Collapse
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const BoardMembers = ({ members = [], onAddMember, onUpdateMember, onRemoveMember, currentUserIsAdmin }) => {
  const [expanded, setExpanded] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editMember, setEditMember] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'member'
  })
  
  const roles = {
    admin: { label: 'Admin', color: 'error' },
    moderator: { label: 'Moderator', color: 'warning' },
    member: { label: 'Member', color: 'primary' }
  }

  const handleOpenDialog = (member = null) => {
    if (member) {
      setEditMember(member)
      setFormData({
        name: member.name,
        email: member.email,
        role: member.role
      })
    } else {
      setEditMember(null)
      setFormData({
        name: '',
        email: '',
        role: 'member'
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditMember(null)
    setFormData({
      name: '',
      email: '',
      role: 'member'
    })
  }

  const handleSubmit = () => {
    if (formData.name.trim() && formData.email.trim()) {
      if (editMember) {
        onUpdateMember(editMember.id, formData)
      } else {
        onAddMember({
          id: Date.now().toString(),
          ...formData
        })
      }
      handleCloseDialog()
    }
  }

  const handleRemoveMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      onRemoveMember(memberId)
    }
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mr: 1 }}>
            Board Members
          </Typography>
          <IconButton onClick={() => setExpanded(!expanded)} size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {currentUserIsAdmin && (
          <Button
            startIcon={<PersonAddIcon />}
            size="small"
            onClick={() => handleOpenDialog()}
          >
            Add
          </Button>
        )}
      </Box>

      <Collapse in={expanded}>
        <List>
          {members.map(member => (
            <ListItem
              key={member.id}
              sx={{
                bgcolor: 'background.default',
                mb: 1,
                borderRadius: 1
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: member.color || 'primary.main' }}>
                  {getInitials(member.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {member.name}
                    <Chip
                      label={roles[member.role]?.label || member.role}
                      color={roles[member.role]?.color || 'default'}
                      size="small"
                    />
                  </Box>
                }
                secondary={member.email}
              />
              {currentUserIsAdmin && (
                <ListItemSecondaryAction>
                  <Tooltip title="Edit member">
                    <IconButton
                      edge="end"
                      onClick={() => handleOpenDialog(member)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove member">
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
          {members.length === 0 && (
            <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
              No members yet.
            </Typography>
          )}
        </List>
      </Collapse>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editMember ? 'Edit Member' : 'Add New Member'}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              label="Role"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              {Object.entries(roles).map(([value, { label }]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMember ? 'Save Changes' : 'Add Member'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default BoardMembers