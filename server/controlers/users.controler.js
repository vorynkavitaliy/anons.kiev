const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.loginUser = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            candidate.password
        )

        if (isPasswordCorrect) {
            const token = jwt.sign(
                {
                    email: candidate.email,
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

module.exports.createUser = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        res.status(409).json({ message: 'This email has been use' })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
        })

        await user.save()
        res.status(201).json(user)
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ email: -1 })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getUsertById = async (req, res) => {
    try {
        User.findById(req.params.id).exec((error, post) =>
            res.status(200).json(post)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateUser = async (req, res) => {
    const $set = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    }
    try {
        const user = await User.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            { $set },
            { new: true }
        )

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.removeUser = async (req, res) => {
    try {
        await User.deleteOne({
            _id: req.params.id,
        })
        res.json({ message: 'User removed' })
    } catch (error) {
        res.status(500).json(error)
    }
}
