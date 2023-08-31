const {model, Schema, ObjectId} = require('mongoose')

const MovementFrame = new Schema({
    tag: {type: String, default: ''},
    description: {type: String, default: ''},
    start: {type: Number, unicode: true, default: Date.now()},
    end: {type: Number, unicode: true, default: null},
    from: {type: String, require: true},
    to: {type: String, default: null}
})

module.exports = model('MovementFrame', MovementFrame)