<template>
    <NavBar></NavBar>
    <div class="container">
        <span>教室: </span>
        <select v-model="roomId" class="form-select form-select-lg mb-3" aria-label="Default select example">
            <option v-for="i in 4">{{ i }}</option>
        </select>
        <Calendar :roomId=roomId></Calendar>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Calendar from '@/views/classroom/Calendar.vue';
import { ref } from 'vue';

const roomId = ref(1)

</script>