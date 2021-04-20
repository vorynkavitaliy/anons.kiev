export default function ({ $axios, redirect, store }) {
    const AUTH = 'Authorization'
    $axios.interceptors.request.use((request) => {
        if (
            store.getters['admin/isAuthenticated'] &&
            !request.headers.common[AUTH]
        ) {
            const token = store.getters['admin/token']
            request.headers.common[AUTH] = `Bearer ${token}`
        }

        return request
    })

    $axios.onError((error) => {
        if (error.response) {
            if (error.response.statis === 401) {
                redirect('/admin/login?message=session')
                store.dispatch('admin/logout')
            }

            if (error.response.status === 500) {
                return error.response.status
            }
        }
    })
}
