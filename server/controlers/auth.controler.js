const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
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
        res.status(409).json({ message: 'This login has been use' })
    } else {
        console.log(req.body.email)
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
        })

        await user.save()
        res.status(201).json(user)
    }
}
