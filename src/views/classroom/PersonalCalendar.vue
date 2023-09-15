<template>
    <div class="container">
        <div class="my-2">
            <span class="p-1 me-2 rounded text-white dodgerblue">早上</span>
            <span class="p-1 me-2 rounded text-white green">下午</span>
            <span class="p-1 me-2 rounded text-white pink">晚上</span>
        </div>
      <FullCalendar :options="calendarOptions" ref="calendar" />  
    </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref, reactive, onMounted } from 'vue'
import { reqGetMemberReservations } from '@/api'

const emit = defineEmits(['eventClick'])

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
    //selectable: true,
    //unselectAuto: false,
    //select: handleDateSelect,
    eventClick: handleEventClick,
    eventMouseEnter: handleEventMouseEnter,
    eventMouseLeave: handleEventMouseLeave
})

// function handleDateSelect(selectInfo) {
//     emit('dateClick', selectInfo.start)
// }

function handleEventClick(clickInfo) {
    console.log(clickInfo.event.extendedProps)
    emit('eventClick', clickInfo.event.extendedProps)
}

let color = null
function handleEventMouseEnter(info) {
    color = info.el.style.backgroundColor
    info.el.style.backgroundColor = '#005AB5'
    info.el.style.cursor = 'pointer'
}

function handleEventMouseLeave(info) {
    info.el.style.backgroundColor = color
}

const reservations = ref([])

const getMemberReservations = async () => {
    const res = await reqGetMemberReservations()
    reservations.value = res.data
    const events = res.data.map((rsv) => {
        let color = null
        switch (rsv.reservationTime) {
            case 'A': color = "dodgerblue"; break;
            case 'B': color = "green"; break;
            case 'C': color = "pink"; break;
        }
        return {
            title: rsv.classroom.roomName,
            start: rsv.reservationDate,
            color,
            extendedProps: {
                classroom: rsv.classroom.roomName,
                reservationDate: rsv.reservationDate,
                reservationTime: rsv.reservationTime,
            }
        }
    })
    calendarOptions.events = events
}

onMounted(getMemberReservations)

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