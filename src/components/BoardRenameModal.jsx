import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'

const BoardRenameModal = ({ open, onClose, board, onRename }) => {
  const [boardTitle, setBoardTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (board) {
      setBoardTitle(board.title || '')
    }
  }, [board])

  const handleChange = (e) => {
    setBoardTitle(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = () => {
    if (!boardTitle.trim()) {
      setError('Board title is required')
      return
    }

    onRename(boardTitle.trim())
    onClose()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !error && boardTitle.trim()) {
      handleSubmit()
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>Rename Board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Board Title"
          fullWidth
          value={boardTitle}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          error={!!error}
          helperText={error}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={!boardTitle.trim()}
        >
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BoardRenameModal 