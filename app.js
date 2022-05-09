const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const morgan = require('morgan');
const mongoose = require('mongoose')
app.use(bodyParser.json())

const PORT = 7000;
const DB_URL = `mongodb://codegym:123456@127.0.0.1:27017/codegym`;
const db = mongoose.connection;
mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})

app.set("view engine", "ejs");
app.set("views", "./views");

const userRoute = require('./router/userRouter');
app.use('/user', userRoute);
const postRouter = require('./router/postRouter');
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log("Server runing on port " + PORT );
});
