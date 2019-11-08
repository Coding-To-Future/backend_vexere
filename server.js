const express = require('express');
const mongoose = require('mongoose');
const myRouter = require('./routes/index');
// require('dotenv').config() //goi file .env

console.log("node env", process.env.NODE_ENV)

const keys = require('./config/index')

// const  = require('./config/index')
mongoose.connect(keys.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected to database successfully ${keys.mongo_uri}`))
    .catch(console.log)

const app = express();

app.use(express.json())

// app.use(express.urlencoded({ extended: false }))
//ben ngoai chi dung use ko dinh nghia cac phuong thuc http method=> co che midder wear
app.use('/uploads', express.static('./uploads'))
app.use('/api', myRouter); // localhost:5000/api
// router.use('/stations', stationRouter) thay the myRouter trong file index,js


// const port = 5000;

const port = process.env.PORT || keys.port; //heroku cap port or lay local
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})