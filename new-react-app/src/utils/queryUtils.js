import Papa from "papaparse";

export const queries = [
  { id: 1, name: "Users List", query: "SELECT * FROM users;" },
  { id: 2, name: "Users Over 25", query: "SELECT * FROM users WHERE age > 25;" },
  { id: 3, name: "All Orders", query: "SELECT * FROM orders;" },
  { id: 4, name: "High-Value Orders", query: "SELECT * FROM orders WHERE price > 1000;" },
  { id: 5, name: "All Products", query: "SELECT * FROM products;" },
  { id: 6, name: "Low Stock Products", query: "SELECT * FROM products WHERE stock < 50;" },
];

export const extractTableName = (query) => {
  const match = query.match(/FROM\s+(\w+)/i);
  return match ? match[1].toLowerCase() : null;
};

// Function to read CSV files from the public folder
export const loadCSVData = async (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => resolve(result.data),
          error: (err) => reject(err),
        });
      })
      .catch((err) => reject(err));
  });
};

// Function to dynamically load table data from CSV files
export const loadTableData = async () => {
  const users = await loadCSVData("customers.csv");
  const orders = await loadCSVData("orders.csv");
  const products = await loadCSVData("products.csv");

  return {
    users,
    orders,
    products,
  };
};
