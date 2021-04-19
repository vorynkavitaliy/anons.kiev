<template>
    <v-layout flex column class="v-card pv-2 ph-4">
        <h2 class="title mb-2">{{ user.firstName }} {{ user.lastName }}</h2>
        <a :href="`mailto:${user.email}`" class="link mb-2">{{ user.email }}</a>
        <v-btn
            block
            rounded="4"
            bg="#225a22"
            class="p-1 mb-1"
            @click="modal = !modal"
        >
            Редагувати
        </v-btn>
        <v-btn block rounded="4" bg="#ee1d23" class="p-1" @click="removeUser">
            Видалити
        </v-btn>
        <v-alert v-show="alert" :type="error ? 'error' : 'success'">
            {{ error ? error : success }}
        </v-alert>

        <v-modal :is-show="modal">
            <form class="p-3" @submit.prevent="updateUser">
                <v-input
                    v-model="firstName"
                    label="Введіть ім'я"
                    type="text"
                    placeholder="Введіть ім'я користувача"
                    required
                    class="mb-3"
                />

                <v-input
                    v-model="lastName"
                    label="Введіть прізвище"
                    type="text"
                    placeholder="Введіть прізвище користувача"
                    required
                    class="mb-3"
                />

                <v-input
                    v-model="email"
                    label="Адреса електронної пошти"
                    type="email"
                    placeholder="Введіть адресу електронної пошти"
                    required
                    class="mb-3"
                />

                <v-btn block rounded="4" bg="#225a22" class="p-1 mb-1">
                    Редагувати
                </v-btn>
            </form>
        </v-modal>
    </v-layout>
</template>

<script>
export default {
    layout: 'admin',
    // middleware: ['admin-auth'],
    async asyncData({ store, params }) {
        const user = await store.dispatch('user/getUserById', params.id)
        return {
            user,
        }
    },

    data() {
        return {
            alert: false,
            modal: false,
            firstName: '',
            lastName: '',
            email: '',
        }
    },

    mounted() {
        this.firstName = this.user.firstName
        this.lastName = this.user.lastName
        this.email = this.user.email
    },

    computed: {
        loading() {
            return this.$store.getters.loading
        },

        error() {
            return this.$store.getters.error
        },

        success() {
            return this.$store.getters.success
        },
    },

    methods: {
        removeUser() {
            this.$store.dispatch('user/deleteUser', this.user._id)
            this.showAlert()
        },

        showAlert() {
            this.alert = true

            setTimeout(() => (this.alert = false), 1500)
        },

        updateUser() {
            const form = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
            }
            this.$store.dispatch('user/updateUser', { id: this.user._id, form })
            // this.user = this.$store.dispatch('getUserById', this.user._id)
            this.modal = false
        },
    },
}
</script>

<style lang="sass" scoped>
.v-card
    background-color: #fff
    border-radius: 8px
    width: fit-content
.title
    font-size: 38px
    font-weight: bold
    text-transform: capitalize

.link
    font-size: 24px
    text-decoration: underline
    display: block

form
    background-color: #fff
    max-width: 500px
    width: 100%
    border-radius: 8px
</style>
