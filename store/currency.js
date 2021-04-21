const api = `https://boto.agency/api.php?boto=1`

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
            if (!res.ok) return
            const rate = await res.json()
            commit('setCurrencyList', rate)
            commit('setLoading', false, { root: true })
            return rate
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
            commit('setSuccess', 'Ви успішно зберегли зміни', { root: true })
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
