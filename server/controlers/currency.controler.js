const Currency = require('../models/currency.model')

module.exports.getCurrences = async (req, res) => {
    try {
        const currencies = await Currency.find()
        res.status(200).json(currencies)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateCurrences = async (req, res) => {
    const date = {
        currency: req.body.currency,
        changes: req.body.changes.sort((a, b) => a - b),
        comisson: req.body.comisson.sort((a, b) => a - b),
        additive: req.body.additive.sort((a, b) => a - b),
    }
    try {
        const currences = await Currency.findOneAndUpdate(
            { id: 1 },
            { $set: date }
        )

        res.status(200).json(currences)
    } catch (error) {
        res.status(500).json(error)
    }
}
