const { model, Schema } = require('mongoose')

const dataSchema = new Schema({
    id: {
        type: Number,
        default: 1,
    },

    currency: [String],

    changes: [Number],

    comisson: [Number],

    additive: [Number],
})

module.exports = model('currency', dataSchema)
