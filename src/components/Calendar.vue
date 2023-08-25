<template>
    <FullCalendar :options="calendarOptions" />
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { reactive } from 'vue'
import { getReservations } from '@/api'


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
    loadReservations(dateInfo.start, dateInfo.end)
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).padStart(2, '0'); // 補零
    const day = (date.getDate()).padStart(2, '0'); // 補零
    return `${year}-${month}-${day}`
}

const loadReservations = async (startDate, endDate) => {
    const res = await getReservations(2, formatDate(startDate), formatDate(endDate))
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