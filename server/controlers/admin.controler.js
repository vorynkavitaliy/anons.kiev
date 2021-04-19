const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const Admin = require('../models/admin.model')

module.exports.loginAdmin = async (req, res) => {
    const candidate = await Admin.findOne({ login: req.body.login })

    if (candidate) {
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            candidate.password
        )

        if (isPasswordCorrect) {
            const token = jwt.sign(
                {
                    login: candidate.login,
                    userId: candidate._id,
                },
                keys.JWT,
                { expiresIn: 60 * 60 }
            )
            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: 'Password not valid' })
        }
    } else {
        res.status(404).json({ message: 'User not found' })
    }
}

module.exports.createAdmin = async (req, res) => {
    const candidate = await Admin.findOne({ login: req.body.login })

    if (candidate) {
        res.status(409).json({ message: 'This login has been use' })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const user = new Admin({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, salt),
        })

        await user.save()
        res.status(201).json(user)
    }
}