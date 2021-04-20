export const state = () => ({})

export const mutations = {
    setToken: (state, payload) => (state.token = payload),
}

export const actions = {
    async createUser({ commit }, payload) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            await this.$axios.$post('/api/users/admin/create', payload)
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

    async getUsers({ commit }) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            const users = await this.$axios.$get('/api/users/admin/users')
            commit('setLoading', false, { root: true })
            return users
        } catch (e) {
            commit('setError', 'Упс... щось пішло не так', { root: true })
            commit('setLoading', false, { root: true })
            throw e
        }
    },

    async getUserById({ commit }, id) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            const user = await this.$axios.$get(`/api/users/admin/user/${id}`)
            commit('setLoading', false, { root: true })
            return user
        } catch (e) {
            commit('setError', 'Упс... щось пішло не так', { root: true })
            commit('setLoading', false, { root: true })
            throw e
        }
    },

    async updateUser({ commit }, { id, form }) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            await this.$axios.$put(`/api/users/admin/user/${id}`, form)
            commit('setLoading', false, { root: true })
            commit('setSuccess', 'Ви оновили дані користувача', {
                root: true,
            })
        } catch (e) {
            commit('setError', 'Упс... щось пішло не так', { root: true })
            commit('setLoading', false, { root: true })
            throw e
        }
    },

    async deleteUser({ commit }, id) {
        commit('clearError', null, { root: true })
        commit('setLoading', true, { root: true })
        try {
            await this.$axios.$delete(`/api/users/admin/user/${id}`)
            commit('setLoading', false, { root: true })
            commit('setSuccess', 'Ви видалил користувача', {
                root: true,
            })
        } catch (e) {
            commit('setError', 'Упс... щось пішло не так', { root: true })
            commit('setLoading', false, { root: true })
            throw e
        }
    },
}
