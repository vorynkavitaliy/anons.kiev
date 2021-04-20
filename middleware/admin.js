export default function ({ store, redirect }) {
    if (store.getters['admin/isAuthenticated']) {
        return redirect('/admin/login?message=login')
    }
}
