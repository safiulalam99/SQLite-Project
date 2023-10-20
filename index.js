const express = require("express");
const sequelize = require("./database");

sequelize.sync().then(() => console.log("db is running"));

const app = express();
const port = 3000;



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
