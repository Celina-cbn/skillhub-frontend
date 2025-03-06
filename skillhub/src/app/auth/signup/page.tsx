'use client'

import * as React from 'react';
import Grid2 from '@mui/material/Grid2';
import { Box, Button, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const inputs = [
  {id: 1, name: 'Name', value: '', type: 'text'},
  {id: 2, name: 'Email', value: '', type: 'text'},
  {id: 3, name: 'Password', value: '', type: 'password'},
  {id: 4, name: 'Confirm password', value: '', type: 'password'}
]

export default function Signup() {
  const router = useRouter();
    return (
      <Grid2 container sx={{ height: '100vh', width: '100vw' }}>
        
        <Grid2  size={{ xs: 0, sm: 6, md:6 }}
          sx={{ 
            position: 'relative', 
            height: '100%', 
            overflow: 'hidden' 
          }}
        >
          <Image
            src="/images/home.jpg"
            alt="Mon super visuel"
            fill
            style={{ objectFit: "cover" }} 
          />
        </Grid2>

        <Grid2  size={{ xs: 12, sm: 6, md: 6 }}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#fff' 
          }}
        >
          <Typography variant="h3" color="#000066" sx={{ marginBottom: "10px" }}>
            SkillHub
          </Typography>

          <Typography sx={{ marginBottom: "50px" }}>
            Already have an account? {' '}
          <Typography
            component="span"
            sx={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => router.push('/auth/login')}
          >
            Login
          </Typography>
        </Typography>
         
          <Box 
            sx={{ 
              width: '90%', 
              maxWidth: 450, 
              padding: '45px', 
              borderRadius: '20px', 
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '20px' }} >
              Inscription
            </Typography>
            

            {inputs.map((input) => (
              <Grid2 key={input.id} sx={{ display: 'flxe', flexDirection: 'row' }}>
                <Typography> {input.name} </Typography>
                <TextField 
                  id={input.name}
                  variant="outlined" 
                  fullWidth 
                  type={input.type}
                  margin="normal"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { borderRadius: '20px', height: '45px' },
                    marginTop: '0px' 
                  }}
                />  
              </Grid2>
            
            ))}



            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button variant="contained" sx={{ borderRadius: '15px', width: '130px' }}> Submit </Button>
            </Box>
          </Box>
        </Grid2>

      </Grid2>
    );
}
