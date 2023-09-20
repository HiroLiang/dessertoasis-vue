import { defineStore } from "pinia";
import { reqGetVisitRecords } from '../api'
import { ref } from "vue";

export const useChart = defineStore('chart', () => {

    const visitRecord = ref({})

    const initChart = async () => {
        let result = await reqGetVisitRecords()
        visitRecord.value = result.data
        console.log(visitRecord.value);
    }



    return { visitRecord, initChart }
})