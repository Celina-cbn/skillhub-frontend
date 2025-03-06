'use client'

import * as React from 'react';
import Grid2 from '@mui/material/Grid2';
import { Box, Button, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signupService } from '@/services/authService';

const InputsForm = [
  {id: 1, name: 'Name', type: 'text'},
  {id: 2, name: 'Email', type: 'text'},
  {id: 3, name: 'Password', type: 'password'},
  {id: 4, name: 'Confirm password', type: 'password'}
]

export default function Signup() {
  const router = useRouter();
  const [inputs, setInputs] = React.useState(
    InputsForm.map((input) => ({ ...input, value: '' }))
  );

  const handleInputChange = (id: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
      setInputs(prevInputs =>
        prevInputs.map(input =>
          input.id === id ? { ...input, value } : input 
        )
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const name = inputs.find(input => input.name === 'Name')?.value || '';
      const email = inputs.find(input => input.name === 'Email')?.value || '';
      const password = inputs.find(input => input.name === 'Password')?.value || '';

      await signupService(name, email, password); 
      // router.push('/home'); // ✅ Redirection après connexion
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.error('Erreur lors de la connexion:');
    }
  }

  const isEmpty = () => {
    return inputs.some((input) => {

      if (input.id === 4) {
        const password = inputs.find((el) => el.id === 3)?.value;
        return input.value !== password;
      } else if (input.value === '') {
        return true;
      }else{
              return false;
      }
    });
  };

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
                  value={input.value}
                  onChange={(event) => handleInputChange(input.id, event)} 
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
              <Button onClick={(e) => handleSubmit(e)} variant="contained" sx={{ borderRadius: '15px', width: '130px' }} disabled={isEmpty()}> Submit </Button>
            </Box>
          </Box>
        </Grid2>

      </Grid2>
    );
}
