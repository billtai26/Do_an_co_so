/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Box, Typography, TextField, Button, Paper, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const NewBoard = () => {
  const navigate = useNavigate()
  const [boardData, setBoardData] = useState({
    title: '',
    description: '',
    background: '#f5f5f5'
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setBoardData({
      ...boardData,
      [name]: value
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!boardData.title.trim()) {
      newErrors.title = 'Board title is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Here you would typically send the data to your API
      // console.log('Creating board:', boardData)

      // For demo purposes, we'll just navigate back to the boards list
      navigate('/boards')
    }
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate('/boards')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">Create New Board</Typography>
      </Box>

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Board Title"
            name="title"
            value={boardData.title}
            onChange={handleChange}
            margin="normal"
            error={!!errors.title}
            helperText={errors.title}
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={boardData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            label="Background Color"
            name="background"
            type="color"
            value={boardData.background}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/boards')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              Create Board
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default NewBoard
