import { defineStore } from "pinia";
import { ref } from "vue";
import { reqGetOrder ,reqSendLinepay } from "../api";

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
        initPayBody()
    }

    const initPayBody = () => {
        let packages = []
        if (order.value.prodOrderItems && order.value.prodOrderItems.length > 0) {
            let amount = 0
            const products = order.value.prodOrderItems.map(item => {
                amount += item.prodQuantity * item.prodPrice
                return {
                    name: item.prodName,
                    quantity: item.prodQuantity,
                    price: item.prodPrice
                }
            })
            const prodOrderItems = {
                id: order.value.prodOrderItems[0].prodOrderItemId,
                amount,
                products
            }
            packages.push(prodOrderItems)
        }

        if (order.value.courseOrderItems && order.value.courseOrderItems.length > 0) {
            let amount = 0
            const products = order.value.courseOrderItems.map(item => {
                amount +=  item.coursePrice
                return {
                    name: item.courseName,
                    quantity: 1,
                    price: item.coursePrice
                }
            })
            const courseOrderItems = {
                id: order.value.courseOrderItems[0].courseOrderItemId,
                amount,
                products
            }
            packages.push(courseOrderItems)
        }

        if (order.value.reservations && order.value.reservations.length > 0) {
            let amount = 0
            const products = order.value.reservations.map(item => {
                amount += item.price
                return {
                    name: item.classroom.roomName,
                    quantity: 1,
                    price: item.price
                }
            })
            const reservations = {
                id: order.value.reservations[0].reservationId,
                amount,
                products
            }
            packages.push(reservations)
        }

        payBody.value = {
            amount: order.value.total,
            currency: "TWD",
            orderId: order.value.ordId,
            packages: packages,
            redirectUrls: {
                confirmUrl: "http://localhost:8080/pay/linepay/confirm",
                cancelUrl: "http://localhost:8080"
            }
        }
        console.log(payBody.value)
    }

    const sendLinePay = async () => {
       const result =  await reqSendLinepay(payBody.value)
       console.log(result.data);
       return result.data
    }

    return { initOrder, initPayBody, sendLinePay }
})