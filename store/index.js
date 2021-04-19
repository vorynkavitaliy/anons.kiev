export const state = () => ({
    loading: false,
    error: null,
    success: null,
    alert: null,
})

export const mutations = {
    setLoading: (state, payload) => (state.loading = payload),
    setAlert: (state, payload) => (state.alert = payload),
    setError: (state, payload) => (state.error = payload),
    setSuccess: (state, payload) => (state.success = payload),
    clearError: (state) => (state.error = null),
}

export const actions = {
    setLoading: ({ commit }, payload) => commit('setLoading', payload),
    setError: ({ commit }, payload) => commit('setError', payload),
    setSuccess: ({ commit }, payload) => commit('setSuccess', payload),
    clearError: ({ commit }) => commit('clearError'),
    nuxtServerInit: ({ dispatch }) => dispatch('auth/autoLogin'),
}

export const getters = {
    loading: (state) => state.loading,
    alert: (state) => state.alert,
    error: (state) => state.error,
    success: (state) => state.success,
}
