const Router = require("express");
const SleepingFrame = require("./models/SleepingFrame")
const router = new Router()

router.post('/new-frame', async (req, res) => {
    try {
        const {name, description, start, end} = req.body
        const sleepingFrame = new SleepingFrame({name, description, start, end})
        await sleepingFrame.save()
        res.json({message: "Sleeping frame was created", id: sleepingFrame._id})
    } catch (e) {
        console.log(e)
        // res.status(500).send({message: 'Internal Server Error'})
        return res.status(500).json('Internal Server Error')
    }
})

router.post('/update-frame', async (req, res) => {
    try {
        const {id, updates} = req.body
        const sleepingFrame = await SleepingFrame.findById(id)
        for(let [key, val] of Object.entries(updates)){
            sleepingFrame[key] = val
        }
        await sleepingFrame.save()
        res.json({message: "Sleeping frame was update"})
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})

router.post('/delete-frame', async (req, res) => {
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

router.get('/frames', async (req, res) => {
    try {
        return res.json(await SleepingFrame.find({}))
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})


module.exports = router