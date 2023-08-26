const Router = require("express");
const SleepingFrame = require("./models/SleepingFrame")
const router = new Router()
const authMiddleware = require('./authMiddleware')

router.post('/new-frame', authMiddleware, async (req, res) => {
    try {
        const {frame} = req.body
        const sleepingFrame = new SleepingFrame(frame)
        await sleepingFrame.save()
        res.json({message: "Sleeping frame was created", id: sleepingFrame._id})
    } catch (e) {
        console.log(e)
        // res.status(500).send({message: 'Internal Server Error'})
        return res.status(500).json('Internal Server Error')
    }
})

router.post('/update-frame', authMiddleware, async (req, res) => {
    try {
        const {id, updates} = req.body
        await SleepingFrame.updateOne({_id: id}, updates, { upsert: true })
        res.json({message: "Sleeping frame was update"})
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})

router.post('/delete-frame', authMiddleware, async (req, res) => {
    try {
        const {id} = req.body
        console.log(id)
        await SleepingFrame.deleteOne({_id: id})
        res.json({message: "Sleeping frame was delete"})
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})

router.get('/frames', authMiddleware, async (req, res) => {
    try {
        const perPage = req.query.limit || 10
        const page = Math.max(0, req.query.page-1)
        const frames = await SleepingFrame.find({}).sort({start: -1}).skip(perPage * page).limit(perPage)
        const totalCount = await SleepingFrame.count()
        return res.json({frames, totalCount})
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})

// router.get('/createframes', authMiddleware, async (req, res) => {
//     try {
//         for(let i=60; i<100;i++){
//             console.log(i)
//             const sleepingFrame = new SleepingFrame({name: String.fromCharCode(i + 20), start: 100000000000 + (i * 100000000)})
//             await sleepingFrame.save()
//         }
//         return res.json('ok')
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json('Internal Server Error')
//     }
// })


module.exports = router