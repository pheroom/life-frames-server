const express = require("express")
const mongoose = require("mongoose")
const sleepingFrameRouter = require("./sleepingFrame.routes")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000
const dbUrl = process.env.DBURL;

app.use(cors())
app.use(express.json())
app.use("/sleeping", sleepingFrameRouter)

const start = async () => {
    try {
        await mongoose.connect(dbUrl, {
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
