<template>
    <v-layout v-if="isShow" flex acenter jcenter class="v-modal">
        <slot></slot>
    </v-layout>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="sass" scoped>
.v-modal
    position: fixed
    background-color: rgba(0, 0, 0, 0.5)
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
