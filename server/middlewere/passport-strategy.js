const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../keys')
const User = require('../models/user.model')

// Autherization: Bearer
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT,
}

module.exports = new JwtStrategy(options, async (payload, done) => {
    try {
        const candidate = await User.findById(payload.userId).select('id')

        if (candidate) {
            done(null, candidate)
        } else {
            done(null, false)
        }
    } catch (error) {
        console.error(error)
    }
})
