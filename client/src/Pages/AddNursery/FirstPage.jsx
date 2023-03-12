import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FirstPage() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 2, width: '75ch', marginLeft: '15%'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Name"
          multiline
          maxRows={4}
          required
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          required
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="City"
          multiline
          maxRows={4}
          required
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Phone Number"
          multiline
          maxRows={4}
          required
        />
      </div>
      <div>
      <TextField
          id="outlined-multiline-static"
          label="Addresss"
          multiline
          rows={4}
          required
        />
      </div>
    </Box>
  );
}