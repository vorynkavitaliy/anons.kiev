export default function ({ $axios, redirect, store }) {
    const AUTH = 'Authorization'
    $axios.interceptors.request.use((request) => {
        if (
            store.getters['auth/isAuthenticated'] &&
            !request.headers.common[AUTH]
        ) {
            const token = store.getters['auth/token']
            request.headers.common[AUTH] = `Bearer ${token}`
        }

        return request
    })

    $axios.onError((error) => {
        if (error.response) {
            if (error.response.statis === 401) {
                redirect('/login?message=session')
                store.dispatch('auth/logout')
            }

            if (error.response.status === 500) {
                return error.response.status
            }
        }
    })
}
