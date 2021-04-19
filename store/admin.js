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
                '/api/admin/login',
                payload
            )
            dispatch('setToken', token)
            commit('setLoading', false, { root: true })
            commit('setSuccess', 'Вы успешно вошли в аккаунт', { root: true })
            this.router.push('/admin')
        } catch (e) {
            commit('setError', 'Вы не верно ввели данные', { root: true })
            commit('setLoading', false, { root: true })
            throw e
        }
    },

    async create({ commit }, payload) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            await this.$axios.$post('/api/admin/create', payload)
            commit('setLoading', false, { root: true })
            commit('setSuccess', 'Ви успішно створили користувача', {
                root: true,
            })
            this.$router.push('/admin/users')
        } catch (e) {
            commit(
                'setError',
                'Ви не вірно ввели дані або користувач з таким E-mail вже э',
                { root: true }
            )
            commit('setLoading', false, { root: true })
            throw e
        }
    },

    setToken({ commit }, token) {
        this.$axios.setToken(token, 'Bearer')
        commit('setToken', token)
        Cookies.set('jwt-admin-token', token)
    },

    logout({ commit }) {
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-admin-token')
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
