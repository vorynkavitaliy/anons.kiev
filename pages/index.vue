<template>
    <main>
        <v-container class="pt-1 pb-3">
            <img class="logo" src="@/assets/images/logo.png" alt="logo" />
            <div class="calc-wrapper m-a p-3">
                <!-- <v-text block class="mb-3"> Дата: </v-text> -->
                <v-layout grid xd="2">
                    <span
                        v-for="(item, i) of currencyList"
                        :key="i"
                        class="checkbox mb-2"
                        :class="[radioCurrency === i ? 'active' : '']"
                        @click="setRadio('radioCurrency', i)"
                    >
                        <i></i>
                        {{ item.currencyCodeA | currency }}

                        ({{
                            item.rateSell
                                ? (+item.rateSell).toFixed(2)
                                : (+item.rateCross).toFixed(2)
                        }})
                    </span>
                </v-layout>

                <v-layout flex acenter wrap class="mb-2">
                    <span
                        v-for="(item, i) of changeCurrencyList"
                        :key="i"
                        :class="[radioChangeCurrency === i ? 'active' : '']"
                        class="radiobox mr-3"
                        @click="setRadio('radioChangeCurrency', i)"
                    >
                        <i></i>
                        +{{ item }}
                    </span>
                </v-layout>

                <v-text block weight="medium" class="mb-2">
                    Загальний курс: {{ +rate.toFixed(2) }}
                </v-text>

                <v-text block weight="bold" class="mb-2">
                    Комісія (-%):
                </v-text>

                <v-layout flex acenter wrap class="mb-2">
                    <span
                        v-for="(item, i) of commissionsList"
                        :key="i"
                        :class="[radioCommissions === i ? 'active' : '']"
                        class="radiobox mr-3"
                        @click="setRadio('radioCommissions', i)"
                    >
                        <i></i>
                        {{ item }}%
                    </span>
                </v-layout>

                <v-text block weight="bold" class="mb-2">
                    Надбавка (+%):
                </v-text>

                <v-layout flex acenter wrap class="mb-2">
                    <span
                        v-for="(item, i) of additiveList"
                        :key="i"
                        :class="[radioAdditive === i ? 'active' : '']"
                        class="radiobox mr-3"
                        @click="setRadio('radioAdditive', i)"
                    >
                        <i></i>
                        {{ item }}%
                    </span>
                </v-layout>

                <v-text
                    class="checkbox mb-2"
                    :class="{ active: delivery }"
                    @click="delivery = !delivery"
                >
                    <i></i>
                    + вес
                </v-text>

                <v-input
                    v-model="price"
                    label="Вартість товару"
                    class="mb-2"
                    type="number"
                    @input="setCurrency"
                />

                <copy-to-clipboard
                    :text="`${result}грн ${delivery ? '+ вес' : ''}`"
                    @copy="handleCopy"
                >
                    <v-layout flex acenter class="copy-link">
                        <v-text block weight="bold" class="mr-1">
                            Всього: {{ result }}грн
                            {{ delivery ? '+ вес' : '' }}</v-text
                        >

                        <v-icon icon="copy" w="20px" color="#000" />
                    </v-layout>
                </copy-to-clipboard>

                <v-text block center class="mt-3">
                    <a href="tel:+380952811599">Андрощук В. 0952811599</a>
                </v-text>
            </div>
        </v-container>

        <v-alert v-show="alert" type="success">Дані скопійовано</v-alert>
    </main>
</template>

<script>
import CopyToClipboard from 'vue-copy-to-clipboard'
export default {
    name: 'Home',
    components: { CopyToClipboard },
    middleware: ['auth'],
    async asyncData({ store }) {
        const currencyList = []
        const { currency, changes, comisson, additive } = await store.dispatch(
            'currency/fetchCurrences'
        )
        const db = await store.dispatch('currency/fetchPairList')
        for (const item of db) {
            for (const i of currency) {
                item.currencyCodeA === i && currencyList.push(item)
            }
        }
        return {
            currencyList,
            cur: currency,
            changeCurrencyList: changes,
            commissionsList: comisson,
            additiveList: additive,
        }
    },
    data() {
        return {
            rate: null,
            alert: false,
            delivery: false,
            price: 100,
            radioCurrency: 0,
            radioChangeCurrency: 0,
            radioCommissions: 0,
            radioAdditive: 0,
            result: '',
        }
    },

    created() {
        this.rate = this.currencyList[this.radioCurrency].rateSell
            ? (+this.currencyList[this.radioCurrency].rateSell).toFixed(2)
            : (+this.currencyList[this.radioCurrency].rateCross).toFixed(2)
        this.setCurrency()
    },

    mounted() {
        setTimeout(async () => {
            const res = []
            const db = await this.$store.dispatch('currency/fetchPairList')
            for (const item of db) {
                for (const i of this.cur) {
                    item.currencyCodeA === i && res.push(item)
                }
            }
            this.currencyList = res
        }, 1000 * 60 * 5)
    },

    methods: {
        setCurrency() {
            const rateSell = this.currencyList[this.radioCurrency].rateSell
                ? (+this.currencyList[this.radioCurrency].rateSell).toFixed(2)
                : (+this.currencyList[this.radioCurrency].rateCross).toFixed(2)
            this.rate =
                +rateSell + this.changeCurrencyList[this.radioChangeCurrency]
            const result =
                +this.price.toFixed(2) *
                +this.rate.toFixed(2) *
                (
                    (100 - this.commissionsList[this.radioCommissions]) /
                    100
                ).toFixed(2) *
                ((100 + this.additiveList[this.radioAdditive]) / 100).toFixed(2)
            this.result = Math.floor(result)
        },
        setRadio(value, i) {
            this[value] = i
            this.setCurrency()
        },
        handleCopy() {
            this.alert = true
            setTimeout(() => (this.alert = false), 400)
        },
    },
}
</script>

<style lang="sass" scoped>
main
    background-color: rgba(0, 0, 0, 0.6)
    min-height: 100vh

.logo
    max-width: 240px
    display: block
    margin: auto

.calc-wrapper
    background-color: #fff
    max-width: 600px
    border-radius: 8px

.checkbox, .radiobox
    position: relative
    display: flex
    align-items: center
    cursor: pointer

    i
        display: block
        width: 20px
        height: 20px
        position: relative
        border: 1px solid #b5b5b5
        border-radius: 3px
        margin-right: 8px

.checkbox
    &.active
        i
            background-color: $success
            border: 1px solid $success
            &::after
                opacity: 1

    i
        &::after
            content: ""
            display: block
            height: 50%
            width: 35%
            border-right: 1px solid #fff
            border-bottom: 1px solid #fff
            transform: rotate(37deg) translate(-50%, -50%)
            position: absolute
            top: 44%
            left: 32%
            opacity: 0
            transition: .2s ease


.radiobox
    &.active
        i
            border: 4px solid $success
    i
        border-radius: 50%

.copy-link
    cursor: pointer

.sale-rate
    label
        display: block
        margin: 0 0 10px
        font-size: 11px
        line-height: 1
        text-transform: uppercase
        letter-spacing: .1em

    input, .sale-button
        outline: none
        display: block
        background: rgba(#000, 0.1)
        width: 100%
        border: 0
        box-sizing: border-box
        padding: 12px 20px
        font-family: inherit
        font-size: inherit
        line-height: inherit
        transition: 0.3s ease

    .sale-button
        background: rgba(#000, 0.3)
        min-width: 30px
        width: 50px
        cursor: pointer
        text-align: center
        padding: 12px 0px
        border-radius: 4px
</style>
