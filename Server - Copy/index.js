const express = require('express');
const cors=require('cors');
const { ConnectionToDB } = require('./src/config/db.config');
const { userRouter } = require('./src/routes/user.Route');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors);
app.use('/auth',userRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  await ConnectionToDB();
  console.log("connected to DB");
  console.log(`Server is running on port ${port}`);
});
