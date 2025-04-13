import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState, useCallback, useEffect } from 'react'
import TaskModal from '~/components/TaskModal/TaskModal'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card: initialCard, updateCard }) {
  const [card, setCard] = useState(initialCard)
  const [modalOpen, setModalOpen] = useState(false)
  
  // Add effect to update card when initialCard changes
  useEffect(() => {
    setCard(initialCard)
  }, [initialCard])
  
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyles = {
    // touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length || 
           !!card?.subtasks?.length
  }

  const handleOpenModal = (e) => {
    // Prevent opening modal during dragging
    if (!isDragging) {
      setModalOpen(true)
      // Stop propagation to prevent drag start
      e.stopPropagation()
    }
  }

  const handleTaskUpdate = useCallback((updatedTask) => {
    setCard(updatedTask)
    
    // If there's a parent update handler, call it
    if (updateCard) {
      updateCard(updatedTask)
    }
  }, [updateCard])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'error'
      case 'medium': return 'warning'
      case 'low': return 'info'
      default: return 'default'
    }
  }

  const getPriorityIcon = (priority) => {
    return <PriorityHighIcon fontSize="small" />
  }

  // Don't render placeholder cards
  if (card?.FE_PlaceholderCard) {
    return (
      <MuiCard
        ref={setNodeRef}
        style={{...dndKitCardStyles, height: '1px'}}
        {...attributes}
        {...listeners}
        sx={{
          visibility: 'hidden',
          opacity: 0,
          m: 0, p: 0
        }}
      ></MuiCard>
    )
  }

  return (
    <>
      <MuiCard
        ref={setNodeRef}
        style={dndKitCardStyles}
        {...attributes}
        {...listeners}
        onClick={handleOpenModal}
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset',
          display: card?.FE_PlaceholderCard ? 'none' : 'block',
          mb: 1.5
        }}
      >
        {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} /> }
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography variant="subtitle1" component="div" gutterBottom>
            {card?.title}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
            {card?.priority && (
              <Chip
                icon={getPriorityIcon(card.priority)}
                label={card.priority.charAt(0).toUpperCase() + card.priority.slice(1)}
                size="small"
                color={getPriorityColor(card.priority)}
                sx={{ height: 20, '& .MuiChip-label': { px: 1 } }}
              />
            )}
            
            {card?.deadline && (
              <Chip
                icon={<AccessTimeIcon fontSize="small" />}
                label={formatDate(card.deadline)}
                size="small"
                variant="outlined"
                sx={{ height: 20, '& .MuiChip-label': { px: 1 } }}
              />
            )}
          </Box>
        </CardContent>
        
        {shouldShowCardActions() && 
          <CardActions sx={{ p: '0 4px 8px 4px' }}>
            {!!card?.memberIds?.length &&
              <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>
            }
            {!!card?.comments?.length &&
              <Button size="small" startIcon={<CommentIcon />}>{card?.comments?.length}</Button>
            }
            {!!card?.attachments?.length &&
              <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>
            }
            {!!card?.subtasks?.length &&
              <Button size="small" startIcon={<CheckBoxOutlinedIcon />}>{card?.subtasks?.length}</Button>
            }
          </CardActions>
        }
      </MuiCard>
      
      <TaskModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        task={card}
        onTaskUpdate={handleTaskUpdate}
      />
    </>
  )
}

export default Card
