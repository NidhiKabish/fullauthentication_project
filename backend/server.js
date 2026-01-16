const express = require('express');
const session = require('express-session');
const indexRoutes = require('./routes/index');
const pool = require('./common/pool');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

indexRoutes.init(app);

pool.query("SELECT 1", (err) => {
  if (err) {
    console.error("Database Connection Failed:", err);
  } else {
    console.log("Database Connected Successfully!");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
