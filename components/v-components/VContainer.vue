<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'v-container',
}
</script>

<style lang="sass">
.container
    max-width: 1920px
    margin: auto !important
    +method(width, $sxd: 94%, $msd: 90%, $lmd: 80%, $ld: 75%)
</style>
