const {model, Schema, ObjectId} = require('mongoose')

const SleepingFrame = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    start: {type: Date, unicode: true, default: Date.now()},
    end: {type: Date, unicode: true, default: null},
    awakeGrade: {type: String, default: ""},
    asleepGrade: {type: String, default: ""}
})

module.exports = model('SleepingFrame', SleepingFrame)