import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import CommentThreadItem from './CommentThreadItem'

function CardActivitySection({ cardComments = [], onAddCardComment }) {
  const currentUser = useSelector(selectCurrentUser)

  const handleAddCardComment = (event) => {
    // Bắt hành động người dùng nhấn phím Enter && không phải hành động Shift + Ente
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Thêm dòng này để khi Enter không bị nhảy dòng
      if (!event.target?.value) return // Nếu không có giá trị gì thì return không làm gì cả

      // Tạo một biến commend data để gửi api
      const commentToAdd = {
        id: 'comment-' + Date.now(),
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: event.target.value.trim(),
        commentedAt: new Date().toISOString(),
        replies: [],
        parentId: null
      }

      onAddCardComment(commentToAdd).then(() => {
        event.target.value = ''
      })
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      {/* Xử lý thêm comment vào Card */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Avatar
          sx={{ width: 36, height: 36, cursor: 'pointer' }}
          alt={currentUser?.displayName}
          src={currentUser?.avatar}
        />
        <TextField
          fullWidth
          placeholder="Write a comment..."
          type="text"
          variant="outlined"
          multiline
          onKeyDown={handleAddCardComment}
        />
      </Box>

      {/* Hiển thị danh sách các comments */}
      {cardComments.length === 0 && (
        <Typography sx={{ pl: '45px', fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>
          No activity found!
        </Typography>
      )}

      {/* Map through parent comments only */}
      {cardComments.filter(comment => !comment.parentId).map(comment => (
        <CommentThreadItem
          key={comment.id}
          comment={comment}
          cardComments={cardComments}
          onAddCardComment={onAddCardComment}
        />
      ))}
    </Box>
  )
}

export default CardActivitySection
