<template>
    <div class="alert" :class="type">
        <slot name="custom"></slot>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="sass" scoped>
.alert
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    padding: 8px 20px
    width: fit-content
    border-radius: 8px
    background-color: $info
    color: #fff

    &.success
        background-color: $success

    &.error
        background-color: red

    &.warning
        background-color: $warning
</style>
