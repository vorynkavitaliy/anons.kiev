const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
    },
})

const UserModel = model('users', userSchema)

module.exports = UserModel
