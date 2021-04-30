import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
    token: null,
})

export const mutations = {
    setToken: (state, payload) => (state.token = payload),
    clearToken: (state) => (state.token = null),
}

export const actions = {
    async login({ commit, dispatch }, payload) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            const { token } = await this.$axios.$post(
                '/api/users/login',
                payload
            )
            dispatch('setToken', token)
            commit('setLoading', false, { root: true })
            commit('setSuccess', 'Вы успешно вошли в аккаунт', { root: true })
        } catch (e) {
            commit('setError', 'Вы не верно ввели данные', { root: true })
            commit('setLoading', false, { root: true })
            throw e
        }
    },

    setToken({ commit }, token) {
        this.$axios.setToken(token, 'Bearer')
        commit('setToken', token)
        Cookies.set('jwt-token', token, { expires: 365 })
    },

    logout({ commit }) {
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-token')
    },

    async createUser({ commit }, payload) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            await this.$axios.$post('/api/auth/admin/create', payload)
            commit('setLoading', false, { root: true })
            commit('setSuccess', 'Вы успешно зарешестрировались', {
                root: true,
            })
        } catch (e) {
            commit(
                'setError',
                'Вы не верно ввели данные или такой email уже существует',
                { root: true }
            )
            commit('setLoading', false, { root: true })
            throw e
        }
    },

    autoLogin({ dispatch }) {
        const cookieStr = process.browser
            ? document.cookie
            : this.app.context.req.headers.cookie

        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies['jwt-token'] || ''

        if (isJWTValid(token)) {
            dispatch('setToken', token)
        } else {
            dispatch('logout')
        }
    },
}
export const getters = {
    isAuthenticated: (state) => !!state.token,
    token: (state) => state.token,
}

function isJWTValid(token) {
    if (!token) {
        return false
    }

    const jwtData = jwtDecode(token) || {}
    const expires = jwtData.exp || 0

    return new Date().getTime() / 1000 < expires
}
