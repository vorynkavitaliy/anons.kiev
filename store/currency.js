const api = `https://api.monobank.ua/bank/currency`

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
            let data = await res.json()
            commit('setCurrencyList', data)
            commit('setLoading', false, { root: true })
            if (data) {
                data = data.filter((item) => item.currencyCodeB === 980)
            }
            return data
        } catch (error) {
            commit('setError', error.message, { root: true })
            commit('setLoading', false, { root: true })
            throw error.message
        }
    },

    async fetchCurrences({ commit }) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            const res = await this.$axios.$get('/api/currency')
            commit('setLoading', false, { root: true })
            return res[0]
        } catch (error) {
            commit('setError', error.message, { root: true })
            commit('setLoading', false, { root: true })
            throw error.message
        }
    },

    async updateCurrences({ commit }, form) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            await this.$axios.$put('/api/currency', form)
            commit('setLoading', false, { root: true })
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
