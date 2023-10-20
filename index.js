const express = require("express");
const sequelize = require("./database");
const User = require("./User");

sequelize.sync({ force: true }).then(() => console.log("db is running"));

const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.post("/users", async (req, res) => {
  await User.create(req.body);
  res.send("User created successfully");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
