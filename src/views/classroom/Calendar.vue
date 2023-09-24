<template>
    <FullCalendar :options="calendarOptions" ref="calendar" />
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref, reactive, onMounted, watch } from 'vue'
import { getReservations } from '@/api'
import formatDate from './formatDate'

const props = defineProps({
    roomId: {
        default: 1,
    },
})

const emit = defineEmits(['dateClick'])

const calendar = ref(null)

const calendarOptions = reactive({
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
        left: 'prev next today',
        center: 'title',
        right: 'dayGridMonth'
    },
    initialView: 'dayGridMonth',
    events: [],
    selectable: true,
    unselectAuto: false,
    eventDisplay: 'block',
    displayEventTime: false,
    select: handleDateSelect,
    eventClick: handleEventClick,
    datesSet: handleDatesSet,
})

function handleDateSelect(selectInfo) {
    emit('dateClick', selectInfo.start)
}

function handleEventClick(clickInfo) {
    console.log(clickInfo.event.title)
    console.log(clickInfo.event.start)
}

function handleDatesSet(dateInfo) {
    loadReservations(props.roomId, dateInfo.start, dateInfo.end)
}

watch(() => props.roomId, (newRoomId, oldRoomId) => {
    if (newRoomId != oldRoomId) {
        let calendarApi = calendar.value.getApi()
        loadReservations(newRoomId, calendarApi.view.activeStart, calendarApi.view.activeEnd)
    }
})

const loadReservations = async (roomId, startDate, endDate) => {
    const res = await getReservations(roomId, formatDate(startDate), formatDate(endDate))
    const events = res.data.map((rsv) => {
        let color = null
        let start = rsv.reservationDate
        switch (rsv.reservationTime) {
            case 'A': color = "dodgerblue"; start += 'T09:00:00'; break;
            case 'B': color = "green"; start += 'T13:00:00'; break;
            case 'C': color = "pink"; start += 'T19:00:00'; break;
        }
        return {
            title: rsv.detail,
            start,
            color,
        }
    })
    calendarOptions.events = events
}

</script>