<script setup>
const props = defineProps({
    orders: {
        type: Array
    }
})

const getTotal = () => {
    let total = 0
    props.orders.forEach(item => {
        total += item.price
    });
    return total
}

const timeMap = {
    A: "早上",
    B: "下午",
    C: "晚上"
}

</script>

<template>
    <table class="table align-middle" v-if="orders && orders.length > 0">
        <thead>
            <tr>
                <th>教室</th>
                <th>教室位址</th>
                <th>預約日期</th>
                <th>預約時段</th>
                <th>預約價格</th>
            </tr>
        </thead>
        <tbody v-for="order in orders">
            <tr>
                <td>{{ order.classroom.roomName }}</td>
                <td>{{ order.classroom.roomLocation }}</td>
                <td>{{ order.reservationDate }}</td>
                <td>{{ timeMap[order.reservationTime] }}</td>
                <td>{{ order.price }}</td>
            </tr>
        </tbody>
        <tfoot>
            <td colspan='4'></td>
            <td>總共: {{ getTotal() }}</td>
        </tfoot>
    </table>
</template>