const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const keys = require('../keys')
const User = require('../models/user.model')
const Code = require('../models/code.model')
const emailService = require('../nodemailer')

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
    try {
        const candidate = await User.findOne({ email: req.body.email })

        if (candidate) {
            res.status(409).json({ message: 'This login has been use' })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const newUser = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt),
            })

            const user = await newUser.save()
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                },
                keys.JWT,
                { expiresIn: 60 * 60 }
            )
            req.session.token = token
            res.json({
                success: true,
                userId: user._id,
            })

            const baseUrl = req.protocol + '://' + req.get('host')
            const secretCode = '123'
            // const newCode = new Code({
            //     code: secretCode,
            //     email: user.email,
            // })
            // await newCode.save()

            const data = {
                from: `YOUR NAME <anonsKiev>`,
                to: user.email,
                subject: 'Your Activation Link for YOUR APP',
                text: `Please use the following link within the next 10 minutes to activate your account on YOUR APP: ${baseUrl}/api/auth/verification/verify-account/${user._id}/${secretCode}`,
                html: `<p>Please use the following link within the next 10 minutes to activate your account on YOUR APP: <strong><a href="${baseUrl}/api/auth/verification/verify-account/${user._id}/${secretCode}" target="_blank">Email bestätigen</a></strong></p>`,
            }
            await emailService.sendMail(data)

            res.json({
                success: true,
                userId: user._id,
            })

            res.status(200).json({ message: 'Account was created' })
        }
    } catch (error) {
        console.log('Error on /api/auth/createUser: ', error)
        res.status(401).json({ message: 'Error' })
        res.json({ success: false, error })
    }
}
