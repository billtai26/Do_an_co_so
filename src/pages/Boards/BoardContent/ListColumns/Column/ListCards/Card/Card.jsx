import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/479491586_3053228534834161_1853126386999661727_n.png?stp=dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=2285d6&_nc_ohc=cRUMQcSu8D4Q7kNvwGd7sc2&_nc_oc=AdmHBJWjhHYyTGSa11ENk8sKrWoYgNeUeeO1plCJOehQGmX7GtOHfX7m60JD8VPB6Lo&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=rW81DBiOBM-51_jlTuAIOQ&oh=00_AYFwuDMMcjfyPByv4enJtcdC-giq5G3n8HSjTKxXxZZzzQ&oe=67F720D4"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Anh Tai Task</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<CommentIcon />}>15</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
