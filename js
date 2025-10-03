const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Connect to PostgreSQL using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

app.get("/", (req, res) => {
  res.send("✅ To-Do App is running with PostgreSQL!");
});

// Example endpoint: get tasks
app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(🚀 App running on port ${port});
});