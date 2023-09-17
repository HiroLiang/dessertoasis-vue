<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import IngredientInput from '@/views/recipe/components/IngredientInput.vue'
import StepInput from '@/views/recipe/components/StepInput.vue'

const route = useRoute()
const router = useRouter()
const recipeId = route.query.id

//recipeBean物件
const data = reactive({
    recipe: {
        recipeTitle: '',
        recipeIntroduction: '',
        difficulty: '',
        pictureURL: '',
        ingredientPersons: 1,
        cookingTime: '',
        ingredientList: [
            // {
            //     ingredientQuantity: 0,
            //     ingredientUnit: ''
            // }
        ],
        recipeSteps: [
            // {
            //     stepNumber: 1,
            //     stepPicture: '',
            //     stepContext: ''
            // }
        ],
    },
    ingredients: [
        // {
        //     ingredientName: "test"
        // },
        // {
        //     ingredientName: "test2"
        // },
        // {
        //     ingredientName: "test"
        // }
    ],
    categories: [

    ]
})

onBeforeMount(() => {

})

</script>

<template>
    <div class="container mt-3">
        <div class="row ">
            <div class="recipeContainer container col-md-10 border border-second rounded">
                <div class="recipeTitleContainer container mt-3">
                    <label for="recipeTitle" class="form-label">食譜名稱:</label><br>
                    <input class="form-control" v-model="data.recipe.recipeTitle" type="text" id="recipeTitle"
                        name="recipeTitle" required="required">
                </div>
                <div class="recipeIntroductionContainer container mt-3">
                    <label for="recipeIntroduction" class="form-label">食譜簡介:</label><br>
                    <textarea class="recipeIntroduction form-control" style="resize: none;"
                        v-model="data.recipe.recipeIntroduction" id="recipeIntroduction" name="recipeIntroduction"
                        required="required"></textarea>
                    <br>

                </div>
                <div class="container">
                    <h5>成品圖片:</h5>
                </div>
                <div class="picContainer container ">
                    <label for="pictureURL">
                        <div class="imageContainer container">
                            <img class="recipePic inputLabel custom-cursor-pointer " id="picture" alt="成品圖片"
                                :src="recipePicPreviewImageUrl || 'https://fakeimg.pl/1180x310/?text=Image'">
                            <input @change="getRecipeImg" class="form-control visually-hidden pic" type="file"
                                id="pictureURL" name="pictureURL" accept="image/*"><br>
                        </div>
                    </label><br><br>
                </div>
                <div class="categoryContainer container mb-2">
                    <p class="form-label">食譜分類</p>
                    <n-tree-select class="selectTree" :multiple="true" :cascade="true" checkable :options="options"
                        @update:value="handleUpdateValue" placeholder="請選擇食譜分類" />
                </div>
                <div class="difContainer container mb-2">
                    <p class="form-label">難易度</p>
                    <n-tree-select class="selectTree" :multiple="false" :options="difficultyOptions"
                        @update:value="handledifValue" default-value="87" placeholder="請選擇難易度" />
                </div>
                <div class="container ml-3">
                    <div class="ingredientContainer row justify-content-start">
                        <div class="ingredientQtyContainer col-4">
                            <p class="form-label">食材份量(人份)</p>
                            <select class="form-select" v-model="data.recipe.ingredientPersons" id="ingredientPersons">
                                <option selected value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10+</option>
                            </select>
                        </div>
                        <div class="cookingTimeContainer col-4">
                            <label for="cookingTime" class="form-label">烹調時間(分鐘)</label><br>
                            <input class="form-control" v-model="data.recipe.cookingTime" type="text" id="cookingTime"
                                name="cookingTime" required="required">
                        </div>
                    </div>
                </div>
                <div class="container ml-3">
                    <div class="ingredientContainer row justify-content-start  ">
                        <IngredientInput v-for="(ingredient, index) in ingredients" :key="ingredient.id"
                            :ingerdientIndex="index + 1" @delete-ingredient="handleDeleteIngredient"
                            @get-ingredient-data="handleIngredientData">
                        </IngredientInput>
                    </div>


                    <div class="newRecipeStepContainer d-grid mt-3">
                        <button class="btn btn-light" @click="addNewIngredient">+ 增加食材</button>
                    </div>
                </div>
                <div class="recipeStepsContainer container mt-3">
                    <StepInput v-for="(step, index) in steps" :key="step.id" :stepIndex="index + 1"
                        @delete-step="handleDeleteStep" draggable="true" @dragstart="dragStart($event, index)"
                        @drop="onDrop($event, index)" @dragenter.prevent @dragover.prevent @get-step-data="handleStepData">
                    </StepInput>
                </div>
                <div class="newRecipeStepContainer d-grid mb-3 mt-2">
                    <button class="btn btn-light" @click="addNewStep">+ 增加步驟</button>
                </div>

            </div>
            <div class=" crudbtn col-md-1 align-self-start position-sticky" style="top: 100px;">
                <div class="btn row border border-second rounded px-2 pb-2">

                    <button class="btn btn-light mb-2" @click="submitForm">儲存</button>
                    <button type="reset" class="btn btn-light mb-2">取消</button>
                    <button class="btn btn-light mb-2">刪除</button>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.recipePic {
    max-width: 100%;
    max-height: 100%;
    /* object-fit: cover; */
}

.custom-cursor-pointer {
    cursor: pointer !important;
}
</style>