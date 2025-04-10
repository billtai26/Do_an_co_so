import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

function ListColumns({ columns }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Các thuộc tính chung cho tất cả các cột
  const commonColumnProps = {
    sx: {
      minWidth: isMobile ? '94vw' : '300px',
      maxWidth: isMobile ? '94vw' : '300px',
      ml: 2 // Đặt margin left đồng nhất cho tất cả các cột
    }
  }

  return (
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
      {columns?.map(column => <Column {...commonColumnProps} key={column._id} column={column} />)}
      

      {/* Box Add new column CTA */}
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
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
    </Box>
  )
}

export default ListColumns
