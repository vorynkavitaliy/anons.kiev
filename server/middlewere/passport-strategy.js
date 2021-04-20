const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../keys')
const Admin = require('../models/admin.model')

// Autherization: Bearer
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT,
}

module.exports = new JwtStrategy(options, async (payload, done) => {
    try {
        const candidate = await Admin.findById(payload.userId).select('id')

        if (candidate) {
            done(null, candidate)
        } else {
            done(null, false)
        }
    } catch (error) {
        console.error(error)
    }
})
