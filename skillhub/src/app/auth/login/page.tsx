import * as React from 'react';
import Grid2 from '@mui/material/Grid2';
import { Box, TextField, Typography } from '@mui/material';
import Image from 'next/image';

export default function Login() {
    return (
      <Grid2 container sx={{ height: '100vh', width: '100vw' }}>
        {/* Section de gauche avec l'image */}
        <Grid2 
          sx={{ 
            xs: 12, sm: 6, md: 6, // Responsive
            width: '100%', height: '100vh', 
            position: 'relative' // Obligatoire pour `fill`
          }}
        >
          <Image
            src="/images/home.jpg"
            alt="Mon super visuel"
            fill // ✅ Remplace `layout="fill"`
            style={{ objectFit: "cover" }} // ✅ Remplace `objectFit`
          />
        </Grid2>

        {/* Section de droite avec le formulaire */}
        <Grid2 
          sx={{ 
            xs: 12, sm: 6, md: 6, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          <Box sx={{ borderRadius: '40px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography>Adresse email</Typography>
            <TextField id="textfeild-email" variant="outlined" fullWidth />

            <Typography>Password</Typography>
            <TextField id="textfeild-password" variant="outlined" fullWidth />
          </Box>
        </Grid2>
      </Grid2>
    )
}
