<template>
    <div class="preloader">
        <div
            class="loader"
            :style="size && `width: ${size}px; height: ${size}px`"
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="scss" scoped>
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.preloader {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
}

.loader {
    margin: auto;
    width: 70px;
    height: 70px;
    border: 2px solid #4c4c4c;
    border-radius: 50%;
    border-top-color: #fff;
    animation: 1s spin infinite ease-in-out;
}
</style>
