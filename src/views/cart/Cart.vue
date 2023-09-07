<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref, computed } from 'vue';
import ProductCart from '@/views/cart/ProductCart.vue';
import ReservationCart from '@/views/cart/ReservationCart.vue';
import CourseCart from '@/views/cart/CourseCart.vue';
import { insertOrder } from '@/api/index'
import AddToCartButton from '@/components/AddToCartButton.vue';

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

const handleInsertOrder = async () => {
    const data = {
        productCartDTOs: productCart.value,
        courseCartDTOs: courseCart.value,
        reservationCartDTOs: rsvCart.value
    }

    const res = await insertOrder(data)
    console.log(res.data)
}



</script>

<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="row">
            <div class="col-8">
                <!-- 商品課程加入購物車測試 -->
                <div>
                    <div>
                        商品1:
                        <AddToCartButton :data="{categoryId: 1, interestedId: 1, prodQuantity: 3}"></AddToCartButton>
                        商品2:
                        <AddToCartButton :data="{categoryId: 1, interestedId: 2, prodQuantity: 2}"></AddToCartButton>
                    </div>
                    <div>
                        課程1:
                        <AddToCartButton :data="{categoryId: 2, interestedId: 1}"></AddToCartButton>
                    </div>
                </div>

                <ProductCart @getProducts="getProducts"></ProductCart>
                <CourseCart @getCourses="getCourses"></CourseCart>
                <ReservationCart @getReservations="getReservations"></ReservationCart>
            </div>
            <div class="col-4">
                <div class="border p-5">
                    <h2>結帳</h2>
                    <div v-if="productCart">商品: {{ productTotal }}</div>
                    <div v-if="courseCart">課程: {{ courseTotal }}</div>
                    <div v-if="rsvCart">預約教室: {{ rsvTotal }}</div>
                    <hr>
                    <div class="mb-3">總共: {{ total }}</div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="button" @click="handleInsertOrder">去結帳</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>