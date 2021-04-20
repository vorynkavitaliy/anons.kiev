<template>
    <v-layout flex column>
        <h1>Створити користувача</h1>

        <form class="mt-3" @submit.prevent="submit">
            <v-input
                v-model="$v.firstName.$model"
                label="Введіть ім'я"
                type="text"
                placeholder="Введіть ім'я користувача"
                required
                class="mb-3"
                :show-message="!valid.firstName.required"
                :error-message="
                    !valid.firstName.required && 'Ім\'я э обов\'язковим полем'
                "
            />

            <v-input
                v-model="$v.lastName.$model"
                label="Введіть прізвище"
                type="text"
                placeholder="Введіть прізвище користувача"
                required
                class="mb-3"
                :show-message="!valid.lastName.required"
                :error-message="
                    !valid.lastName.required && 'Прізвище э обов\'язковим полем'
                "
            />

            <v-input
                v-model="$v.email.$model"
                label="Адреса електронної пошти"
                type="email"
                placeholder="Введіть адресу електронної пошти"
                required
                class="mb-3"
                :show-message="!valid.email.required || !valid.email.email"
                :error-message="
                    !valid.email.required
                        ? 'Email э обов\'язковим полем'
                        : !valid.email.minLength
                        ? `Email має бути у вігляді example@example.com`
                        : ''
                "
            />

            <v-input
                v-model="$v.password.$model"
                label="Пароль"
                type="password"
                placeholder="Введіть пароль"
                required
                class="mb-3"
                :show-message="
                    !valid.password.required || !valid.password.minLength
                "
                :error-message="
                    !valid.password.required
                        ? 'Пароль являеться обязятельным полем'
                        : !valid.password.minLength
                        ? `Пароль должен быть больше ${$v.password.$params.minLength.min} символов`
                        : ''
                "
            />

            <v-input
                v-model="$v.confirmPassword.$model"
                label="Повторите пароль"
                type="password"
                required
                error-message="Пароли должны быть идентичными."
                :show-message="!valid.confirmPassword"
            />
            <v-btn
                block
                rounded="6"
                bg="#225a22"
                class="p-2 mt-3"
                :disable="loading"
            >
                <span v-if="!loading">Створити користувача</span>
                <v-loader v-else size="20" />
            </v-btn>
        </form>

        <v-alert v-show="alert" :type="error ? 'error' : 'success'">
            {{ error ? error : success }}
        </v-alert>
    </v-layout>
</template>

<script>
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'

export default {
    layout: 'admin',
    // middleware: ['admin'],
    data() {
        return {
            alert: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',

            valid: {
                firstName: true,
                lastName: true,
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minLength: true,
                },
                confirmPassword: true,
            },
        }
    },

    validations: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        password: {
            required,
            minLength: minLength(6),
        },
        confirmPassword: {
            sameAsPassword: sameAs('password'),
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

    methods: {
        async submit() {
            if (
                (this.$v.email.required,
                this.$v.email.email,
                this.$v.password.required,
                this.$v.password.minLength,
                this.$v.confirmPassword.sameAsPassword)
            ) {
                try {
                    const formData = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                    }
                    await this.$store.dispatch('user/createUser', formData)
                    this.loading = false
                    this.showAlert()
                    this.firstName = ''
                    this.lastName = ''
                    this.email = ''
                    this.password = ''
                    this.confirmPassword = ''
                    this.closeReg()
                } catch (error) {
                    this.showAlert()
                    this.loading = false
                }
            } else {
                this.valid.email.required = this.$v.email.required
                this.valid.email.email = this.$v.email.email
                this.valid.password.required = this.$v.password.required
                this.valid.password.minLength = this.$v.password.minLength
                this.valid.confirmPassword = this.$v.confirmPassword.sameAsPassword
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
form
    max-width: 530px
</style>
