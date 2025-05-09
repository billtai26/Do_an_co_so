/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { InputAdornment, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function ListColumns({ columns: initialColumns, onColumnsUpdate, createNewColumn, createNewCard, deleteColumnDetails }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column Title!')
      return
    }

    // Tạo dữ liệu Column để gọi API
    const newColumnData = {
      title: newColumnTitle
    }

    /**
     * Gọi lên props function createNewColumn nằm ở component cha cao nhất (board/_id.jsx)
     * Lưu ý: Về sau học phần MERN Stack Advance nâng cao học trực tiếp với mình thì chúng ta sẽ đưa dữ liệu Board ra ngoài Redux Global Store,
     * Thì lúc này chúng ta có thể gọi luôn API ở đây là xong thay vì phải lần lượt gọi ngược lên những component cha phía bên trên. (Đối với component con nằm càng sâu thì càng khổ)
     * - Với việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều.
     */
    createNewColumn(newColumnData)

    // Đóng trạng thái thêm Column mới & Clear Input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  const [columns, setColumns] = useState(initialColumns)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Update when prop changes
  useEffect(() => {
    setColumns(initialColumns)
  }, [initialColumns])

  // Handle updates to a single column
  const handleColumnUpdate = useCallback((updatedColumn) => {
    const newColumns = columns.map(column =>
      column._id === updatedColumn._id ? updatedColumn : column
    )

    setColumns(newColumns)

    // Notify parent component if needed
    if (onColumnsUpdate) {
      onColumnsUpdate(newColumns)
    }
  }, [columns, onColumnsUpdate])

  // Các thuộc tính chung cho tất cả các cột
  const commonColumnProps = {
    sx: {
      minWidth: isMobile ? '94vw' : '300px',
      maxWidth: isMobile ? '94vw' : '300px',
      ml: 2 // Đặt margin left đồng nhất cho tất cả các cột
    }
  }

  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 },
        pr: isMobile ? 1 : 0
      }}>
        {columns?.map(column => <Column
          {...commonColumnProps}
          onColumnUpdate={handleColumnUpdate}
          key={column._id}
          column={column}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />)}

        {/* Box Add new column CTA */}
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2, // Dùng margin-x thay vì chỉ margin-left
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
              Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              placeholder="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant="contained" color="success" size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >Add Column</Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns
