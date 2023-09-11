import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {

    // cart to pay
    const productCart = ref(null)
    const courseCart = ref(null)
    const rsvCart = ref(null)

    return { productCart, courseCart, rsvCart }
})