import React, { useState } from "react";
import { Box, Button, List, ListItem, ListItemText, Modal, Paper, Typography } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";

const QueryHistory = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState([]);

  const handleShowResult = (result) => {
    setSelectedResult(result);
    setOpen(true);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Query History:</Typography>
      <List>
        {history.map((entry, index) => (
          <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
            <ListItemText primary={entry.query} />
            <Button variant="outlined" color="secondary" onClick={() => handleShowResult(entry.result)}>
              Show Result
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Modal for showing query results */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper sx={{height:400, width: "60%", margin: "auto", marginTop: 5, padding: 3 }}>
          <Typography variant="h6">Query Results:</Typography>
          <DataGrid
            rows={selectedResult || []}
            columns={
              selectedResult.length > 0
                ? Object.keys(selectedResult[0]).map((key) => ({ field: key, headerName: key, flex: 1 ,minWidth:150}))
                : []
            }
            pageSize={5}
            autoPageSize
            getRowId={(row) => row.id || Math.random()}
            disableColumnResize={false} // Allows resizing of columns
            disableSelectionOnClick
            slots={{ toolbar: GridToolbar }} // ✅ Corrected for MUI v6+
            
          />
          <Button fullWidth variant="contained" color="error" onClick={() => setOpen(false)} sx={{ marginTop: 2 }}>
            Close
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};

export default QueryHistory;
