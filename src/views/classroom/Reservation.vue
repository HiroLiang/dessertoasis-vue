<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="my-2">
            <span class="p-1 me-2 rounded text-white dodgerblue">早上</span>
            <span class="p-1 me-2 rounded text-white green">下午</span>
            <span class="p-1 me-2 rounded text-white pink">晚上</span>
        </div>
        <div class="row">
            <div class="col-8">
                <Calendar :roomId="roomId" @dateClick="handleDateClick"></Calendar>
            </div>
            <div class="col">
                <RsvCard :date="date" @selectRoom="handleSelectRoom"></RsvCard>
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
const roomId = ref(1)

function handleDateClick(clickedDate) {
    date.value = clickedDate
}

function handleSelectRoom(selectedRoom) {
    roomId.value = selectedRoom
}

</script>

<style scoped>
.dodgerblue {
    background-color: dodgerblue;
}

.green {
    background-color: green;
}

.pink {
    background-color: pink;
}
</style>