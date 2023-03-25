const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
var cors = require('cors')

const userRouter = require('./src/routers/userRouter.js')
const categoryRouter = require('./src/routers/categoryRouter.js')
const productRouter = require('./src/routers/productRouter.js')
const producerRouter = require('./src/routers/producerRouter.js')
const orderRouter = require('./src/routers/orderRouter.js')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const port = 3000

dotenv.config()

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err))

//routes
app.use("/api/users", userRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)
app.use("/api/producers", producerRouter)
app.use("/api/orders", orderRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})