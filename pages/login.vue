<template>
    <main>
        <v-container class="pt-10">
            <div ref="form" class="from-container pv-6 ph-3">
                <form @submit.prevent="submitLogin">
                    <v-input
                        v-model="email"
                        label="Адреса електронної пошти"
                        placeholder="Введіть адресу електронної пошти"
                        type="email"
                        required
                        :show-message="
                            !valid.email.required || !valid.email.email
                        "
                        :error-message="
                            !valid.email.required
                                ? 'Email являеться обязятельным полем'
                                : !valid.email.minLength
                                ? `Email должен быть в виде example@example.com`
                                : ''
                        "
                        class="mb-3"
                    />

                    <v-input
                        v-model="password"
                        label="Пароль"
                        type="password"
                        placeholder="Введіть пароль"
                        required
                    />

                    <v-btn
                        block
                        rounded="6"
                        :disable="loading"
                        class="p-2 mt-3"
                    >
                        <span v-if="!loading">Войти</span>
                        <v-loader v-else size="20" />
                    </v-btn>
                </form>
            </div>
        </v-container>
        <v-alert v-show="alert" :type="error ? 'error' : 'success'">
            {{ error ? error : success }}
        </v-alert>
    </main>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
    name: 'Auth',
    data() {
        return {
            alert: false,
            disableReg: true,
            disableLog: true,
            email: '',
            password: '',

            valid: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minLength: true,
                },
            },
        }
    },

    validations: {
        email: { required, email },
        password: {
            required,
            minLength: minLength(6),
        },
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

    mounted() {
        setTimeout(() => {
            this.$refs.form.style.opacity = 1
            this.$refs.form.style.transform = 'translateY(0px)'
        }, 300)
    },
    methods: {
        async submitLogin() {
            try {
                const formData = {
                    email: this.email,
                    password: this.password,
                }

                await this.$store.dispatch('auth/login', formData)
                this.showAlert()
                this.loading = false
                this.$router.push('/')
            } catch (error) {
                this.showAlert()
                this.loading = false
            }
        },

        showAlert() {
            this.alert = true

            setTimeout(() => (this.alert = false), 1500)
        },
    },
}
</script>

<style lang="sass" scoped>
main
    background-color: #1a2538
    min-height: 100vh

.from-container
    opacity: 0
    overflow: hidden
    transform: translateY(-30px)
    transition: .3s ease
    max-width: 600px
    width: 100%
    background-color: #fff
    margin: auto
    border-radius: 6px
    position: relative

form
    width: 90%
    margin: auto

.registate-form
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: auto
    transform: translateX(95%)
    background-color: $primary
    cursor: pointer
    transition: .3s ease
    z-index: 2
    color: #fff

    input
        color: #fff

    input::-webkit-input-placeholder, input::-moz-placeholder, input:-moz-placeholder, input:-ms-input-placeholder
        color: #fff !important

    .spacer
        position: absolute
        top: 0
        left: 0
        width: 40px
        height: 100%
        z-index: 1

    .close-btn
        font-size: 30px
        background-color: #1a2538
        cursor: pointer
        border-radius: 50%
        width: 34px
        height: 34px
        line-height: 0
        display: flex
        align-items: center
        justify-content: center
        transition: .3s ease

        &:hover
            transform: scale(1.05)

        &:active
            transform: scale(.9)

    &:hover
        transform: translateX(93%)

    &.active
        transform: translateX(6%)
        cursor: auto
        &:hover
            transform: translateX(6%)
</style>
