const express = require('express');
const { ConnectionToDB } = require('./src/config/db.config');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  await ConnectionToDB();
  console.log(`Server is running on port ${port}`);
});
