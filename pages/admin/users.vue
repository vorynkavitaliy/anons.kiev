<template>
    <v-layout flex column>
        <h2>Користувачі</h2>

        <div class="dashboard mt-4">
            <div class="dashboard-head">
                <v-layout grid md="3" class="dashboard-item">
                    <span class="dashboard-content"> Ім'я </span>
                    <span class="dashboard-content"> Прізвище </span>
                    <span class="dashboard-content"> E-mail </span>
                </v-layout>
            </div>

            <div class="dashboard-body">
                <v-layout
                    v-for="user of users"
                    :key="user.id"
                    grid
                    md="3"
                    class="dashboard-item"
                    @click="$router.push(`/admin/user/${user._id}`)"
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
                </v-layout>
            </div>
        </div>
    </v-layout>
</template>

<script>
export default {
    layout: 'admin',
    // middleware: ['admin-auth'],
    async asyncData({ store }) {
        const users = await store.dispatch('user/getUsers')
        return {
            users,
        }
    },
}
</script>

<style lang="sass" scoped>
.dashboard
    background-color: #fff
    border-radius: 6px
    overflow: hidden

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
</style>
