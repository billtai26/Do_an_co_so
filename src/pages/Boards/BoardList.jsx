/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const BoardList = () => {
  const navigate = useNavigate()
  const [boards, setBoards] = useState([
    { id: '1', title: 'Project Alpha', description: 'Main project board' },
    { id: '2', title: 'Personal Tasks', description: 'Personal to-do list' },
    { id: '3', title: 'Team Sprint', description: 'Current sprint tasks' }
  ])

  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [currentBoard, setCurrentBoard] = useState(null)
  const [newBoardData, setNewBoardData] = useState({ title: '', description: '' })

  const handleCreateBoard = () => {
    const newBoard = {
      id: Date.now().toString(),
      title: newBoardData.title,
      description: newBoardData.description
    }
    setBoards([...boards, newBoard])
    setNewBoardData({ title: '', description: '' })
    setOpenCreateDialog(false)
  }

  const handleEditBoard = () => {
    setBoards(boards.map(board =>
      board.id === currentBoard.id ? { ...board, ...newBoardData } : board
    ))
    setOpenEditDialog(false)
  }

  const handleDeleteBoard = () => {
    setBoards(boards.filter(board => board.id !== currentBoard.id))
    setOpenDeleteDialog(false)
  }

  const openBoard = (boardId) => {
    navigate(`/board/${boardId}`)
  }

  return (
    <Box sx={{ p: 4, bgcolor: '#90caf9', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">My Boards</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Board
        </Button>
      </Box>

      <Grid container spacing={3}>
        {boards.map(board => (
          <Grid item xs={12} sm={6} md={4} key={board.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': { boxShadow: 6 }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }} onClick={() => openBoard(board.id)}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {board.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {board.description}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentBoard(board)
                    setNewBoardData({ title: board.title, description: board.description })
                    setOpenEditDialog(true)
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentBoard(board)
                    setOpenDeleteDialog(true)
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Board Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Create New Board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Board Title"
            fullWidth
            variant="outlined"
            value={newBoardData.title}
            onChange={(e) => setNewBoardData({ ...newBoardData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={newBoardData.description}
            onChange={(e) => setNewBoardData({ ...newBoardData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateBoard} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Board Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Board Title"
            fullWidth
            variant="outlined"
            value={newBoardData.title}
            onChange={(e) => setNewBoardData({ ...newBoardData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={newBoardData.description}
            onChange={(e) => setNewBoardData({ ...newBoardData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditBoard} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Board Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Board</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{currentBoard?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteBoard} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BoardList
