const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "your_database"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});


// 1️⃣ GET - Fetch All Posts
app.get("/posts", (req, res) => {
  const search = req.query.search || "";

  const sql = `
    SELECT * FROM posts
    WHERE title LIKE ? OR content LIKE ? OR category LIKE ? OR tags LIKE ?
    ORDER BY created_at DESC
  `;

  db.query(sql,
    [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
});


// 2️⃣ POST - Add New Post
app.post("/posts", (req, res) => {
  const { title, content, category, tags, published } = req.body;

  const sql = `
    INSERT INTO posts (title, content, category, tags, published)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql,
    [title, content, category, tags, published],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Post added successfully" });
    });
});


// 3️⃣ PUT - Update Post
app.put("/posts/:id", (req, res) => {
  const { title, content, category, tags, published } = req.body;

  const sql = `
    UPDATE posts
    SET title=?, content=?, category=?, tags=?, published=?
    WHERE post_id=?
  `;

  db.query(sql,
    [title, content, category, tags, published, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Post updated successfully" });
    });
});


// 4️⃣ DELETE - Delete Post
app.delete("/posts/:id", (req, res) => {
  const sql = "DELETE FROM posts WHERE post_id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Post deleted successfully" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));