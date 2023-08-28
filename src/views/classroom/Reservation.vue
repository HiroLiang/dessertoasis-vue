<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="input-group my-3 w-50">
            <label class="input-group-text" for="classroom">教室</label>
            <select class="form-select" id="classroom" v-model="calendarRoomId">
                <option v-for="i in 4">{{ i }}</option>
            </select>
        </div>
        <div class="row">
            <div class="col-8">
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
import { ref } from 'vue';

const date = ref(new Date())
const calendarRoomId = ref(1)
const cardRoomId = ref(1)

function dateClick(clickedDate) {
    date.value = clickedDate
    cardRoomId.value = calendarRoomId.value
}

</script>