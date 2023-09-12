<script setup>
import NavBar from '../../components/NavBar.vue';
import { ref } from 'vue';
import { reqGetMemberOrders } from '../../api';

const page = ref(0)
const orders = ref([])

const getOrders = async () => {
    const res = await reqGetMemberOrders(page.value)
    orders.value = res.data
}

getOrders()

</script>

<template>
    <NavBar></NavBar>
    <div class="container">
        我的訂單
        <div>{{ orders }}</div>
    </div>
</template>