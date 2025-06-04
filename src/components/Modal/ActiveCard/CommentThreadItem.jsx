import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ReplyIcon from '@mui/icons-material/Reply'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import moment from 'moment'

function CommentThreadItem({ comment, cardComments, onAddCardComment, level = 0 }) {
  const currentUser = useSelector(selectCurrentUser)
  const [replyingTo, setReplyingTo] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const replies = cardComments.filter(reply => reply.parentId === comment.id)
  const hasReplies = replies.length > 0

  const handleReply = () => {
    setReplyingTo(!replyingTo)
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleAddReply = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (!event.target?.value) return

      const replyToAdd = {
        id: 'comment-' + Date.now(),
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: event.target.value.trim(),
        commentedAt: new Date().toISOString(),
        replies: [],
        parentId: comment.id
      }

      onAddCardComment(replyToAdd).then(() => {
        event.target.value = ''
        setReplyingTo(false)
      })
    }
  }

  return (
    <Box sx={{ pl: level * 4 }}>
      <Box sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tooltip title={comment.userDisplayName}>
            <Avatar
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
              alt={comment.userDisplayName}
              src={comment.userAvatar}
            />
          </Tooltip>
          {hasReplies && level === 0 && (
            <Box
              sx={{
                width: '2px',
                height: '100%',
                backgroundColor: 'divider',
                my: 1
              }}
            />
          )}
        </Box>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="span" sx={{ fontWeight: 'bold' }}>
              {comment.userDisplayName}
            </Typography>

            <Typography variant="span" sx={{ fontSize: '12px', color: 'text.secondary' }}>
              {moment(comment.commentedAt).fromNow()}
            </Typography>
          </Box>

          <Box sx={{
            display: 'block',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : 'white',
            p: '8px 12px',
            mt: '4px',
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            wordBreak: 'break-word',
            boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
          }}>
            {comment.content}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 1 }}>
            <Button
              size="small"
              startIcon={<ReplyIcon />}
              onClick={handleReply}
              sx={{ textTransform: 'none' }}
            >
              Reply
            </Button>

            {hasReplies && (
              <Button
                size="small"
                startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={handleToggleExpand}
                sx={{ textTransform: 'none' }}
              >
                {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
              </Button>
            )}
          </Box>

          {replyingTo && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Avatar
                sx={{ width: 28, height: 28 }}
                alt={currentUser?.displayName}
                src={currentUser?.avatar}
              />
              <TextField
                size="small"
                fullWidth
                placeholder={`Reply to ${comment.userDisplayName}...`}
                variant="outlined"
                onKeyDown={handleAddReply}
                multiline
                maxRows={4}
                autoFocus
              />
            </Box>
          )}
        </Box>
      </Box>

      {hasReplies && isExpanded && (
        <Box>
          {replies.map(reply => (
            <CommentThreadItem
              key={reply.id}
              comment={reply}
              cardComments={cardComments}
              onAddCardComment={onAddCardComment}
              level={level + 1}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default CommentThreadItem
