import React from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { queries } from "../utils/queryUtils";
import Input from '@mui/material/Input';


const handleAlert =()=>{
  alert('Files Uploaded');
}

const QuerySelector = ({ selectedQuery, setSelectedQuery, executeQuery }) => {
  return (
    <Box display="flex" gap={2} alignItems="center">
      <TextField
        select
        label="Select Query"
        value={selectedQuery}
        onChange={(e) => setSelectedQuery(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        {queries.map((query) => (
          <MenuItem key={query.id} value={query.query}>
            {query.name}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" color="primary" onClick={executeQuery}>
        Run Query
      </Button>
      
      <Input type="file"  multiple/>
        <Button onClick={()=>handleAlert()}>
          Upload
        </Button>
    </Box>
  );
};

export default QuerySelector;
