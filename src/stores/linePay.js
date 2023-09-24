import { ref } from "vue"
import { defineStore } from "pinia"

export const useLinePay = defineStore('linePay', () => {
    const payBody = ref({
        amount: 0,
        currency: null,
        orderId: null,
        packages: [],
        redirectUrls: {}
    })

    const redirectUrls = ref({
        appPackageName: null,
        confirmUrl: null,
        confirmUrlType: null,
        cancelUrl: null
    })

    const packages = ref({
        id: null,
        amount: 0,
        userFee: 0,
        name: null,
        products: []
    })

    const products = ref({
        id: null,
        name: null,
        imageUrl: null,
        quantity: 0,
        price: 0,
        originalPrice: 0
    })



    return { payBody, redirectUrls, packages, products }
})