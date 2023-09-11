<script setup>
const props = defineProps({
    orders: {
        type: Array
    }
})

const getTotal = () => {
    let total = 0
    props.orders.forEach(item => {
        total += item.prodQuantity * item.prodPrice
    });
    return total
}

</script>

<template>
    <table class="table align-middle" v-if="orders">
        <thead>
            <tr>
                <th>商品</th>
                <th>數量</th>
                <th>價格</th>
                <th>小計</th>
            </tr>
        </thead>
        <tbody v-for="order in orders">
            <tr>
                <td>
                    <img src='https://fakeimg.pl/100x100/?text=Image' :alt="order.prodName">
                    {{ order.prodName }}
                </td>
                <td>{{ order.prodQuantity }}</td>
                <td>{{ order.prodPrice }}</td>
                <td>{{ order.prodQuantity * order.prodPrice }}</td>
            </tr>
        </tbody>
        <tfoot>
            <td colspan='3'></td>
            <td>總共: {{ getTotal() }}</td>
        </tfoot>
    </table>
</template>