# SQL Query Runner


## Overview
SQL Query Runner is a web application that allows users to upload JSON files containing table data, execute SQL-like queries on them, and view query results in real-time. The application provides a user-friendly interface for selecting queries, editing them, and managing query history.

## Tech Stack
- **JavaScript Framework**: React.js
- **Major Packages Used**:
  - `@mui/material` - For UI components
  - `@tanstack/react-query` - For data fetching and caching
  - `react` hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `lazy`, `Suspense`) for state management and performance optimization

## Performance Measurement
The page load time was measured using the `performance.now()` API in the `useEffect` hook. The measured load time is logged in the console for debugging and performance monitoring.

```js
useEffect(() => {
  const pageLoadTime = performance.now();
  console.log("Page load time:", pageLoadTime);
}, []);
```

## Optimizations
To improve performance and reduce page load time, the following optimizations were implemented:
1. **Lazy Loading**: Components that are not immediately needed are loaded lazily using `React.lazy()` and `Suspense`.
   ```js
   const QueryHistory = React.lazy(() => import("./components/QueryHistory"));
   ```
2. **Memoization**:
   - Used `useMemo()` to memoize computed values and prevent unnecessary recalculations.
   - Used `useCallback()` to memoize functions to avoid unnecessary re-renders.
   ```js
   const executeQuery = useCallback(() => {
     if (!tableData) return;
     const tableName = extractTableName(selectedQuery);
     const result = tableName && tableData[tableName] ? tableData[tableName] : [];
     setQueryResult(result);
   }, [selectedQuery, tableData]);
   ```
3. **React Query for Caching**:
   - Used `useQuery` from `@tanstack/react-query` to cache fetched table data and reduce redundant API calls.
   ```js
   const { data: tableData = {} } = useQuery({
     queryKey: ["tableData"],
     queryFn: loadTableData,
     staleTime: 60000, // Cache for 60 seconds
   });
   ```

These optimizations ensure a smoother user experience by improving application responsiveness and reducing unnecessary re-renders.
