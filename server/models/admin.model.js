const { model, Schema } = require('mongoose')

const adminSchema = new Schema({
    login: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
    },
})

const AdminModel = model('admins', adminSchema)

module.exports = AdminModel
