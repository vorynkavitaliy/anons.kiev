import Vue from 'vue'
import Vuelidate from 'vuelidate'
import CurrencyFilter from '@/common/currency.filter'

Vue.filter('currency', CurrencyFilter)
Vue.use(Vuelidate)
