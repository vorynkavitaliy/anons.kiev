<template>
    <nav>
        <ul class="flex-container column">
            <li>
                <nuxt-link
                    to="/admin/users"
                    class="link flex-container align-center"
                >
                    <v-icon icon="users" w="24" color="#919499" class="mr-1" />
                    Користувачі
                </nuxt-link>
            </li>

            <li>
                <nuxt-link
                    to="/admin/create"
                    class="link flex-container align-center"
                >
                    <v-icon
                        icon="add-users"
                        w="24"
                        color="#919499"
                        class="mr-1"
                    />
                    Створити користувача
                </nuxt-link>
            </li>

            <li>
                <nuxt-link
                    to="/admin/"
                    exact
                    class="link flex-container align-center"
                >
                    <v-icon icon="group" w="24" color="#919499" class="mr-1" />
                    Загальні дані
                </nuxt-link>
            </li>

            <li>
                <nuxt-link
                    to="/admin/logout"
                    class="link flex-container align-center"
                >
                    <v-icon icon="logout" w="24" color="#919499" class="mr-1" />
                    Вихід
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Aside',
}
</script>

<style lang="sass" scoped>
nav
    width: 100%
    padding: 40px 0px
    border-right: 1px solid #b4b4b4
    height: 100%

    li
        display: block
        margin-bottom: 12px

    .link
        padding: 8px 20px
        color: #919499
        font-weight: bold
        font-size: 16px

        &:hover
            background-color: rgba(0, 0, 0, 0.12)

        &.nuxt-link-active
            background-color: rgb(228, 244, 228)
            color: #5dad5d

            svg
                fill: #5dad5d
</style>
