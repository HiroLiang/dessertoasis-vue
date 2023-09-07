import { defineStore } from "pinia";

export const userFavorList = defineStore({
    id: 'favorList',
    state: () => ({
        product: [],
        recipe: [],
        course: []
    }),
    getter: {},
    action: {
        async initList() {

        },
        async updateList() {

        },

    }
})