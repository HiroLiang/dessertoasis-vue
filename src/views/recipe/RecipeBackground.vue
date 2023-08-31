<script setup>
import { ref, onMounted, reactive } from 'vue'
import { reqDatas } from '@/api'
import cmsTable from '../../components/Standard/Table.vue'

const recipes = ref([])

const datas = async () => {
    const res = await reqDatas()
    recipes.value = res.data
}

const tableDatas = reactive([
    { id: 1, recipeTitle: "大恐龍1", time: 9, createdate: new Date("2020-01-01T11:11:00") },
    { id: 2, recipeTitle: "大恐龍2", time: 99, createdate: new Date("2021-02-01T12:30:00") },
    { id: 3, recipeTitle: "大恐龍n", time: 999, createdate: new Date("2022-11-30T23:11:00") }])

const title = reactive([
    { label: "名稱", key: "recipeTitle" },
    { label: "分類", key: "categoryID" },
    { label: "撰寫者", key: "recipeAuthorID" },
    { label: "公開狀態", key: "recipeStatus" },])


const getId = (id) => {
    console.log(id);
}

onMounted(datas)
</script>
<template>
    <div>
        <h2 align="center">食譜管理</h2>
        <table class="table table align-middle table-hover table-bordered border-Secondary align-top " border="1"
            style="background-color: #f5ebe0">
            <thead>
                <tr class="table-light text-nowrap" style="background-color: #edede9">
                    <th>編號</th>
                    <th>名稱</th>
                    <th>成品圖</th>
                    <th>簡介</th>
                    <th>分類</th>
                    <th>撰寫者</th>
                    <th>製作時間</th>
                    <th>難易度</th>
                    <th>步驟內容</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="{ recipeID, recipeTitle, pictureURL, recipeIntroduction, categoryID, recipeAuthorID, cookingTime, difficulty, recipeSteps } in recipes"
                    :key="recipeID">
                    <td>{{ recipeID }}</td>
                    <td>{{ recipeTitle }}</td>
                    <td>{{ pictureURL }}</td>
                    <td>{{ recipeIntroduction }}</td>
                    <td>{{ categoryID }}</td>
                    <td>{{ recipeAuthorID }}</td>
                    <td>{{ cookingTime }}</td>
                    <td>{{ difficulty }}</td>
                    <td>{{ recipeSteps }}</td>
                </tr>
            </tbody>

        </table>

        <cmsTable :dataTitles="title" :tableDatas="tableDatas" @get-edit-id="getId"></cmsTable>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}

html,
body {
    height: 100%;
    width: 100%;
}

body {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.container {
    width: 100%;
    height: 100%;
    margin: auto;
    max-width: 1700px;
    justify-content: flex-end;
}

.buttonContainer {}

.insertButton {
    margin-bottom: 5px;
}

.tableConteainer {
    max-width: 100%;
}

.table {}

img .previewPic {
    max-height: 100%;
    max-width: 100%;
}
</style>