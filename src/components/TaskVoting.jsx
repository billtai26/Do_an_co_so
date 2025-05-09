import { Box, IconButton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'

const TaskVoting = ({ votes = { upvotes: [], downvotes: [] }, onVote, currentUserVote }) => {
  const voteCount = (votes.upvotes?.length || 0) - (votes.downvotes?.length || 0)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={() => onVote('up')}
        color={currentUserVote === 'up' ? 'primary' : 'default'}
      >
        <ThumbUpIcon />
      </IconButton>

      <Typography
        variant="body2"
        color={voteCount > 0 ? 'primary' : voteCount < 0 ? 'error' : 'text.secondary'}
        sx={{ minWidth: '20px', textAlign: 'center' }}
      >
        {voteCount}
      </Typography>

      <IconButton
        onClick={() => onVote('down')}
        color={currentUserVote === 'down' ? 'error' : 'default'}
      >
        <ThumbDownIcon />
      </IconButton>
    </Box>
  )
}

export default TaskVoting