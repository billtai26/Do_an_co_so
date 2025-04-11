import React from 'react'
import { Box, Typography, Paper, Divider, useTheme, useMediaQuery, Avatar, Container, } from '@mui/material'

const UserProfile = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'primary.light',
        py: 4
      }}
    >
      <Container>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 800,
            margin: 'auto',
            p: isSmallScreen ? 2 : 4,
            my: 4,
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              gap: isSmallScreen ? 2 : 4
            }}
          >
            {/* Left Column */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
                alt='User Avatar'
                src='https://via.placeholder.com/150'
              />
              <Typography
                variant='h4'
                component='h1'
                gutterBottom
                sx={{ color: 'primary.main' }}
              >
                Lucia Alvarez
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                gutterBottom
              >
                Photographer
              </Typography>

              <Divider sx={{ my: 2, width: '100%' }} />

              <Typography variant='body1' gutterBottom>
                <strong>Age:</strong> 29
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Education:</strong> Bachelor of Arts in Photography
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Location:</strong> San Francisco, CA
              </Typography>
            </Box>

            {/* Right Column */}
            <Box sx={{ flex: 2 }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ color: 'primary.main' }}
              >
                Bio
              </Typography>
              <Typography variant='body1' gutterBottom>
                Lucia is a professional photographer with over 10 years of
                experience in portrait and landscape photography. She is
                passionate about capturing moments that tell a story.
              </Typography>

              <Typography
                variant='h6'
                gutterBottom
                sx={{ color: 'primary.main' }}
              >
                Motivations
              </Typography>
              <Typography variant='body1' gutterBottom>
                Lucia is motivated by her love for art and her desire to inspire
                others through her work.
              </Typography>

              <Typography
                variant='h6'
                gutterBottom
                sx={{ color: 'primary.main' }}
              >
                Goals
              </Typography>
              <Typography variant='body1' gutterBottom>
                Her goal is to open her own photography studio and mentor
                aspiring photographers.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant='h6'
                gutterBottom
                sx={{ color: 'primary.main' }}
              >
                Concerns
              </Typography>
              <Typography variant='body1' gutterBottom>
                Lucia is concerned about balancing her personal and professional
                life while pursuing her dreams.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default UserProfile
