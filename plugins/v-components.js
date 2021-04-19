import Vue from 'vue'
import VIcon from '../components/v-components/VIcon.vue'
import VBtn from '../components/v-components/VBtn.vue'
import VContainer from '../components/v-components/VContainer.vue'
import VLayout from '../components/v-components/VLayout.vue'
import VCol from '../components/v-components/VCol.vue'
import VText from '../components/v-components/VText.vue'
import VInput from '../components/v-components/VInput.vue'
import VAlert from '../components/v-components/VAlert.vue'
import VModal from '../components/v-components/VModal.vue'
import VLoader from '../components/v-components/VLoader.vue'

const components = {
    VIcon,
    VBtn,
    VContainer,
    VLayout,
    VCol,
    VText,
    VInput,
    VAlert,
    VModal,
    VLoader,
}

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})
