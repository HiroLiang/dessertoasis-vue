<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import IngredientInput from '@/views/recipe/components/IngredientInput.vue'
import StepInput from '@/views/recipe/components/StepInput.vue'
import { getRecipe, deleteRecipe, updateRecipe } from '@/api'
import { useDialog } from 'naive-ui';


const dialog = useDialog()
const route = useRoute()
const router = useRouter()
const recipeId = route.query.id

const steps = reactive([])
const stepImgs = reactive([])

const ingredients = reactive([])
const ingredientCounter = ref(0)


//recipeBean物件
const recipe = ref([null])

const backToCms = () => {
    router.push("/cms/recipe")
}

const addNewIngredient = () => {
    ingredients.push({
        id: Number, ikey: ingredientCounter.value++,
        ingredient: { id: Number, ingredientName: null },
        ingredientQuantity: null, ingredientUnit: "毫升"
    })
    ingredientCounter.value++
    // console.log(JSON.stringify(ingredients));
}

const handleDeleteRecipe = async () => {
    await deleteRecipe(recipeId)
    router.push("/cms/recipe")
}

const handleClickDeleteButton = () => {
    dialog.warning({
        title: "警告",
        content: "確定要刪除這筆資料?",
        positiveText: "確定",
        negativeText: "取消",
        onPositiveClick: () => {
            handleDeleteRecipe()
        },
    })
}

onBeforeMount(async () => {
    const res = await getRecipe(recipeId)
    recipe.value = res.data
    console.log('json parse');
    console.log(JSON.stringify(res.data));

    // recipe.value.recipeSteps.forEach(step => {
    //     steps.push({
    //         id: step.stepNumber, text: step.stepContext, imgUrl: step.stepPicture
    //     })
    // })
    recipe.value.ingredientList.forEach(ingredient => {
        ingredients.push({
            id: ingredient.id,
            ikey: ingredientCounter.value++,
            ingredient: { id: ingredient.ingredient.id, ingredientName: ingredient.ingredient.ingredientName },
            ingredientQuantity: ingredient.ingredientQuantity,
            ingredientUnit: ingredient.ingredientUnit
        })
    })

    console.log('response');
    console.log(res.data);
})

//刪除對應步驟
const handleDeleteStep = (deleteIndex) => {
    console.log(deleteIndex);
    recipe.value.recipeSteps.splice(deleteIndex - 1, 1)
    // stepImgs.splice(deleteIndex - 1, 1)
}
//刪除對應食材
const handleDeleteIngredient = (deleteIngredient) => {
    console.log(deleteIngredient);
    ingredients.splice(deleteIngredient - 1, 1)
    recipe.value.ingredientList.splice(deleteIngredient - 1, 1)
}

const handleStepData = (textIndex, textContent, imgData) => {
    recipe.value.recipeSteps[textIndex - 1].stepContext = textContent;
    recipe.value.recipeSteps[textIndex - 1].stepPicture = imgData;
    // stepImgs[textIndex - 1] = steps[textIndex - 1].imgUrl//處理步驟圖片

    console.log(stepImgs.value);
    stepImgs.forEach(stepImg => {
        console.log(stepImg);
    })
    console.log('textIndex:  ' + textIndex);
    console.log('textContent:  ' + textContent);
    console.log('imgData:  ' + imgData);
    console.log('steps:  ');
    console.log(steps);
}

const handleIngredientData = (ingerdientIndex, ingerdientName, ingerdientQty, ingerdientUnit) => {
    ingredients[ingerdientIndex - 1].ingredient.ingredientName = ingerdientName
    ingredients[ingerdientIndex - 1].ingredientQuantity = ingerdientQty
    ingredients[ingerdientIndex - 1].ingredientUnit = ingerdientUnit
    console.log('ingerdientIndex:  ' + ingerdientIndex);
    console.log('ingerdientName:  ' + ingerdientName);
    console.log('ingerdientQty: ' + ingerdientQty);
    console.log('ingredients:  ');
    console.log(ingredients);
}

const handleClickUpdateButton = async () => {
    console.log(recipe.value);
    recipe.value.ingredientList = ingredients.map(ingredient => ({
        id: ingredient.id,
        ingredient: { id: ingredient.ingredient.id, ingredientName: ingredient.ingredient.ingredientName },
        ingredientQuantity: ingredient.ingredientQuantity,
        ingredientUnit: ingredient.ingredientUnit
    }));
    // ingredients.forEach(ingredient => {
    //     recipe.value.ingredientList.push(ingredient)
    // })
    await updateRecipe(recipe.value)
}

</script>

<template>
    <div class="container mt-3">
        <div class="row mx-2">
            <div class="recipeContainer container col-md-10 border border-second rounded">
                <div class="recipeTitleContainer container mt-3">
                    <label for="recipeTitle" class="form-label">食譜名稱:</label><br>
                    <input class="form-control" v-model="recipe.recipeTitle" type="text" id="recipeTitle" name="recipeTitle"
                        required="required">
                </div>
                <div class="recipeIntroductionContainer container mt-3">
                    <label for="recipeIntroduction" class="form-label">食譜簡介:</label><br>
                    <textarea class="recipeIntroduction form-control" style="resize: none;"
                        v-model="recipe.recipeIntroduction" id="recipeIntroduction" name="recipeIntroduction"
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
                                :src="recipe.pictureURL || 'https://fakeimg.pl/1180x310/?text=Image'">
                            <input @change="getRecipeImg" class="form-control visually-hidden pic" type="file"
                                id="pictureURL" name="pictureURL" accept="image/*"><br>
                        </div>
                    </label><br><br>
                </div>
                <!-- <div class="categoryContainer container mb-2">
                    <p class="form-label">食譜分類</p>
                    <n-tree-select class="selectTree" :multiple="true" checkable :options="options"
                        @update:value="handleUpdateValue" placeholder="請選擇食譜分類" />
                </div>
                <div class="difContainer container mb-2">
                    <p class="form-label">難易度</p>
                    <n-tree-select class="selectTree" :multiple="false" :options="difficultyOptions"
                        @update:value="handledifValue" default-value="87" placeholder="請選擇難易度" />
                </div> -->
                <div class="container ml-3">
                    <div class="ingredientContainer row justify-content-start">
                        <div class="ingredientQtyContainer col-4">
                            <p class="form-label">食材份量(人份)</p>
                            <select class="form-select" v-model="recipe.ingredientPersons" id="ingredientPersons">
                                <option value="1">1</option>
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
                            <input class="form-control" v-model="recipe.cookingTime" type="text" id="cookingTime"
                                name="cookingTime" required="required">
                        </div>
                    </div>
                </div>
                <div class="container ml-3">
                    <div class="ingredientContainer row justify-content-start  ">
                        <IngredientInput v-for="(ingredient, index) in ingredients" :key="ingredient.ikey"
                            :ingerdientIndex="index + 1" :ingredientName="ingredient.ingredient.ingredientName"
                            :ingredientQty="parseInt(ingredient.ingredientQuantity, 10)"
                            :ingredientUnit="ingredient.ingredientUnit" @delete-ingredient="handleDeleteIngredient"
                            @get-ingredient-data="handleIngredientData">
                        </IngredientInput>
                    </div>

                    <div class="newRecipeStepContainer d-grid mt-3">
                        <button class="btn btn-light" @click="addNewIngredient">+ 增加食材</button>
                    </div>
                </div>
                <div class="recipeStepsContainer container mt-3">
                    <StepInput v-for="(step, index) in recipe.recipeSteps" :key="step.stepNumber" :stepIndex="index + 1"
                        :textContent="step.stepContext" :previewImageUrl="step.stepPicture" @delete-step="handleDeleteStep"
                        draggable="false" @dragstart="dragStart($event, index)" @drop="onDrop($event, index)"
                        @dragenter.prevent @dragover.prevent @get-step-data="handleStepData">
                    </StepInput>
                </div>
                <div class="newRecipeStepContainer d-grid mb-3 mt-2">
                    <button class="btn btn-light" @click="addNewStep">+ 增加步驟</button>
                </div>

            </div>
            <div class=" crudbtn col-md-1 align-self-start position-sticky" style="top: 100px;">
                <div class="btn row border border-second rounded px-2 pb-2">
                    <button class="btn btn-light mb-2" @click="handleClickUpdateButton">更新</button>
                    <button type="reset" class="btn btn-light mb-2" @click="backToCms">取消</button>
                    <button class="btn btn-light mb-2" @click="handleClickDeleteButton">刪除</button>

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