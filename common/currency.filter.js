export default function (value) {
    switch (value) {
        case 'USD':
            return 'Доллар'

        case 'PLZ':
            return 'Злотый'

        case 'EUR':
            return 'Евро'

        case 'GBP':
            return 'Фунт'

        default:
            return 'Гривня'
    }
}
