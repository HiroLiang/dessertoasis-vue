<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqDatas } from '@/api'

const recipes = ref([])

const datas = async () => {
    const res = await reqDatas()
    recipes.value = res.data
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