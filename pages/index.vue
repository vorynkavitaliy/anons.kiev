<template>
    <main>
        <v-container class="pt-1 pb-3">
            <img class="logo" src="@/assets/images/logo.png" alt="logo" />
            <div class="calc-wrapper m-a p-3">
                <!-- <v-text block class="mb-3"> Дата: </v-text> -->
                <v-layout grid xd="2">
                    <template v-for="(item, i) of rate">
                        <v-layout
                            v-if="item.type == 'GBP' || item.type == 'PLN'"
                            :key="i"
                            flex
                            acenter
                        >
                            <span
                                class="checkbox mb-2"
                                :class="[radioCurrency === i ? 'active' : '']"
                                @click="setRadio('radioCurrency', i, item.type)"
                            >
                                <i></i>
                            </span>
                            <v-input
                                v-model="rate[i].rate"
                                type="number"
                                class="mb-2"
                                :placeholder="item.type | currency"
                                @input="setCurrency"
                            />
                        </v-layout>

                        <span
                            v-else
                            :key="i"
                            class="checkbox mb-2"
                            :class="[radioCurrency === i ? 'active' : '']"
                            @click="setRadio('radioCurrency', i, item.currency)"
                        >
                            <i></i>
                            {{ item.type | currency }}
                            ({{ item.rate.toFixed(2) }})
                        </span>
                    </template>
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
                    Загальний курс: {{ rateResult.toFixed(2) }}
                </v-text>

                <v-text block weight="bold" class="mb-2"> Знижка (-%):</v-text>

                <v-input
                    v-model="commissions"
                    class="mb-2"
                    type="number"
                    :val="commissions"
                    @input="setCurrency"
                />

                <!-- <v-layout flex acenter wrap class="mb-2">
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
                </v-layout> -->

                <v-text block weight="bold" class="mb-2">
                    Комісія (+%):
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
                    :val="price"
                    @input="setCurrency"
                />

                <v-layout grid xd="2">
                    <copy-to-clipboard
                        :text="`${result}грн ${delivery ? '+ вес' : ''}`"
                        @copy="handleCopy"
                    >
                        <v-layout flex acenter class="copy-link">
                            <v-text block weight="bold" class="mr-1">
                                Всього: {{ result }}грн
                                {{ delivery ? '+ вес' : '' }}
                            </v-text>

                            <v-icon icon="copy" w="20px" color="#000" />
                        </v-layout>
                    </copy-to-clipboard>

                    <copy-to-clipboard
                        :text="`${resultOfCurrency}${
                            this.currencies[this.currency]
                        }${delivery ? '+ вес' : ''}`"
                        @copy="handleCopy"
                    >
                        <v-layout flex acenter class="copy-link">
                            <v-text block weight="bold" class="mr-1">
                                Всього: {{ resultOfCurrency
                                }}{{ this.currencies[this.currency] }}
                                {{ delivery ? '+ вес' : '' }}
                            </v-text>

                            <v-icon icon="copy" w="20px" color="#000" />
                        </v-layout>
                    </copy-to-clipboard>
                </v-layout>

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
import VInput from '~/components/v-components/VInput'

export default {
    name: 'Home',
    components: { VInput, CopyToClipboard },
    middleware: ['auth'],
    async asyncData({ store }) {
        const currencyList = []
        const { currency } = await store.dispatch('currency/fetchCurrences')
        const db = await store.dispatch('currency/fetchPairList')
        if (!db) return
        for (const item of db) {
            for (const i of currency) {
                item.currency === i && currencyList.push(item)
            }
        }
        return {
            currencyList,
        }
    },
    data() {
        return {
            rate: [],
            rateResult: null,
            alert: false,
            delivery: false,
            price: 100,
            commissions: 20,
            inputCurrency: 0,
            radioCurrency: 2,
            currency: 'USD',
            radioChangeCurrency: 0,
            radioCommissions: 0,
            radioAdditive: 0,
            result: '',
            resultOfCurrency: '',
            currencies: {
                USD: '$',
                EUR: '€',
                GBP: '£',
                PLN: 'zł',
            },
        }
    },

    computed: {
        cur() {
            return this.$store.getters['currency/currences'].currency
        },

        changeCurrencyList() {
            return this.$store.getters['currency/currences'].changes
        },

        commissionsList() {
            return this.$store.getters['currency/currences'].comisson
        },

        additiveList() {
            return this.$store.getters['currency/currences'].additive
        },
    },

    watch: {
        currencyList() {
            const res = []
            const db = this.$store.getters['currency/currency']
            for (const item of db) {
                for (const i of this.cur) {
                    item.currency === i && res.push(item)
                }
            }
            return res
        },
    },

    created() {
        for (const { currency, saleRate } of this.currencyList) {
            this.rate.push({ type: currency, rate: saleRate })
        }
        this.setCurrency()
    },

    mounted() {
        setInterval(async () => {
            await this.$store.dispatch('currency/fetchPairList')
        }, 1000 * 60)

        setInterval(async () => {
            await this.$store.dispatch('currency/fetchCurrences')
        }, 1000 * 60 * 5)
    },

    methods: {
        setCurrency() {
            if (this.currencyList[this.radioCurrency]) {
                this.rateResult = +this.rate[this.radioCurrency].rate
            } else {
                this.rateResult = +this.radioCurrency
            }

            this.rateResult += this.changeCurrencyList[this.radioChangeCurrency]

            const result =
                +this.price *
                +this.rateResult.toFixed(2) *
                ((100 - this.commissions) / 100).toFixed(2) *
                ((100 + this.additiveList[this.radioAdditive]) / 100).toFixed(2)
            if (result) {
                this.result = Math.ceil(result)
            } else {
                this.result = 0
            }
            this.resultOfCurrency =
                this.price -
                this.price * (this.commissions / 100) +
                this.price * (this.radioAdditive / 100)
        },
        setRadio(value, i, name = null) {
            if (value === 'radioCurrency') {
                this.currency = name
            }

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
    width: fit-content

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
