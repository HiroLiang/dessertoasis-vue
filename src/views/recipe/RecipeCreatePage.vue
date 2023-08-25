<script setup>
import { ref, reactive } from 'vue'
import IngredientInput from '../views/recipe/components/IngredientInput.vue'
import StepInput from '../views/recipe/components/StepInput.vue'

const ingredientCounter = ref(2)
const ingredients = reactive([0, 1])

const addNewIngredient = () => {
    ingredients.push(ingredientCounter.value)
    ingredientCounter.value++
    console.log(ingredients);
}
const stepCounter = ref(2)
const steps = reactive([0, 1])

const addNewStep = () => {
    steps.push(stepCounter.value)
    stepCounter.value++
    console.log(steps);
}

const handleDeleteStep = (deletIndex) => {
    console.log(deletIndex);
    steps.splice(deletIndex - 1, 1)
}

const handleDeleteIngredient = (deleteIngredient) => {
    console.log(deleteIngredient);
    ingredients.splice(deleteIngredient - 1, 1)
}

</script>

<template>
    <div>

    </div>
    <h2>this is recipe create page</h2>

    <div class="container">
        <div class="recipeContainer container">
            <div class="recipeTitleContainer container mt-3">
                <label for="recipeTitle" class="form-label">食譜名稱:</label><br>
                <input class="form-control" type="text" id="recipeTitle" name="recipeTitle" required="required">
            </div>
            <div class="recipeIntroductionContainer container mt-3">
                <label for="recipeIntroduction" class="form-label">食譜簡介:</label><br>
                <textarea class="recipeIntroduction form-control" style="resize: none;" id="recipeIntroduction"
                    name="recipeIntroduction" required="required"></textarea>
                <br>

            </div>

            <div class="picContainer container">
                <label for="pictureURL" class="form-label">成品圖片:</label><br>
                <img class="recipePic" id="previewPic0" alt="成品圖片" src="https://fakeimg.pl/440x300/?text=Image">
                <input class="form-control" type="file" id="pictureURL" name="pictureURL" accept="image/*"
                    onchange="preview(event,'previewPic0')"><br>
            </div>
            <div class="container ml-3">
                <div class="ingredientContainer row justify-content-start  ">
                    <div class="ingredientQtyContainer col-4">
                        <label for="ingredientQuantity" class="form-label">食材份量</label><br>
                        <select class="form-select">
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
                        </select>人份
                    </div>
                    <div class="cookingTimeContainer col-4">
                        <label for="cookingTime" class="form-label">烹調時間</label><br>
                        <input class="form-control" type="text" id="cookingTime" name="cookingTime" required="required">分鐘
                    </div>
                </div>
            </div>
            <div class="container ml-3">
                <div class="ingredientContainer row justify-content-start  ">
                    <IngredientInput v-for="(ingredient, index) in ingredients.length" :key="ingredients[index]"
                        :ingerdientIndex="index + 1" @delete-ingredient="handleDeleteIngredient">
                    </IngredientInput>
                </div>


                <div class="newRecipeStepContainer d-grid mt-3">
                    <button class="btn btn-light" @click="addNewIngredient">+ 增加食材</button>
                </div>
            </div>
            <div class="recipeStepsContainer container mt-3">
                <StepInput v-for="(step, index) in steps.length" :key="steps[index]" :stepIndex="index + 1"
                    @delete-step="handleDeleteStep"></StepInput>


            </div>
            <div class="newRecipeStepContainer d-grid">
                <button class="btn btn-light" @click="addNewStep">+ 增加步驟</button>
            </div>

            <br>
            <br>

        </div>
        <div class="crudbtn">
            <button class=" btn btn-light">發布</button>
            <button class="btn btn-light">儲存</button>
            <button class="btn btn-light">取消</button>
            <button class="btn btn-light">刪除</button>

        </div>

    </div>
</template>

<style>
.recipeContainer {
    border: 2px solid black;
    border-radius: 5px;
}

.crudbtn {
    border: 2px solid black;

}

.recipePic {
    max-height: 100%;
    max-width: 100%;
}
</style>