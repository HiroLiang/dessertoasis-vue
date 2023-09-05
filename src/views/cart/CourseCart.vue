<script setup>
import { getCourseCart } from "@/api/index"
import { computed, onMounted, ref, watch } from "vue";
import DeleteButton from "@/views/cart/DeleteButton.vue";

let memberId = 1

const cart = ref([])

const loadCourseCart = async () => {
    const res = await getCourseCart(memberId)
    cart.value = res.data
    checkCourses()
}

onMounted(() => {
    loadCourseCart()
})

// 計算總和
const total = computed(() => {
    let t = 0
    cart.value.forEach(item => {
        t += item.coursePrice
    })
    return t
})



const emits = defineEmits(["getCourses"])

const checked = ref(true)

const checkCourses = () => {
    if (checked.value && cart.value.length > 0) {
        emits("getCourses", cart.value, total.value)
    } else {
        emits("getCourses", null, 0)
    }
}

watch(() => checked.value, () => checkCourses())



</script>

<template>
    <div class="container" v-if="cart.length > 0">
        <h2>
            課程 <input type="checkbox" v-model="checked">
        </h2>
        <table class="table caption-top align-middle">
            <thead>
                <tr>
                    <th>課程</th>
                    <th>上課地點</th>
                    <th>剩餘名額</th>
                    <th>報名截止日期</th>
                    <th>價格</th>
                    <th>刪除</th>
                </tr>
            </thead>
            <tbody v-for="cartItem in cart">
                <tr>
                    <td>
                        <img src='https://fakeimg.pl/100x100/?text=Image' :alt="cartItem.courseName">
                        {{ cartItem.courseName }}
                    </td>
                    <td>{{ cartItem.coursePlace }}</td>
                    <td>{{ cartItem.remainPlaces }}</td>
                    <td>{{ cartItem.closeDate }}</td>
                    <td>{{ cartItem.coursePrice }}</td>
                    <td>
                        <DeleteButton :cart-id="cartItem.cartId" @delete="loadCourseCart"></DeleteButton>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <td colspan='4'></td>
                <td>總共: {{ total }}</td>
            </tfoot>
        </table>
    </div>
</template>