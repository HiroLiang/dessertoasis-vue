import { ref } from 'vue'
import { defineStore } from "pinia";
import { reqGetFavoriteList } from "../api";
import { reqUpdateList } from '../api';

export const userFavorList = defineStore('favorList', () => {
    const favoriteList = ref([
        [],//商品
        [],//課程
        [],//食譜
        []//預約
    ])
    const initFavorList = async () => {
        favoriteList.value = [[], [], [], []]
        let list = await reqGetFavoriteList()
        if (!list) return
        list.data.forEach(favor => {
            favoriteList.value[favor.categoryId - 1].push(favor.itemId)
        })
        console.log(favoriteList.value);
    }
    const updateList = async (categoryId, itemId) => {
        let index = favoriteList.value[categoryId - 1].indexOf(itemId)
        if (index !== -1) {
            await reqUpdateList(categoryId, itemId)
            favoriteList.value[categoryId - 1].splice(index, 1)
        } else {
            await reqUpdateList(categoryId, itemId)
            favoriteList.value[categoryId - 1].push(itemId)
        }
    }
    return { favoriteList, initFavorList, updateList }
})