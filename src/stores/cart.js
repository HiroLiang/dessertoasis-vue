import { defineStore } from "pinia";
import { ref } from "vue";
import { reqGetCartCount, getProductCart, getCourseCart, getReservationCart } from "../api";

export const useCartStore = defineStore("cart", () => {

    // cart to pay
    const productCart = ref(null)
    const courseCart = ref(null)
    const rsvCart = ref(null)

    // cart count
    const count = ref(0)

    const getCartCount = async () => {
        const res = await reqGetCartCount()
        if (res.data != null) {
            count.value = res.data
        } else {
            count.value = 0
        }
    }

    const initCart = async () => {
        const prod = await getProductCart()
        productCart.value = prod.data
        const cour = await getCourseCart()
        courseCart.value = cour.data
        console.log(courseCart.value)
        const rese = await getReservationCart()
        rsvCart.value = rese.data
    }

    return { productCart, courseCart, rsvCart, count, getCartCount, initCart }
})