const {model, Schema, ObjectId} = require('mongoose')

const SleepingFrame = new Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    start: {type: Number, unicode: true, default: Date.now()},
    end: {type: Number, unicode: true, default: null},
    awakeGrade: {type: String, default: ""},
    asleepGrade: {type: String, default: ""}
})

module.exports = model('SleepingFrame', SleepingFrame)