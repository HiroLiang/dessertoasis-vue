<template>
    <NavBar></NavBar>
    <div class="container">
        <h1>預約甜點教室</h1>
        <div class="row">
            <div class="col-8">
                <span>教室: </span>
                <select v-model="calendarRoomId" class="form-select d-inline-block w-50 m-2"
                    aria-label="Default select example">
                    <option v-for="i in 4">{{ i }}</option>
                </select>
                <Calendar :roomId="calendarRoomId" @dateClick="dateClick"></Calendar>
            </div>
            <div class="col">
                <RsvCard :date="date" :room-id="cardRoomId"></RsvCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Calendar from '@/views/classroom/Calendar.vue';
import RsvCard from './RsvCard.vue';
import formatDate from './formatDate';
import { ref } from 'vue';

const date = ref(formatDate(new Date()))
const calendarRoomId = ref(1)
const cardRoomId = ref(1)

function dateClick(dateStr) {
    date.value = dateStr
    cardRoomId.value = calendarRoomId.value
}

</script>