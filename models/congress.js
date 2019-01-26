const mongoose = require('mongoose')

const congressSchema = new mongoose.Schema({
    title: {type: String, required: true},
    quote: {type: String, required: true},
    // type: {type: String, required: true},
    quoteReference: String,
    quoteLink: String,
    description: String,
    imgUrl: String
})

congressSchema.set('timestamps', true)
congressSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

module.exports = mongoose.model('Congress', congressSchema)