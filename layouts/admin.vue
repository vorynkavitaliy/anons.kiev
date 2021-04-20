<template>
    <div class="admin-layout">
        <v-layout flex class="admin-container">
            <section class="aside">
                <Aside />
            </section>

            <section class="content">
                <Nuxt />
            </section>
        </v-layout>
    </div>
</template>

<script>
import Aside from '~/components/admin/Aside.vue'
export default {
    components: { Aside },
}
</script>

<style lang="sass" scoped>
.admin-layout
    height: 100vh
    width: 100%

.admin-container
    height: 100%

.aside
    max-width: 280px
    width: 100%
    height: 100%

.content
    flex-grow: 1
    min-height: 100%
    background-color: #b6b6b6
    padding: 20px
    width: 100%
    overflow: auto
</style>
