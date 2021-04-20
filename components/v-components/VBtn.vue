<template>
    <span
        v-if="tag === 'span'"
        class="btn"
        :class="[
            bg[0] !== '#' && bg,
            rounded && `rounded-${rounded}`,
            block && 'block',
            disable && 'disable',
        ]"
        :style="bg[0] === '#' && `background-color: ${bg}`"
        @click="handleClick"
    >
        <slot></slot>
    </span>
    <a
        v-else-if="tag === 'a'"
        class="btn"
        :class="[
            bg[0] !== '#' && bg,
            rounded && `rounded-${rounded}`,
            block && 'block',
            disable && 'disable',
        ]"
        :style="bg[0] === '#' && `background-color: ${bg}`"
        :href="href"
        @click="handleClick"
    >
        <slot></slot>
    </a>

    <button
        v-else
        class="btn"
        :class="[
            bg[0] !== '#' && bg,
            rounded && `rounded-${rounded}`,
            block && 'block',
            disable && 'disable',
        ]"
        :style="bg[0] === '#' && `background-color: ${bg}`"
        :disabled="disable"
        @click="handleClick"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'button',
        },
        bg: {
            type: String,
            default: 'primary',
        },

        color: {
            type: String,
            default: '#fff',
        },

        disable: {
            type: Boolean,
            default: false,
        },

        href: {
            type: String,
            default: '#',
        },

        rounded: {
            type: String,
            default: '0',
        },

        block: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
}
</script>

<style lang="sass" scoped>
.btn
    font-size: 16px
    border-radius: rem(6px, $dw-ld)
    color: #fff

    &.primary
        background-color: $primary

    &.warning
        background-color: $warning

    &.success
        background-color: $success
        &:hover
            background-color: rgba(72, 163, 87, .7)

    &.danger
        background-color: $danger

    &.info
        background-color: $info

    &.disable
        background-color: #b5b5b5
        cursor: no-drop

    &.block
        display: block
        width: 100%

    &.rounded
        @for $i from 4 through 18
            &-#{$i}
                border-radius: #{$i}px
</style>
