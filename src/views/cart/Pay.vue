<script setup>
import { ref } from 'vue'
import { reqInsertOrder, ecpayCheck, ecpaySend } from '@/api/index'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import ProductOrderTable from '@/views/order/ProductOrderTable.vue'
import CourseOrderTable from '@/views/order/CourseOrderTable.vue'
import ReservationTable from '@/views/order/ReservationTable.vue'
import { useOrder } from '@/stores/order';

const cart = useCartStore()

const address = ref('')

const getProductTotal = () => {
    let total = 0
    if (cart.productCart) {
        cart.productCart.forEach(item => {
            total += item.prodQuantity * item.prodPrice
        });
    }
    return total;
}

const getCourseTotal = () => {
    let total = 0
    if (cart.courseCart) {
        cart.courseCart.forEach(item => {
            total += item.coursePrice
        })
    }
    return total
}

const getRsvTotal = () => {
    let total = 0
    if (cart.rsvCart) {
        cart.rsvCart.forEach(item => {
            total += item.price
        })
    }
    return total
}

const getTotal = () => {
    return getProductTotal() + getCourseTotal() + getRsvTotal()
}


const router = useRouter()
const placeOrder = async () => {
    let cartIds = []
    if (cart.productCart) {
        cart.productCart.forEach(cartItem => {
            cartIds.push(cartItem.cartId)
        })
    }
    if (cart.courseCart) {
        cart.courseCart.forEach(cartItem => {
            cartIds.push(cartItem.cartId)
        })
    }
    if (cart.rsvCart) {
        cart.rsvCart.forEach(cartItem => {
            cartIds.push(cartItem.cartId)
        })
    }

    const data = {
        prodOrderAddress: (address.value == '') ? 'N' : address.value,
        cartIds
    }

    const res = await reqInsertOrder(data)
    if (res.data != null) {
        cart.getCartCount()
        // router.push("/cart/pay_success")
        return res.data
    } else {
        alert("訂單成立失敗")
    }
}

const ecPay = ref(null)
const payByEcpay = async () => {
    let itemNumber = (cart.productCart) ? cart.productCart.length : 0 +
        (cart.courseCart) ? cart.courseCart.length : 0 +
            (cart.rsvCart) ? cart.rsvCart.length : 0
    let itemName = "";
    if (cart.productCart && cart.productCart.length > 0)
        itemName += cart.productCart[0].prodName;
    if (cart.courseCart && cart.courseCart.length > 0)
        itemName += cart.courseCart[0].courseName;
    if (cart.rsvCart && cart.rsvCart.length > 0)
        itemName += cart.rsvCart[0].classroom.roomName;

    const ecpayData = {
        itemNumber,
        toTalPrice: getTotal(),
        itemName,
    }
    console.log(ecpayData);

    const ecpayRes = await ecpayCheck(ecpayData)
    console.log(ecpayRes.data);

    const newPage = window.open('', '_parent')
    newPage.document.open();
    newPage.document.write(ecpayRes.data)
    newPage.document.close()

    let cartIds = []
    if (cart.productCart) {
        cart.productCart.forEach(cartItem => {
            cartIds.push(cartItem.cartId)
        })
    }
    if (cart.courseCart) {
        cart.courseCart.forEach(cartItem => {
            cartIds.push(cartItem.cartId)
        })
    }
    if (cart.rsvCart) {
        cart.rsvCart.forEach(cartItem => {
            cartIds.push(cartItem.cartId)
        })
    }

    const data = {
        prodOrderAddress: (address.value == '') ? 'N' : address.value,
        cartIds
    }

    await reqInsertOrder(data)
}

const orderStore = useOrder()

const linePay = async () => {
    const ordId = await placeOrder()
    await orderStore.initOrder(ordId)
    const webUrl = await orderStore.sendLinePay()
    window.open(webUrl)
    router.push("/cart/pay_success")
}

</script>

<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-8">
                <h2>訂單</h2>
                <div class="mb-5" v-if="cart.productCart">
                    <ProductOrderTable :orders="cart.productCart"></ProductOrderTable>
                </div>
                <div class="mb-5" v-if="cart.courseCart">
                    <CourseOrderTable :orders="cart.courseCart"></CourseOrderTable>
                </div>
                <div v-if="cart.rsvCart">
                    <ReservationTable :orders="cart.rsvCart"></ReservationTable>
                </div>
            </div>
            <div class="col-4">
                <div class="card px-4 py-3">
                    <h2>結帳</h2>
                    <div class="mb-3">
                        <div class="mb-2 fw-bolder">訂單總和</div>
                        <div class="border-bottom mb-2">
                            <div v-if="cart.productCart">商品: {{ getProductTotal() }}</div>
                            <div v-if="cart.courseCart">課程: {{ getCourseTotal() }}</div>
                            <div v-if="cart.rsvCart">預約教室: {{ getRsvTotal() }}</div>
                        </div>
                        <div>NT$ {{ getTotal() }}</div>
                    </div>
                    <div v-if="cart.productCart" class="mb-3">
                        <label id="address" class="mb-2 fw-bolder">商品運送地址</label>
                        <input type="text" id="address" v-model="address" class="form-control">
                    </div>
                    <div>
                        <div class="mb-2 fw-bolder">付款</div>
                        <div class="row">
                            <div class="col">
                                <img src="public\images\pay\LINE-Pay(h)_W238_n.png" style="height: 37px"
                                    class="me-2 btn-pay" @click="linePay" />
                            </div>
                            <div class="col">
                                <img src="public\images\pay\ecpay_logo.svg" style="height: 37px" class="btn-pay"
                                    @click="payByEcpay" />
                            </div>
                        </div>
                    </div>
                    <!-- <div>
                        <label id="credit-card" class="mb-3">信用卡</label>
                        <input type="text" id="credit-card" placeholder="信用卡號碼" class="form-control mb-3">
                        <div class="row">
                            <div class="col-md-6">
                                <input type="text" placeholder="到期日 (MM/YY)" class="form-control">
                            </div>
                            <div class="col-md-6">
                                <input type="text" placeholder="安全驗證碼" class="form-control">
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scope>
.btn-pay {
    cursor: pointer;
}
</style>