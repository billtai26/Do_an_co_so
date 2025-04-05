import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Anh Tai Dev Board"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
        <Button
          variant="outlined" 
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 36,
              height: 36,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="http://bit.ly/3DPb1RW" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/461432459_2606978432821588_3454035682558945814_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ap9zXCqrxF8Q7kNvgGNcM6H&_nc_oc=AdnvYbfHqaDTGmrFouDXSL6D_ows2KO1TNxg_Kav4d9o3KHj3IIeCxzLuaPewkTyNYo&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=iScz0G1NbcEEyaZQQR9uAA&oh=00_AYFzGRW20ef0bP_mMsbSHQvT_0BrLYNlcLLy8aCzNr8IsA&oe=67F325B9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/151184088_3824016630985908_1609593348639139959_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qoW6V9vI3VwQ7kNvgF_Hm5G&_nc_oc=Adk52ESJxZPIz2NPX1cxnyAm4xXIBqc3q_aJmg3xKUFVM1tqCvxwwY6rLgz83pyR_PM&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=_YdzWKyebDtClJmUrCfvxA&oh=00_AYEQM9BY1kQhdrwZrYbBq4IE-qPskzXGHAy2-gKK88HalA&oe=6814D2DD" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/481993368_3076417225848625_1391952600017220461_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EZ_jBNvmfoYQ7kNvgENmFkp&_nc_oc=AdnGtpAs58e6EW5nHZgyNBgoVbkH0lxnT9oX-6isNRbXocwBl4PHI_GAc9036jQfQr4&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=n8SnLVDKHi8acSX_d3KN6A&oh=00_AYHy1u44ZRGRPHv1po5vsPT5WV1iFjwQfpQdiGfEPzgMgw&oe=67F330E9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/448083977_2183122202023574_407376023877496326_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qmf3C46FpxAQ7kNvgF3OzBI&_nc_oc=AdmLFPfBYXDo4D1bRVdqMvU5MMKFl_exNU9EwU1R2drG9un6N2i5aKZkRmqMyp9auuw&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=Rt0KciQeYRk18F2_SaDcgQ&oh=00_AYGflJuxd3lC0fKarO2JxO_qHgCsksx4xONxFIpZDZ-7Ww&oe=67F32308" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/239462814_2349880831812471_7302002402268342362_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9yYZpTrsLr8Q7kNvgHJIV3Q&_nc_oc=AdlD04DEPzLiDJUXPZ2f1S7uSaYhL6HwoM7rwDJMNQEDn0UNZnKWQnserZk9M1qU5uE&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=_olA1okMbkEJR9s__r4vSg&oh=00_AYHycJp235urpi_-Jsjge_oNjYSnjG1HUECZoujrnXpnXw&oe=67F30D4B" />
          </Tooltip>

          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="http://bit.ly/3DPb1RW" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/461432459_2606978432821588_3454035682558945814_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ap9zXCqrxF8Q7kNvgGNcM6H&_nc_oc=AdnvYbfHqaDTGmrFouDXSL6D_ows2KO1TNxg_Kav4d9o3KHj3IIeCxzLuaPewkTyNYo&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=iScz0G1NbcEEyaZQQR9uAA&oh=00_AYFzGRW20ef0bP_mMsbSHQvT_0BrLYNlcLLy8aCzNr8IsA&oe=67F325B9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/151184088_3824016630985908_1609593348639139959_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qoW6V9vI3VwQ7kNvgF_Hm5G&_nc_oc=Adk52ESJxZPIz2NPX1cxnyAm4xXIBqc3q_aJmg3xKUFVM1tqCvxwwY6rLgz83pyR_PM&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=_YdzWKyebDtClJmUrCfvxA&oh=00_AYEQM9BY1kQhdrwZrYbBq4IE-qPskzXGHAy2-gKK88HalA&oe=6814D2DD" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/481993368_3076417225848625_1391952600017220461_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EZ_jBNvmfoYQ7kNvgENmFkp&_nc_oc=AdnGtpAs58e6EW5nHZgyNBgoVbkH0lxnT9oX-6isNRbXocwBl4PHI_GAc9036jQfQr4&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=n8SnLVDKHi8acSX_d3KN6A&oh=00_AYHy1u44ZRGRPHv1po5vsPT5WV1iFjwQfpQdiGfEPzgMgw&oe=67F330E9" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/448083977_2183122202023574_407376023877496326_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qmf3C46FpxAQ7kNvgF3OzBI&_nc_oc=AdmLFPfBYXDo4D1bRVdqMvU5MMKFl_exNU9EwU1R2drG9un6N2i5aKZkRmqMyp9auuw&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=Rt0KciQeYRk18F2_SaDcgQ&oh=00_AYGflJuxd3lC0fKarO2JxO_qHgCsksx4xONxFIpZDZ-7Ww&oe=67F32308" />
          </Tooltip>
          <Tooltip title="anhtaidev">
            <Avatar alt="Anh Tai dep trai"
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/239462814_2349880831812471_7302002402268342362_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9yYZpTrsLr8Q7kNvgHJIV3Q&_nc_oc=AdlD04DEPzLiDJUXPZ2f1S7uSaYhL6HwoM7rwDJMNQEDn0UNZnKWQnserZk9M1qU5uE&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=_olA1okMbkEJR9s__r4vSg&oh=00_AYHycJp235urpi_-Jsjge_oNjYSnjG1HUECZoujrnXpnXw&oe=67F30D4B" />
          </Tooltip>
          
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
