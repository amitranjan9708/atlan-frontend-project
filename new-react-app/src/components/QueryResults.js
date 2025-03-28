import React from "react";
import { Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const QueryResults = ({ queryResult = [] }) => {
  const columns =
    queryResult.length > 0
      ? Object.keys(queryResult[0]).map((key) => ({
          field: key,
          headerName: key,
          flex: 1,
          minWidth: 200,
        }))
      : [];

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Query Results:
      </Typography>
      <Paper sx={{ height: 300, width: "100%", marginTop: 2 }}>
        <DataGrid
          rows={queryResult.map((row, index) => ({ id: index, ...row }))} // ✅ Ensures unique IDs
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          autoPageSize
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }} // ✅ Corrected for MUI v6+
        />
      </Paper>
    </>
  );
};

export default QueryResults;
