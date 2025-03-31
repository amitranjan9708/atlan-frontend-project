import React, { useState, useEffect, useCallback } from "react";
import {  Container, Paper, Typography } from "@mui/material";
import QuerySelector from "./components/QuerySelector";
import QueryEditor from "./components/QueryEditor";
import QueryResults from "./components/QueryResults";
import QueryHistory from "./components/QueryHistory";
import { queries, extractTableName, loadTableData } from "./utils/queryUtils";
import { useQuery } from "@tanstack/react-query";


const App = () => {
  const [selectedQuery, setSelectedQuery] = useState(queries[0].query);
  const [queryResult, setQueryResult] = useState([]);
  const [history, setHistory] = useState([]);

  const [loadTime, setLoadTime] = useState(null);

  useEffect(() => {
    const pageLoadTime = performance.now();
    setLoadTime(pageLoadTime);
  }, []);

  console.log("the page load time is " , loadTime);
 

  const { data: tableData = {} } = useQuery({
    queryKey: ["tableData"],
    queryFn: loadTableData,
    staleTime: 60000, 
  });

 

  const executeQuery = useCallback(() => {
    if (!tableData) return; 
    const tableName = extractTableName(selectedQuery);
    const result = tableName && tableData[tableName] ? tableData[tableName] : [];
    
    setQueryResult(result);
    setHistory((prev) => [...prev, { query: selectedQuery, result }]);
  }, [selectedQuery, tableData]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        SQL Query Runner
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
      
        <QuerySelector selectedQuery={selectedQuery} setSelectedQuery={setSelectedQuery} executeQuery={executeQuery} />
        
        <QueryEditor selectedQuery={selectedQuery} setSelectedQuery={setSelectedQuery} />
      </Paper>


      <QueryResults queryResult={queryResult} />

      <QueryHistory history={history} />
    </Container>
  );
};

export default App;
