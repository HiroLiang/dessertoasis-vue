<template>
    <FullCalendar :options="calendarOptions" ref="calendar"/>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref, reactive, onMounted, watch } from 'vue'
import { getReservations } from '@/api'

const props = defineProps({
    roomId: {
        default: 1,
    },
})

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
    let calendarApi = selectInfo.view.calendar
    const clickEvents = calendarApi.getEvents().filter((event) => {
        return formatDate(event.start) == selectInfo.startStr
    })
}

function handleEventClick(clickInfo) {
    console.log(clickInfo.event.start)
}

function handleDatesSet(dateInfo) {
    loadReservations(props.roomId, dateInfo.start, dateInfo.end)
}

watch(() => props.roomId, (newRoomId, oldRoomId) => {
    if (newRoomId != oldRoomId){
        let calendarApi = calendar.value.getApi()
        loadReservations(newRoomId, calendarApi.view.activeStart, calendarApi.view.activeEnd)
    }
})

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 補零
    const day = String(date.getDate()).padStart(2, '0'); // 補零
    return `${year}-${month}-${day}`
}

const loadReservations = async (roomId, startDate, endDate) => {
    const res = await getReservations(roomId, formatDate(startDate), formatDate(endDate))
    const events = res.data.map((event) => {
        let color = null
        switch (event.reservationTime) {
            case 'morning': color = "default"; break;
            case 'afternoon': color = "green"; break;
            case 'night': color = "pink"; break;
        }

        return {
            title: event.detail,
            start: event.reservationDate,
            end: event.reservationDate,
            color
        }
    })
    calendarOptions.events = events
}

</script>