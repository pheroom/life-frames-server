const {model, Schema, ObjectId} = require('mongoose')

const SleepingFrame = new Schema({
    description: {type: String, default: ''},
    start: {type: Number, unicode: true, default: Date.now()},
    end: {type: Number, unicode: true, default: null}
})

module.exports = model('SleepingFrame', SleepingFrame)