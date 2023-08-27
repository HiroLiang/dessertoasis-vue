<template>
    <div class="container">
        <div>
            <h2>{{ date }}</h2>
            <h2>教室: {{ roomId }}</h2>
        </div>

        <ul class="nav nav-tabs nav-fill">
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'm' }" @click="rsv = morningRsv; time = 'm'">早上</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'a' }" @click="rsv = afternoonRsv; time = 'a'">中午</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'n' }" @click="rsv = nightRsv; time = 'n'">晚上</a>
            </li>
        </ul>
        <div class="border border-top-0 rounded-bottom">
            <div v-if="rsv">※已被預約</div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import formatDate from './formatDate';
import { getReservations } from '@/api/index'

const props = defineProps({
    date: {
        default: formatDate(new Date())
    },
    roomId: {
        default: 1
    },
})

const rsv = ref(null)
const morningRsv = ref(null)
const afternoonRsv = ref(null)
const nightRsv = ref(null)
const time = ref('m')

const loadReservations = async () => {
    const res = await getReservations(props.roomId, props.date, props.date)
    const rsvList = res.data
    morningRsv.value = null
    afternoonRsv.value = null
    nightRsv.value = null
    rsvList.forEach(rsv => {
        switch (rsv.reservationTime) {
            case 'morning': morningRsv.value = rsv; break;
            case 'afternoon': afternoonRsv.value = rsv; break;
            case 'night': nightRsv.value = rsv;
        }
    });
    switch (time.value) {
        case 'm': rsv.value = morningRsv.value; break;
        case 'a': rsv.value = afternoonRsv.value; break;
        case 'n': rsv.value = nightRsv.value;
    }
}

loadReservations()

watch([() => props.date, () => props.roomId], () => {
    loadReservations()
})

</script>