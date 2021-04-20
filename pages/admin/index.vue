<template>
    <v-layout flex column class="main">
        <h2>Загальні дані</h2>

        <v-layout grid md="2" class="data-wrapper offset-2 p-2 mt-3">
            <div>
                <v-text color="#000">Додати валюту</v-text>

                <div class="dropdown-block">
                    <span class="current-link" @click="openList">
                        {{ currency[0].currencyCodeA | currency }}
                    </span>
                    <ul ref="dropdown-list" class="dropdown-list">
                        <li
                            v-for="(item, i) of currency"
                            :key="i"
                            class="dropdown-item"
                            @click="pushToCurrencyList(item.currencyCodeA)"
                        >
                            <span class="dropdown-link">
                                {{
                                    item.currencyCodeA &&
                                    item.currencyCodeA | currency
                                }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <v-text color="#000">Валюти які використовуються</v-text>
                <v-layout flex acenter wrap>
                    <v-layout
                        v-for="(item, i) of currencyList"
                        :key="i"
                        flex
                        acenter
                        class="currency-btn mr-1 mb-1"
                    >
                        <v-text
                            color="#000"
                            :size="['fs-md-12']"
                            weight="bold"
                            uppercase
                            class="p-1"
                        >
                            {{ item | currency }}
                        </v-text>

                        <button
                            class="p-1"
                            @click="removeCurrency('currencyList', item)"
                        >
                            <v-icon icon="delete" w="10" color="#000" />
                        </button>
                    </v-layout>
                </v-layout>
            </div>

            <div>
                <v-text color="#000">Додати корегування валюти на:</v-text>
                <v-input
                    v-model="changeValue"
                    setp="0.1"
                    placeholder="0"
                    type="number"
                />

                <v-btn
                    rounded="4"
                    class="p-1 mt-1"
                    @click="pushToList('changesList', 'changeValue')"
                >
                    Додати
                </v-btn>
            </div>

            <div>
                <v-text color="#000">Корегування які використовуються</v-text>
                <v-layout flex acenter wrap>
                    <v-layout
                        v-for="item of changesList"
                        :key="item"
                        flex
                        acenter
                        class="currency-btn mr-1"
                    >
                        <v-text
                            color="#000"
                            :size="['fs-md-12']"
                            weight="bold"
                            uppercase
                            class="p-1"
                        >
                            {{ item }}
                        </v-text>

                        <button
                            class="p-1"
                            @click="removeCurrency('changesList', item)"
                        >
                            <v-icon icon="delete" w="10" color="#000" />
                        </button>
                    </v-layout>
                </v-layout>
            </div>

            <div>
                <v-text color="#000">Коміссія (-%)</v-text>
                <v-input
                    v-model="changeComission"
                    setp="0.1"
                    placeholder="0"
                    type="number"
                />

                <v-btn
                    rounded="4"
                    class="p-1 mt-1"
                    @click="pushToList('comissonList', 'changeComission')"
                >
                    Додати
                </v-btn>
            </div>

            <div>
                <v-text color="#000">Коміссії які використовуються</v-text>
                <v-layout flex acenter wrap>
                    <v-layout
                        v-for="item of comissonList"
                        :key="item"
                        flex
                        acenter
                        class="currency-btn mr-1"
                    >
                        <v-text
                            color="#000"
                            :size="['fs-md-12']"
                            weight="bold"
                            uppercase
                            class="p-1"
                        >
                            {{ item }} %
                        </v-text>

                        <button
                            class="p-1"
                            @click="removeCurrency('comissonList', item)"
                        >
                            <v-icon icon="delete" w="10" color="#000" />
                        </button>
                    </v-layout>
                </v-layout>
            </div>

            <div>
                <v-text color="#000">Надбавка (+%)</v-text>
                <v-input
                    v-model="changeAdditive"
                    setp="0.1"
                    placeholder="0"
                    type="number"
                />

                <v-btn
                    rounded="4"
                    class="p-1 mt-1"
                    @click="pushToList('additiveList', 'changeAdditive')"
                >
                    Додати
                </v-btn>
            </div>

            <div>
                <v-text color="#000">Надбавки які використовуються</v-text>
                <v-layout flex acenter wrap>
                    <v-layout
                        v-for="item of additiveList"
                        :key="item"
                        flex
                        acenter
                        class="currency-btn mr-1"
                    >
                        <v-text
                            color="#000"
                            :size="['fs-md-12']"
                            weight="bold"
                            uppercase
                            class="p-1"
                        >
                            {{ item }}%
                        </v-text>

                        <button
                            class="p-1"
                            @click="removeCurrency('additiveList', item)"
                        >
                            <v-icon icon="delete" w="10" color="#000" />
                        </button>
                    </v-layout>
                </v-layout>
            </div>
        </v-layout>

        <v-btn
            rounded="4"
            class="pv-1 ph-6 mt-3 save-btn"
            @click="updateFilters"
        >
            Зберегти
        </v-btn>
    </v-layout>
</template>

<script>
export default {
    layout: 'admin',
    // middleware: ['admin'],
    async asyncData({ store }) {
        const currency = await store.dispatch('currency/fetchPairList')
        const currencesFilters = await store.dispatch('currency/fetchCurrences')
        return {
            currency,
            currencesFilters,
        }
    },
    data() {
        return {
            showList: false,
            currencyList: [],
            changesList: [],
            comissonList: [],
            additiveList: [],
            changeValue: 0,
            changeComission: 0,
            changeAdditive: 0,
        }
    },

    created() {
        this.currencyList = this.currencesFilters.currency
        this.changesList = this.currencesFilters.changes
        this.comissonList = this.currencesFilters.comisson
        this.additiveList = this.currencesFilters.additive
    },

    methods: {
        async updateFilters() {
            const formData = {
                currency: this.currencyList,
                changes: this.changesList,
                comisson: this.comissonList,
                additive: this.additiveList,
            }

            await this.$store.dispatch('currency/updateCurrences', formData)
        },
        openList() {
            const dropdownList = this.$refs['dropdown-list']
            const dropdownItems = dropdownList.querySelectorAll('li')
            const h = dropdownItems[0].getBoundingClientRect().height

            this.showList = !this.showList
            if (this.showList) {
                dropdownList.style.height = `${h * dropdownItems.length}px`
            } else {
                dropdownList.removeAttribute('style')
            }
        },

        pushToCurrencyList(item) {
            !this.currencyList.includes(item) && this.currencyList.push(item)
        },

        pushToList(list, value) {
            this[list].push(this[value])
            this[value] = ''
        },

        removeCurrency(list, item) {
            const i = this[list].indexOf(item)
            this[list].splice(i, 1)
        },
    },
}
</script>

<style lang="sass" scoped>

.data-wrapper
    background-color: #fff
    border-radius: 8px

.currency-btn
    border: 1px solid #000
    border-radius: 4px
    overflow: hidden

    button
        border-left: 1px solid

.save-btn
    width: fit-content

.dropdown
    &-block
        border-radius: 8px
        position: relative

        .current-link
            border-radius: 8px
            padding: 8px 12px
            color: #000
            font-size: 16px
            font-weight: bold
            cursor: pointer
            display: flex
            align-items: center
            justify-content: space-between
            position: relative
            z-index: 4

            &::after
                content: ''
                display: block
                border-top: 7px solid #000
                border-left: 5px solid transparent
                border-right: 5px solid transparent
                border-bottom: 0px solid transparent
                margin-left: 10px
                transition: transform 0.2s ease

            &.active
                &::after
                    transform: rotate(180deg)
</style>
