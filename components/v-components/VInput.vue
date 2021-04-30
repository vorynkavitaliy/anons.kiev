<template>
    <v-layout flex column class="input-wrapper">
        <label v-if="label" for="input">{{ label }}</label>

        <input
            :type="type"
            :required="required"
            :name="name"
            :placeholder="placeholder"
            :readonly="readonly"
            :step="step"
            :value="val"
            :min="min"
            :max="max"
            @input="$emit('input', $event.target.value)"
            @click="click"
            @change="change"
            @blur="blur"
        />

        <span v-if="errorMessage && showMessage" class="input-error">
            {{ errorMessage }}
        </span>
    </v-layout>
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'input',
    },
    props: {
        label: {
            type: String,
            default: '',
        },

        val: {
            default: '',
        },

        required: {
            type: Boolean,
            default: false,
        },

        type: {
            type: String,
            default: 'text',
        },

        name: {
            type: String,
            default: '',
        },

        errorMessage: {
            type: String,
            default: '',
        },

        showMessage: {
            type: Boolean,
            default: false,
        },

        readonly: {
            type: Boolean,
            default: false,
        },

        placeholder: {
            type: String,
            default: '',
        },

        step: {
            type: Number,
            default: 1,
        },

        min: {
            type: Number,
            default: 0,
        },

        max: {
            type: Number,
            default: 100,
        },
    },

    methods: {
        click() {
            this.$emit('click')
        },

        change() {
            this.$emit('change')
        },

        blur() {
            this.$emit('blur')
        },
    },
}
</script>
<style lang="sass" scoped>
.input-wrapper

    label
        display: block
        margin: 0 0 10px
        font-size: 11px
        line-height: 1
        text-transform: uppercase
        letter-spacing: .1em

    input
        outline: none
        display: block
        background: rgba(#000, 0.1)
        width: 100%
        border: 0
        border-radius: 4px
        box-sizing: border-box
        padding: 12px 20px
        font-family: inherit
        font-size: inherit
        line-height: inherit
        transition: 0.3s ease

    .input-error
        color: red
        font-size: 10px
        display: block
        margin-top: 4px
</style>
