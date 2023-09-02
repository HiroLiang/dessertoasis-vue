<script setup>
import { ref, watch, computed } from 'vue';
import formatDate from './formatDate';
import { getReservations, getClassrooms } from '@/api/index';
import AddToCartButton from '../../components/AddToCartButton.vue';

const props = defineProps({
    date: {
        default: new Date()
    },
})

const emits = defineEmits(["selectRoom"])

const classrooms = ref([])
const roomId = ref(1)
const rsv = ref(null)
const morningRsv = ref(null)
const afternoonRsv = ref(null)
const nightRsv = ref(null)
const time = ref('A')
const detail = ref('')

const loadReservations = async () => {
    const res = await getReservations(roomId.value, formatDate(props.date), formatDate(props.date))
    const rsvList = res.data
    morningRsv.value = null
    afternoonRsv.value = null
    nightRsv.value = null
    rsvList.forEach(rsv => {
        switch (rsv.reservationTime) {
            case 'A': morningRsv.value = rsv; break;
            case 'B': afternoonRsv.value = rsv; break;
            case 'C': nightRsv.value = rsv;
        }
    });
    switch (time.value) {
        case 'A': rsv.value = morningRsv.value; break;
        case 'B': rsv.value = afternoonRsv.value; break;
        case 'C': rsv.value = nightRsv.value;
    }
}

const loadClassrooms = async () => {
    const res = await getClassrooms()
    classrooms.value = res.data
}

loadReservations()
loadClassrooms()

watch([() => props.date, () => roomId.value], () => {
    loadReservations()
})

</script>

<template>
    <div class="container">
        <div>
            <h2>{{ date.toLocaleDateString() }}</h2>
            <div class="input-group my-3">
                <label class="input-group-text" for="classroom">教室</label>
                <select class="form-select" id="classroom" v-model="roomId" @change="emits('selectRoom', roomId)">
                    <option v-for="room in classrooms" :value="room.id">
                        {{ room.roomName }}, {{ room.roomLocation }}
                    </option>
                </select>
            </div>
        </div>
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'A' }" @click="rsv = morningRsv; time = 'A'">早上</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'B' }" @click="rsv = afternoonRsv; time = 'B'">下午</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'C' }" @click="rsv = nightRsv; time = 'C'">晚上</a>
            </li>
        </ul>
        <div v-if="date < new Date()">
            <h4 class="mt-3">※今日以前的日期無法預約</h4>
        </div>
        <div v-else-if="rsv">
            <h4 class="mt-3">※已預訂</h4>
            <div>{{ rsv }}</div>
        </div>
        <div v-else>
            <div class="my-3">
                <div>價格: {{ }}</div>
                <label for="detail" class="form-label">預約用途</label>
                <input type="text" class="form-control" id="detail" v-model="detail">
            </div>
            <div class="col-12">
                <AddToCartButton :data="{ categoryId: 4, interestedId: null }"
                    :rc-data="{ roomId, reservationDate: formatDate(date), reservationTime: time, detail }">
                </AddToCartButton>
            </div>
        </div>
    </div>
</template>