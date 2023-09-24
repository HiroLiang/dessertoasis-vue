<script setup>
import { ref, computed } from 'vue';
import ProductCart from '@/views/cart/ProductCart.vue';
import ReservationCart from '@/views/cart/ReservationCart.vue';
import CourseCart from '@/views/cart/CourseCart.vue';
import AddToCartButton from '@/components/AddToCartButton.vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart'
import CartEmpty from './CartEmpty.vue';

const productCart = ref(null)
const courseCart = ref(null)
const rsvCart = ref(null)

const productTotal = ref(0)
const courseTotal = ref(0)
const rsvTotal = ref(0)

const getProducts = (products, total) => {
    productCart.value = products
    productTotal.value = total
}

const getCourses = (courses, total) => {
    courseCart.value = courses
    courseTotal.value = total
}

const getReservations = (rsvs, total) => {
    rsvCart.value = rsvs
    rsvTotal.value = total
}


const total = computed(() => {
    return productTotal.value + courseTotal.value + rsvTotal.value
})


const router = useRouter()
const cart = useCartStore()
const gotoPay = () => {
    cart.productCart = productCart.value
    cart.courseCart = courseCart.value
    cart.rsvCart = rsvCart.value
    router.push("/cart/pay")
}

</script>

<template>
    <div class="container">
        <!-- 商品課程加入購物車測試 -->
        <div>
            <div>
                <button @click="router.push({ path: '/cart/payByLinePay' })">click</button>
                商品1:
                <AddToCartButton :data="{ categoryId: 1, interestedId: 1, prodQuantity: 3 }"></AddToCartButton>
                商品2:
                <AddToCartButton :data="{ categoryId: 1, interestedId: 2, prodQuantity: 2 }"></AddToCartButton>
            </div>
            <div>
                課程1:
                <AddToCartButton :data="{ categoryId: 2, interestedId: 1 }"></AddToCartButton>
            </div>
        </div>

        <div class="row mt-3" v-if="cart.count || cart.count > 0">
            <div class="col-8">
                <h1>購物車</h1>
                <ProductCart @getProducts="getProducts"></ProductCart>
                <CourseCart @getCourses="getCourses"></CourseCart>
                <ReservationCart @getReservations="getReservations"></ReservationCart>
            </div>
            <div class="col-4">
                <div class="vh-100 position-fixed col-3">
                    <div class="card p-5">
                        <h2>總合</h2>
                        <div v-if="productCart">商品: {{ productTotal }}</div>
                        <div v-if="courseCart">課程: {{ courseTotal }}</div>
                        <div v-if="rsvCart">預約教室: {{ rsvTotal }}</div>
                        <hr>
                        <div class="mb-3">NT$ {{ total }}</div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="button" @click="gotoPay">去結帳</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 若購物車為空 -->
        <div v-else>
            <CartEmpty></CartEmpty>
        </div>
    </div>
</template>