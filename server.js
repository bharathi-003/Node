const express = require("express");
const userRoutes = require("./routes/user"); // ✅ correct file name

const app = express();

app.use(express.json()); // very important

app.use("/users", userRoutes); // route path

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});