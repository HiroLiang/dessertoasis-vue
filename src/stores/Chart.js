import { defineStore } from "pinia";
import { reqGetVisitRecords, reqGetTargetCount } from '../api'
import { ref } from "vue";

export const useChart = defineStore('chart', () => {

    const visitRecord = ref({})

    const targetCount = ref({})

    const initChart = async () => {
        let result = await reqGetVisitRecords()
        visitRecord.value = result.data

        let count = await reqGetTargetCount()
        targetCount.value = count.data
        console.log(targetCount.value);
    }



    return { visitRecord, targetCount, initChart }
})