import { ref } from 'vue'
import { defineStore } from "pinia";
import { reqGetFavoriteList } from "../api";
import { reqUpdateList } from '../api';

export const useFavorList = defineStore('favorList', () => {

    //定義清單
    const favoriteList = ref([
        [],//商品
        [],//課程
        [],//食譜
        []//預約
    ])

    //初始化清單
    const initFavorList = async () => {
        favoriteList.value = [[], [], [], []]
        let list = await reqGetFavoriteList()
        if (!list.data)
            return
        list.data.forEach(favor => {
            favoriteList.value[favor.categoryId - 1].push(favor.itemId)
        })
    }

    //更新清單 ( 新增與刪除 )
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