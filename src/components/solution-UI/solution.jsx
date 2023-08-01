// import React from "react";
// import { Stack, Box, TextField, MenuItem } from "@mui/material";

// function solution() {
//   return (
//     <Stack direction="row">
//       <Box>
//         <Grid container>
//             <Grid item>
//                 <TextField label="Faculty">
//                     <MenuItem></MenuItem>
//                 </TextField>
//             </Grid>
//             <Grid item></Grid>
//         </Grid>
//       </Box>
//       <Box></Box>
//     </Stack>
//   );
// }

// export default solution;

import React from 'react';
import { Stack, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const solution = () => {
  // Arrays containing options for faculty and department labels
  const facultyOptions = ['Faculty A', 'Faculty B', 'Faculty C'];
  const departmentOptions = ['Department X', 'Department Y', 'Department Z'];

  // State variables to store selected values
  const [selectedFaculty, setSelectedFaculty] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState('');

  // Event handlers for changing selections
  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <Stack direction="row">
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="faculty-label">Faculty</InputLabel>
        <Select
          labelId="faculty-label"
          id="faculty-select"
          value={selectedFaculty}
          onChange={handleFacultyChange}
          label="Faculty"
        >
          {facultyOptions.map((faculty, index) => (
            <MenuItem key={index} value={faculty}>
              {faculty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />

      <FormControl variant="outlined" fullWidth>
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="department-label"
          id="department-select"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          label="Department"
        >
          {departmentOptions.map((department, index) => (
            <MenuItem key={index} value={department}>
              {department}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default solution;

