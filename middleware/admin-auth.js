export default function ({ store, redirect }) {
    if (!store.getters['admin/isAuthenticated']) {
        redirect('/admin/login?message=login')
    }
}
