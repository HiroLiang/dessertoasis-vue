import { defineStore } from "pinia";
import { ref } from "vue";

export const useChart = defineStore('chart', () => {
    const chart = {
        websiteVisit: 0, // 網站訪問次數
        recipeSum: [], // [id,sum] , 食譜分類計數

    }

    return { chart }
})