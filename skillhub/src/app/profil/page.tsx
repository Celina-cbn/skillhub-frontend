'use client'

import React from 'react';
import { Box, Typography, Button, Avatar, Grid2 } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/userSlice';
import AutorenewIcon from '@mui/icons-material/Autorenew';


const Profile = () => {
  const user = useSelector(selectUser).user


  return (
    <Grid2 container sx={{ height: '100vh', width: '100vw' }}>
      {user ? (
        <><Grid2 size={{ xs: 12, sm: 5, md: 5 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              maxWidth: 450,
              minWidth: 250,
              padding: '45px',
              borderRadius: '20px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >

            <Avatar
              alt="user photo"
              src="/images/louis.jpeg"
              sx={{ width: 100, height: 100 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ marginTop: '20px' }}>{user.name}</Typography>
            <Typography variant="subtitle1" color="gray">{user.email}</Typography>

            <Typography variant="h6" sx={{ marginTop: 2, color: '#1976D2', fontWeight: 'bold' }}>
              ⭐ Points: {user.points}
            </Typography>

            <Button
              variant="contained"
              sx={{
                marginTop: 3, borderRadius: '20px', width: '200px',
                cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              Logout
            </Button>

          </Box>
        </Grid2><Grid2 size={{ xs: 12, sm: 5, md: 7 }}>
            <Typography>
              not implem yet - lists
            </Typography>
          </Grid2></>        
      ) : (
        <AutorenewIcon />
      )}


    </Grid2>
  );
};

export default Profile;