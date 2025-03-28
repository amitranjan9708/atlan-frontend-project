import React, { useState, useEffect } from "react";
import { Container, Paper, Typography } from "@mui/material";
import QuerySelector from "./components/QuerySelector";
import QueryEditor from "./components/QueryEditor";
import QueryResults from "./components/QueryResults";
import QueryHistory from "./components/QueryHistory";
import { queries, extractTableName, loadTableData } from "./utils/queryUtils";

const App = () => {
  const [selectedQuery, setSelectedQuery] = useState(queries[0].query);
  const [queryResult, setQueryResult] = useState([]);
  const [history, setHistory] = useState([]);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadTableData();
      setTableData(data);
    };
    fetchData();
  }, []);

  const executeQuery = () => {
    const tableName = extractTableName(selectedQuery);
    const result = tableName && tableData[tableName] ? tableData[tableName] : [];
    setQueryResult(result);

    setHistory((prev) => [...prev, { query: selectedQuery, result }]);
  };

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
