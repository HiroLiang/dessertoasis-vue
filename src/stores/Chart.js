import { defineStore } from "pinia";
import { ref } from "vue";

export const useChart = defineStore('chart', () => {
    const chart = ref({
        websiteVisit: 0, // 網站訪問次數
        categorySum: [], // [id,sum] , 食譜分類計數
        turnover: [],

    })

    const condition = ref({

    })

    return { chart }
})