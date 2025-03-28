import React from "react";
import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const QueryResults = ({ queryResult }) => {
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Query Results:
      </Typography>
      <Paper sx={{ height: 300, width: "100%", marginTop: 2 }}>
      <DataGrid
          rows={queryResult || []}
          columns={
            queryResult.length > 0
              ? Object.keys(queryResult[0]).map((key) => ({
                  field: key,
                  headerName: key,
                  flex: 1,
                  minWidth: 200, // Prevents column from shrinking too much
                }))
              : []
          }
          pageSize={5}
          autoPageSize
          getRowId={(row) => row.id || Math.random()}
          disableColumnResize={false} // Allows resizing of columns
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
};

export default QueryResults;
