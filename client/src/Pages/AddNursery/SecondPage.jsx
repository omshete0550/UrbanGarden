import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { FaCamera } from 'react-icons/fa';

export default function SecondPage() {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange4 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Plants"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Gardening"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Pebbles"
        control={<Checkbox checked={checked[1]} onChange={handleChange4} />}
      />
      <FormControlLabel
        label="Pots"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Gardening"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Pebbles"
        control={<Checkbox checked={checked[1]} onChange={handleChange4} />}
      />
      <FormControlLabel
        label="Plants"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Gardening"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Pebbles"
        control={<Checkbox checked={checked[1]} onChange={handleChange4} />}
      />

    </Box>
  );

  return (
    <div >
      <FormControlLabel
        label="Categories"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
      <h2 style={{marginTop: '25px'}}>Upload Nursery Photos</h2>
      <Button variant="contained" component="label" sx={{marginTop: '15px'}}>
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <FaCamera />
      </IconButton>
    </div>
    
  );
}


