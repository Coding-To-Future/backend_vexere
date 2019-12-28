//this file chi dung use ko dinh nghia cac phuong thuc http method => co che middleware
const express = require('express');
const mongoose = require('mongoose');
const myRouter = require('./routes/index');
const keys = require('./config/index')
const cors = require('cors')

console.log("node env", process.env.NODE_ENV)

mongoose.connect(keys.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected to database successfully ${keys.mongo_uri}`))
    .catch(console.log)

const app = express();

app.use(cors())

app.use(express.json()) //phan tich requests den voi json payloads
// app.use(express.urlencoded({ extended: false }))

app.use('/uploads', express.static('./uploads'))
app.use('/api', myRouter);
app.use('/', express.static('./public')) //serve file trong thu muc duoc chi dinh 
app.use('/docs', require('./routes/docs')) //goi middleware khac thong qua duong dan

const port = process.env.PORT || keys.port; //heroku cap port or lay local
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})