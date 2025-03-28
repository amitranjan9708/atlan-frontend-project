import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const CSVTable = () => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetch("employees.csv") // Make sure your CSV is inside the `public/data` folder
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setTableData(result.data);
            if (result.data.length > 0) {
              setHeaders(Object.keys(result.data[0]));
            }
          },
        });
      });
  }, []);

  return (
    <div>
      <h2>CSV Data Table</h2>
      <table border="1">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVTable;
