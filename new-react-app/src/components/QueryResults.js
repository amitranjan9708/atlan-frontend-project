import React, { useMemo } from "react";
import { Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const QueryResults = ({ queryResult = [] }) => {

  const columns = useMemo(() => (
    queryResult.length > 0
      ? Object.keys(queryResult[0]).map((key) => ({ field: key, headerName: key, flex: 1, minWidth: 200 }))
      : []
  ), [queryResult]);

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Query Results:
      </Typography>
      <Paper sx={{ height: 500, width: "100%", marginTop: 2 }}>
        <DataGrid
          rows={queryResult.map((row, index) => ({ id: index, ...row }))} 
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          autoPageSize
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }} 
          experimentalFeatures={{ lazyLoading: true }} 
        />
      </Paper>
    </>
  );
};

export default QueryResults;
