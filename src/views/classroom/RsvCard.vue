<template>
    <div class="container">
        <div>
            <h2>{{ date.toLocaleDateString() }}</h2>
            <div class="input-group my-3">
                <label class="input-group-text" for="classroom">教室</label>
                <select class="form-select" id="classroom" v-model="roomId" @change="emitRoomId">
                    <option v-for="room in classrooms" :value="room.roomId">
                        {{ room.roomName }}, {{ room.roomLocation }}
                    </option>
                </select>
            </div>
        </div>
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'm' }" @click="rsv = morningRsv; time = 'm'">早上</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'a' }" @click="rsv = afternoonRsv; time = 'a'">下午</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': time == 'n' }" @click="rsv = nightRsv; time = 'n'">晚上</a>
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
                <label for="detail" class="form-label">預約用途</label>
                <input type="text" class="form-control" id="detail" placeholder="Example input placeholder">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">預約</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import formatDate from './formatDate';
import { getReservations, getClassrooms } from '@/api/index';

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
const time = ref('m')

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
        case 'm': rsv.value = morningRsv.value; break;
        case 'a': rsv.value = afternoonRsv.value; break;
        case 'n': rsv.value = nightRsv.value;
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

const emitRoomId = () => {
    emits("selectRoom", roomId.value)
}

</script>