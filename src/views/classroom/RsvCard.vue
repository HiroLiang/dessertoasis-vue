<template>
    <h2>{{ date }}</h2>
    <h2>教室: {{ roomId }}</h2>
    {{ rsvList }}
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

const rsvList = ref(null)

const loadReservations = async () => {
    const res = await getReservations(props.roomId, props.date, props.date)
    rsvList.value = res.data
}

loadReservations()

watch([() => props.date, () => props.roomId], () => {
    loadReservations()
})

</script>