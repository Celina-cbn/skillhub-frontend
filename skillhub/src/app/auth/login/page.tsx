'use client'

import { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Grid2';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/userSlice';
import { AppDispatch } from '@/store';

export default function Login() {
   const router = useRouter();
   const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    setShowPassword(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Connection successful!", {
        autoClose: 3000,
    });
      router.push('/feed/articles');
    } catch (error) {
        toast.error("Error while connecting", {
          autoClose: 3000,
      });
        console.error('Error while connecting:', error.message);
    }
  }

    return (
      <Grid2 container sx={{ height: '100vh', width: '100vw' }}>
        
        <Grid2 size={{ xs: 0, sm: 6, md:6 }}
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
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginTop: '0px',
                marginRight: '25px',
              }}
              InputProps={{
                sx: { 
                  borderRadius: '20px',
                  height: '45px'
                },
                endAdornment: ( 
                  <InputAdornment position="end">
                    <IconButton data-testid="icon-visibility" onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
