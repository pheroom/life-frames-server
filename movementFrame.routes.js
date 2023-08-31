const Router = require("express");
const MovementFrame = require("./models/MovementFrame")
const router = new Router()
const authMiddleware = require('./authMiddleware')

router.post('/new-frame', authMiddleware, async (req, res) => {
    try {
        const {frame} = req.body
        const movementFrame = new MovementFrame(frame)
        await movementFrame.save()
        res.json({message: "Movement frame was created", id: movementFrame._id})
    } catch (e) {
        console.log(e)
        // res.status(500).send({message: 'Internal Server Error'})
        return res.status(500).json('Internal Server Error')
    }
})

router.post('/update-frame', authMiddleware, async (req, res) => {
    try {
        const {id, updates} = req.body
        await MovementFrame.updateOne({_id: id}, updates, { upsert: true })
        res.json({message: "Movement frame was update"})
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})

router.post('/delete-frame', authMiddleware, async (req, res) => {
    try {
        const {id} = req.body
        await MovementFrame.deleteOne({_id: id})
        res.json({message: "Movement frame was delete"})
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})

router.get('/frames', authMiddleware, async (req, res) => {
    try {
        const perPage = req.query.limit || 10
        const page = Math.max(0, req.query.page-1)
        const frames = await MovementFrame.find({}).sort({start: -1}).skip(perPage * page).limit(perPage)
        const totalCount = await MovementFrame.count()
        return res.json({frames, totalCount})
        // return res.json({frames: [], totalCount: 0})
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})


module.exports = router