<template>
    <main>
        <v-container class="pt-10">
            <div class="calc-wrapper m-a p-3">
                <v-text block class="mb-3"> Дата: {{ date }} </v-text>
                <v-layout grid xd="2">
                    <span
                        v-for="(item, i) of currency"
                        :key="i"
                        class="checkbox mb-2"
                        :class="[radioCurrency === i ? 'active' : '']"
                        @click="setRadio('radioCurrency', i)"
                    >
                        <i></i>
                        {{ item.currency | currency }}

                        ({{ item.saleRateNB.toFixed(2) }})
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
                    Загальний курс: {{ rate }}
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
    middleware: ['admin-auth'],
    async asyncData({ store }) {
        const { date, currency } = await store.dispatch(
            'currency/fetchPairList'
        )
        return {
            date,
            currency,
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
            changeCurrencyList: [0, 0.2, 0.5, 1],
            commissionsList: [0, 5, 7, 10, 15],
            additiveList: [0, 5, 7, 10, 15],
            result: '',
        }
    },

    created() {
        this.rate = this.currency[this.radioCurrency].saleRateNB.toFixed(2)
        this.setCurrency()
    },

    methods: {
        setCurrency() {
            this.rate = (
                this.currency[this.radioCurrency].saleRateNB +
                this.changeCurrencyList[this.radioChangeCurrency]
            ).toFixed(2)

            const result =
                +this.price *
                +this.rate *
                ((100 - this.commissionsList[this.radioCommissions]) / 100) *
                ((100 + this.additiveList[this.radioAdditive]) / 100)

            this.result = result.toFixed(2)
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
