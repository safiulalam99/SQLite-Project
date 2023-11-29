//index.js
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

sequelize.sync().then(() => console.log("db is running"));

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Page not found" });
});

app.use(errorHandler); 

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
