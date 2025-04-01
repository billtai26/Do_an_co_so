import React from 'react'
import { Box, Typography, Paper, Divider, useTheme, useMediaQuery, Avatar, Container } from '@mui/material'

const UserProfile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'primary.light',
      py: 4
    }}>
      <Container>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 800,
            margin: 'auto',
            p: isSmallScreen ? 2 : 4,
            my: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              gap: isSmallScreen ? 2 : 4,
            }}
          >
            {/* Left Column */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
                alt="User Avatar"
                src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/473448564_2069625416794085_8117495553887305624_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=1d2534&_nc_ohc=2JGRWAoeNbYQ7kNvgFS-gzp&_nc_oc=AdkwCcXRLLPcxBnV5_lQTNQTF3F3sVV7HKyT-J6I5Qpz7VIX3q3dVaKLTqJoKrvMhAc&_nc_zt=24&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=IWWkwrZ_uSMfrvYrm1IxDw&oh=00_AYEMKwWcxWty9GjJecnmbAcrYv53kZbFsbh69Dcta-aWmg&oe=67F0A6E8"
              />
              <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
                Lucia Alvarez
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Photographer
              </Typography>
              
              <Divider sx={{ my: 2, width: '100%' }} />
              
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Age
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Education
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Location
              </Typography>
            </Box>
            
            {/* Right Column */}
            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Bio
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Motivations
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Goals
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Concerns
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default UserProfile
