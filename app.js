// const express = require("express");
// const userRoutes = require("./routes/userRoutes"); 
// const { checkConnection } = require("./db"); 

// const app = express();

// app.use(express.json());


// app.use("/api/users", userRoutes);


// app.listen(3000, async () => {
//   console.log("Server is running on port 3000");
//   try {
//     await checkConnection();
//     console.log("Database connected successfully!");
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//   }
// });
const express = require("express");
const studentRoutes = require("./routes/student");

const app = express();

app.use(express.json());
app.use("/students", studentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});