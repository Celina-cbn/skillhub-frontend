'use client'

import { useState } from 'react';
import Grid2 from '@mui/material/Grid2';
import { Box, Button, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginService } from '@/services/authService';

export default function Login() {
   const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginService(email, password); 
      // router.push('/home'); // ✅ Redirection après connexion
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
    }
  }

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
            Don&apos;t have an account? {' '}
            <Typography
              component="span"
              sx={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => router.push('/auth/signup')}
          >
            Signup
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
              Login
            </Typography>
            
            <Typography>Email</Typography>
            <TextField 
              id="email" 
              variant="outlined" 
              fullWidth 
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': { borderRadius: '20px', height: '45px' },
                marginTop: '0px' 
              }}
            />

            <Typography sx={{ marginTop: "5px" }}>Password</Typography>
            <TextField 
              id="password" 
              variant="outlined" 
              type="password" 
              fullWidth 
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': { borderRadius: '20px', height: '45px' },
                marginTop: '0px' 
              }}
            />

            <Typography 
              sx={{ 
                textAlign: "right", 
                color: "blue", 
                cursor: "pointer", 
                marginTop: "5px" 
              }}
            >            
                Forgotten password ?
            </Typography>

            {/* Bouton centré */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button type='submit' variant="contained" sx={{ borderRadius: '15px', width: '130px' }} onClick={(e) => handleSubmit(e)} disabled={email==='' || password===''} >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid2>

      </Grid2>
    );
}
