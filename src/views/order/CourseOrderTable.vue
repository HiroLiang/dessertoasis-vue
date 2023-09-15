<script setup>
const props = defineProps({
    orders: {
        type: Array
    }
})

const getTotal = () => {
    let total = 0
    props.orders.forEach(item => {
        total += item.coursePrice
    });
    return total
}

</script>

<template>
    <table class="table align-middle" v-if="orders && orders.length > 0">
        <thead>
            <tr>
                <th>課程</th>
                <th>上課日期</th>
                <th>上課地點</th>
                <th>價格</th>
            </tr>
        </thead>
        <tbody v-for="order in orders">
            <tr>
                <td>
                    <img src='https://fakeimg.pl/100x100/?text=Image' :alt="order.prodName">
                    {{ order.courseName }}
                </td>
                <td>{{ order.courseDate }}</td>
                <td>{{ order.coursePlace }}</td>
                <td>{{ order.coursePrice }}</td>
            </tr>
        </tbody>
        <tfoot>
            <td colspan='3'></td>
            <td>總共: {{ getTotal() }}</td>
        </tfoot>
    </table>
</template>