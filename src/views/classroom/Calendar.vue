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
    selectable: true,
    select: handleDateSelect,
    eventClick: handleEventClick,
    datesSet: handleDatesSet, // 處理日期範圍變更事件
    events: []
})

function handleDateSelect(selectInfo) {
    console.log(selectInfo.start)
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
        switch (rsv.reservationTime) {
            case 'A': color = "default"; break;
            case 'B': color = "green"; break;
            case 'C': color = "pink"; break;
        }
        return {
            title: rsv.detail,
            start: rsv.reservationDate,
            end: rsv.reservationDate,
            color,
        }
    })
    calendarOptions.events = events
}

</script>