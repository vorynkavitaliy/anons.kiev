export default {
    target: 'server',

    head: {
        title: 'calculator-anons-kiev',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    css: ['@/assets/styles/styles.sass'],

    styleResources: {
        sass: ['@/assets/styles/*.sass'],
    },

    plugins: ['@/plugins/global', '@/plugins/axios', '@/plugins/v-components'],

    components: true,

    buildModules: ['@nuxtjs/pwa', '@nuxtjs/eslint-module', '@nuxt/postcss8'],

    modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],

    axios: {
        baseURL: process.env.BASEURL || 'http://localhost:3000',
    },

    build: {
        postcss: {
            extractCSS: { ignoreOrder: true },
            plugins: {
                'postcss-import': true,
                'postcss-url': false,
                'postcss-preset-env': {
                    browsers: ['ie >= 8', 'last 4 version'],
                    stage: 0,
                },
                'postcss-combine-media-query': true,
                'postcss-extract-media-query': {
                    stats: true,
                    extractAll: false,
                },
                'postcss-sort-media-queries': {
                    sort: 'mobile-first',
                },
            },
        },
    },
}
