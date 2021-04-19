<template>
    <span
        :class="[
            weight,
            color[0] !== '#' && color,
            center && 'center',
            uppercase && 'uppercase',
            block && 'block',
            ...size,
        ]"
        :style="color[0] === '#' && `color: ${color}`"
        @click="$emit('click')"
    >
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: {
        size: {
            type: Array,
            default: () => [],
        },

        weight: {
            type: String,
            default: '',
        },

        uppercase: {
            type: Boolean,
            default: false,
        },

        center: {
            type: Boolean,
            default: false,
        },

        right: {
            type: Boolean,
            default: false,
        },

        color: {
            type: String,
            default: '',
        },

        block: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="sass" scoped>
span
    line-height: em(28px)
    p, span, a
        font-size: inherit
        font-weight: inherit
        color: inherit

.center
    text-align: center

.right
    text-align: right

.bold
    font-weight: 700

.semibold
    font-weight: 600

.medium
    font-weight: 500

.light
    font-weight: 300

.block
    display: block

.uppercase
    text-transform: uppercase

.success
    color: $success

.dark-green
    color: $dark-green
</style>
