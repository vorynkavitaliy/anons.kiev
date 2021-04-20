<template>
    <v-layout flex column>
        <h2>Користувачі</h2>

        <div class="dashboard mt-4">
            <div class="dashboard-head">
                <v-layout grid md="4" class="dashboard-item">
                    <span class="dashboard-content"> Ім'я </span>
                    <span class="dashboard-content"> Прізвище </span>
                    <span class="dashboard-content"> E-mail </span>
                </v-layout>
            </div>

            <div class="dashboard-body">
                <v-layout
                    v-for="(user, i) of users"
                    :key="user.id"
                    grid
                    md="4"
                    class="dashboard-item"
                >
                    <span class="dashboard-content">
                        {{ user.firstName }}
                    </span>

                    <span class="dashboard-content">
                        {{ user.lastName }}
                    </span>

                    <span class="dashboard-content">
                        {{ user.email }}
                    </span>

                    <v-layout grid xd="2">
                        <v-btn
                            rounded="4"
                            bg="#225a22"
                            class="p-1 ml-2 mr-1"
                            @click="openModal(i)"
                        >
                            <v-icon icon="edit" color="#fff" w="20" />
                        </v-btn>
                        <v-btn
                            rounded="4"
                            bg="#ee1d23"
                            class="p-1 ml-1 mr-2"
                            @click="openRemover(user._id)"
                        >
                            <v-icon icon="delete" color="#fff" w="20" />
                        </v-btn>
                    </v-layout>
                </v-layout>
            </div>
        </div>

        <v-alert v-show="alert" :type="error ? 'error' : 'success'">
            {{ error ? error : success }}
        </v-alert>

        <v-modal :is-show="modal">
            <div class="form p-3">
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

                <v-btn
                    block
                    rounded="4"
                    bg="#225a22"
                    class="p-1 mb-1"
                    @click="updateUser"
                >
                    Редагувати
                </v-btn>

                <v-btn
                    block
                    rounded="4"
                    bg="#ee1d23"
                    class="p-1 mb-1"
                    @click="modal = !modal"
                >
                    Закрити
                </v-btn>
            </div>
        </v-modal>

        <v-modal :is-show="modalRemove">
            <v-layout flex column class="from-remover p-3">
                <div class="mb-2">Ви дійсно хочете видалити користувача?</div>
                <v-layout grid xd="2" class="offset-4">
                    <v-btn
                        block
                        rounded="4"
                        bg="#225a22"
                        class="p-1 mb-1"
                        @click="removeUser"
                    >
                        Так
                    </v-btn>

                    <v-btn
                        block
                        rounded="4"
                        bg="#ee1d23"
                        class="p-1 mb-1"
                        @click="modalRemove = !modalRemove"
                    >
                        Ні
                    </v-btn>
                </v-layout>
            </v-layout>
        </v-modal>
    </v-layout>
</template>

<script>
export default {
    layout: 'admin',
    // middleware: ['admin'],
    async asyncData({ store }) {
        const users = await store.dispatch('user/getUsers')
        return {
            users,
        }
    },

    data() {
        return {
            alert: false,
            modal: false,
            modalRemove: false,
            id: null,
            firstName: '',
            lastName: '',
            email: '',
        }
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
        openRemover(id) {
            this.id = id
            this.modalRemove = !this.modalRemove
        },

        async removeUser() {
            await this.$store.dispatch('user/deleteUser', this.id)
            this.users = await this.$store.dispatch('user/getUsers')
            this.modalRemove = !this.modalRemove
            this.showAlert()
        },

        showAlert() {
            this.alert = true

            setTimeout(() => (this.alert = false), 1500)
        },

        openModal(i) {
            this.firstName = this.users[i].firstName
            this.lastName = this.users[i].lastName
            this.email = this.users[i].email
            this.id = this.users[i]._id
            this.modal = !this.modal
        },

        async updateUser() {
            const form = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
            }
            await this.$store.dispatch('user/updateUser', { id: this.id, form })
            this.users = await this.$store.dispatch('user/getUsers')
            this.modal = false
        },
    },
}
</script>

<style lang="sass" scoped>
.dashboard
    background-color: #fff
    border-radius: 6px
    overflow: hidden
    width: fit-content

    &-body, &-head
        .dashboard-item
            padding: 8px
            &:nth-child(2n)
                background-color: rgba(0, 0, 0, 0.1)

    &-head
        .dashboard-content
            font-weight: bold
            color: rgba(0, 0, 0, 0.6)
    &-body
        .dashboard-item
            cursor: pointer

    &-content
        padding: 8px 16px
        display: block

.form
    background-color: #fff
    max-width: 500px
    width: 100%
    border-radius: 8px

.from-remover
    background-color: #fff
    border-radius: 6px
</style>
