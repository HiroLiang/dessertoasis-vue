import { defineStore } from "pinia";
import { ref } from "vue";
import { reqGetOrder } from "../api";

export const useOrder = defineStore('order', () => {

    const payBody = ref({
        amount: 4000,
        currency: "TWD",
        orderId: "order504a11a-1888-4410-8982fsefasdasdad61b3",
        packages: [
            {
                id: "asas20191011hg231",
                amount: 4000, "name": "sss",
                products: [
                    {
                        name: "aaa",
                        quantity: 2,
                        price: 2000
                    }
                ]
            }
        ],
        redirectUrls: {
            confirmUrl: "http://localhost:8080/pay/linepay/confirm",
            cancelUrl: "http://localhost:8080"
        }
    })

    const order = ref({})

    const initOrder = async (orderId) => {
        const result = await reqGetOrder(orderId)
        order.value = result.data
        console.log(order.value)
    }

    const initPayBody = () => {
        payBody.value = {
            orderId: order.id
        }
    }

    const sendLinePay = async () => {

    }

    return { initOrder, initPayBody, sendLinePay }
})