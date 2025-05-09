import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'

const PersonalNotes = ({ boardId, userId }) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    // In a real app, fetch notes from backend
    const storedNotes = localStorage.getItem(`notes-${boardId}-${userId}`)
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [boardId, userId])

  const saveNotesToStorage = (updatedNotes) => {
    localStorage.setItem(`notes-${boardId}-${userId}`, JSON.stringify(updatedNotes))
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [
        ...notes,
        {
          id: Date.now(),
          text: newNote.trim(),
          createdAt: new Date().toISOString()
        }
      ]
      setNotes(updatedNotes)
      saveNotesToStorage(updatedNotes)
      setNewNote('')
    }
  }

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId)
    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
  }

  const startEditing = (note) => {
    setEditingNote(note.id)
    setEditText(note.text)
  }

  const handleSaveEdit = () => {
    if (editText.trim()) {
      const updatedNotes = notes.map(note =>
        note.id === editingNote
          ? { ...note, text: editText.trim(), updatedAt: new Date().toISOString() }
          : note
      )
      setNotes(updatedNotes)
      saveNotesToStorage(updatedNotes)
      setEditingNote(null)
      setEditText('')
    }
  }

  const handleCancelEdit = () => {
    setEditingNote(null)
    setEditText('')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Personal Notes
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
        />
        <Button
          variant="contained"
          onClick={handleAddNote}
          disabled={!newNote.trim()}
        >
          Add
        </Button>
      </Box>

      <List>
        {notes.map(note => (
          <ListItem
            key={note.id}
            sx={{
              bgcolor: 'background.default',
              mb: 1,
              borderRadius: 1,
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            {editingNote === note.id ? (
              <Box sx={{ width: '100%', display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                  autoFocus
                />
                <IconButton color="primary" onClick={handleSaveEdit}>
                  <SaveIcon />
                </IconButton>
                <IconButton color="error" onClick={handleCancelEdit}>
                  <CancelIcon />
                </IconButton>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={note.text}
                  secondary={`Created: ${formatDate(note.createdAt)}${
                    note.updatedAt ? ` • Updated: ${formatDate(note.updatedAt)}` : ''
                  }`}
                  sx={{ pr: 6 }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => startEditing(note)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
        {notes.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
            No personal notes yet. Add one above.
          </Typography>
        )}
      </List>
    </Paper>
  )
}

export default PersonalNotes