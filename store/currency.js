const api = `https://boto.agency/api.php?privatBank=1`

export const state = () => ({
    currency: [],
    currencyPair: null,
})

export const mutations = {
    setCurrencyList: (state, payload) => (state.currency = payload),
    setCurrencyPair: (state, payload) => (state.currencyPair = payload),
}

export const actions = {
    async fetchPairList({ commit }) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            const res = await fetch(api)
            const { date, exchangeRate } = await res.json()
            const currency = exchangeRate.filter(
                (item) =>
                    item.currency === 'USD' ||
                    item.currency === 'EUR' ||
                    item.currency === 'GBP' ||
                    item.currency === 'PLZ'
            )
            commit('setCurrencyList', currency)
            commit('setLoading', false, { root: true })
            return { date, currency }
        } catch (error) {
            commit('setError', error.message, { root: true })
            commit('setLoading', false, { root: true })
            throw error.message
        }
    },
}

export const getters = {
    currency: (state) => state.currency,
}
