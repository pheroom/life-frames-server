const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const sleepingFrameRouter = require("./sleepingFrame.routes")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/sleeping", sleepingFrameRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.DBURL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
