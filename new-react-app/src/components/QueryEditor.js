import React from "react";
import { Box } from "@mui/material";
import Editor from "@monaco-editor/react";

const QueryEditor = ({ selectedQuery, setSelectedQuery }) => {
  return (
    <Box sx={{ marginTop: 2, border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
      <Editor
        height="200px"
        language="sql"
        theme="vs-dark"
        value={selectedQuery}
        onChange={(value) => setSelectedQuery(value)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          lineNumbers: "on",
          automaticLayout: true,
        }}
      />
    </Box>
  );
};

export default QueryEditor;
