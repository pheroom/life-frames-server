const Router = require("express");
const User = require("./models/User")
const router = new Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
require('dotenv').config()

// router.post('/registration',
//     [
//         check('name', "Name must be longer than 3 and shorter than 12").isLength({min:3, max:12}),
//         check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
//     ],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req)
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({message: "Uncorrect request", errors})
//             }
//             const {name, password} = req.body
//             const candidate = await User.findOne({name})
//             if(candidate) {
//                 return res.status(400).json({message: `User with name ${name} already exist`})
//             }
//             const hashPassword = await bcrypt.hash(password, 8)
//             const user = new User({name, password: hashPassword})
//             await user.save()
//             const token = jwt.sign({name}, process.env.SECRET_KEY, {})
//             res.json({message: "User was created", token})
//         } catch (e) {
//             console.log(e)
//             res.send({message: "Server error"})
//         }
//     })

router.post('/login', async (req, res) => {
    try {
        const {name, password} = req.body
        const user = await User.findOne({name})
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"})
        }
        const token = jwt.sign({name}, process.env.SECRET_KEY, {})
        return res.json({token})
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
})

module.exports = router