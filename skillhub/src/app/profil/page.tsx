import React from 'react';
import { Box, Typography, Button, Avatar, Grid2 } from '@mui/material';

const userProfile = {
  name: 'Louis DUCIEL',
  email: 'louis.duciel@gmail.com',
  profilePicture: '/images/profile.jpg',
  points: 200
};

const Profile = () => {
  return (
    <Grid2
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
        marginTop: '80px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '50%', 
        maxWidth: 450, 
        padding: '45px', 
        borderRadius: '20px', 
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
    }}
>

        <Avatar
            alt="user photo"
            src="/images/louis.jpeg"
            sx={{ width: 100, height: 100 }}
        />

      <Typography variant="h5" fontWeight="bold" sx={{ marginTop: '20px' }}>{userProfile.name}</Typography>
      <Typography variant="subtitle1" color="gray">{userProfile.email}</Typography>

      <Typography variant="h6" sx={{ marginTop: 2, color: '#1976D2', fontWeight: 'bold' }}>
        ⭐ Points: {userProfile.points}
      </Typography>

      <Button 
        variant="contained" 
        sx={{ marginTop: 3, borderRadius: '20px', width: '200px',
            cursor: 'pointer', fontWeight: 'bold'
         }}
      >
        Logout
      </Button>

    </Box>
    </Grid2>
  );
};

export default Profile;