<script setup>
import { getProductCart, reqUpdateProdQuantities } from "@/api/index"
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import DeleteButton from "@/views/cart/DeleteButton.vue";

const cart = ref([])

const loadProductCart = async () => {
    const res = await getProductCart()
    cart.value = res.data
    emitProduct()
}

onMounted(() => {
    loadProductCart()
})

// 計算價錢總和
const total = computed(() => {
    let t = 0
    cart.value.forEach(item => {
        t += item.prodQuantity * item.prodPrice
    })
    return t
})




const emits = defineEmits(["getProducts"])

const checked = ref(true)

const emitProduct = () => {
    if (checked.value && cart.value.length > 0) {
        emits("getProducts", cart.value, total.value)
    } else {
        emits("getProducts", null, 0)
    }
}

watch([checked, cart], emitProduct, { deep: true })




let updatedProducts = []

const updateProdQuantity = (qty, updatedItem) => {
    updatedItem.prodQuantity += qty
    const index = updatedProducts.findIndex(item => item.cartId == updatedItem.cartId)
    if (index == -1) {
        updatedProducts.push(updatedItem)
    }
}

onBeforeUnmount(async () => {
    if (updatedProducts.length != 0) {
        await reqUpdateProdQuantities(updatedProducts)
    }
})

window.addEventListener('beforeunload', async () => {
    if (updatedProducts.length != 0) {
        await reqUpdateProdQuantities(updatedProducts)
    }
})

</script>

<template>
    <div class="container" v-if="cart.length > 0">
        <h2>
            商品 <input type="checkbox" v-model="checked" />
        </h2>
        <table class="table align-middle">
            <thead>
                <tr>
                    <th>商品</th>
                    <th>數量</th>
                    <th>價格</th>
                    <th>小計</th>
                    <th>刪除</th>
                </tr>
            </thead>
            <tbody v-for="cartItem in cart">
                <tr>
                    <td>
                        <img src='https://fakeimg.pl/100x100/?text=Image' :alt="cartItem.prodName">
                        {{ cartItem.prodName }}
                    </td>
                    <td>
                        <button @click="updateProdQuantity(-1, cartItem)" :disabled="cartItem.prodQuantity <= 1"> -
                        </button>
                        {{ cartItem.prodQuantity }}
                        <button @click="updateProdQuantity(+1, cartItem)"> + </button>
                    </td>
                    <td>{{ cartItem.prodPrice }}</td>
                    <td>{{ cartItem.prodQuantity * cartItem.prodPrice }}</td>
                    <td>
                        <DeleteButton :cart-id="cartItem.cartId" @delete="loadProductCart"></DeleteButton>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <td colspan='3'></td>
                <td>總共: {{ total }}</td>
            </tfoot>
        </table>
    </div>
</template>