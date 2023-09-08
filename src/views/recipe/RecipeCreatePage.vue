<script setup>
import { ref, reactive, onMounted } from 'vue'

import IngredientInput from '@/views/recipe/components/IngredientInput.vue'
import StepInput from '@/views/recipe/components/StepInput.vue'
import { addRecipe, imgTest } from '@/api'

const ingredientCounter = ref(0)
const ingredients = reactive([])

//於建立頁新增一筆食材
const addNewIngredient = () => {
    ingredients.push({ id: ingredientCounter.value, ingredientName: '', ingredientQty: '' })
    ingredientCounter.value++
    // console.log(JSON.stringify(ingredients));
}
const stepCounter = ref(0)
const steps = reactive([])
const stepImgs = reactive([])


//於建立頁新增一個步驟
const addNewStep = () => {
    steps.push({ id: stepCounter.value, text: '', imgUrl: '' })
    stepImgs.push()
    stepCounter.value++
    // console.log(JSON.stringify(steps));
}
//預設生成步驟1、步驟2
onMounted(() => {
    addNewIngredient()
    addNewIngredient()
    addNewStep()
    addNewStep()
})
//刪除對應步驟
const handleDeleteStep = (deleteIndex) => {
    console.log(deleteIndex);
    steps.splice(deleteIndex - 1, 1)
    stepImgs.splice(deleteIndex - 1, 1)
}
//刪除對應食材
const handleDeleteIngredient = (deleteIngredient) => {
    // console.log(deleteIngredient);
    ingredients.splice(deleteIngredient - 1, 1)
}

//拖曳開始位置
let draggingIndex = null
const dragStart = (e, index) => {
    console.log('index ' + index)
    draggingIndex = index
    e.dataTransfer.effectAllowed = 'move'
}
//拖曳結束位置
const onDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggingIndex !== null && dropIndex !== null) {
        const movedItems = steps.splice(draggingIndex, 1)
        const movedPicItems = stepImgs.splice(draggingIndex, 1)
        const movedItem = movedItems[0]
        const movePicItem = movedPicItems[0]
        // console.log("dropIndex   " + dropIndex);
        // console.log("movedItem   " + JSON.stringify(movedItem));
        steps.splice(dropIndex, 0, movedItem)
        stepImgs.splice(dropIndex, 0, movePicItem)
        draggingIndex = null
    }
}



const handleStepData = (textIndex, textContent, imgData) => {
    steps[textIndex - 1].text = textContent;
    steps[textIndex - 1].imgUrl = imgData;
    stepImgs[textIndex - 1] = steps[textIndex - 1].imgUrl//處理步驟圖片

    // console.log(stepImgs.value);
    // stepImgs.forEach(stepImg => {
    //     console.log(stepImg);
    // })
    // console.log('textIndex:  ' + textIndex);
    // console.log('textContent:  ' + textContent);
    // console.log('imgData:  ' + imgData);
    // console.log('steps:  ');
    // console.log(steps);

}

const handleIngredientData = (ingerdientIndex, ingerdientName, ingerdientQty) => {
    ingredients[ingerdientIndex - 1].ingredientName = ingerdientName
    ingredients[ingerdientIndex - 1].ingredientQty = ingerdientQty
    // console.log('ingerdientIndex:  ' + ingerdientIndex);
    // console.log('ingerdientName:  ' + ingerdientName);
    // console.log('ingerdientQty: ' + ingerdientQty);
    // console.log('ingredients:  ');
    // console.log(ingredients);
}
//取得圖片資料
const recipeJsonData = ref(null)
//產生預覽圖
const recipePicPreviewImageUrl = ref(null)
const getRecipeImg = (e) => {

    const recipeImgData = e.target.files[0]
    if (recipeImgData) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64Data = e.target.result.split(',')[1]
            const jsonData = {
                fileName: recipeImgData.name,
                base64Content: base64Data
            }
            recipeJsonData.value = JSON.stringify(jsonData);
            // console.log(recipeJsonData.value);
            recipePicPreviewImageUrl.value = e.target.result
            console.log(recipeJsonData);
        }
        reader.readAsDataURL(recipeImgData);
    }
}

const data = reactive({
    recipeTitle: '',
    recipeIntroduction: '',
    pictureURL: [],
    ingredientPersons: '',
    cookingTime: '',
    ingredientList: [
        {
            ingredient: {
                ingredientName: '',
            },
            ingredientQuantity: 0,
            ingredientUnit: ''
        }
    ],
    recipeSteps: [
        {
            stepNumber: 1,
            stepPicture: '',
            stepContext: ''
        }
    ]
})

const imgDatas = reactive([])

const submitForm = async () => {
    // if (data) {
    // formData.append('recipeTitle', data.recipeTitle)
    // formData.append('recipeIntroduction', data.recipeIntroduction)
    // formData.append('pictureURL', recipeImgData.value)
    // formData.append('ingredientPersons', data.ingredientPersons)
    // formData.append('cookingTime', data.cookingTime)

    // formData.append('file', recipeImgData.value)
    // data.pictureURL.push(recipeImgData.value)

    imgDatas.push(recipeJsonData.value)
    stepImgs.forEach(stepImg => {
        imgDatas.push(stepImg)
    }
    )
    // formData.append('pictures', pictures)

    // ingredients.forEach(ingredient => {
    //     data.ingredients.push(ingredient)
    //     console.log(ingredient);
    // })
    // steps.forEach(step => {
    //     data.steps.push(step)
    //     console.log(step);
    // })


    // console.log(formData);
    console.log(imgDatas);

    console.log("imgData:  ");

    imgDatas.forEach(data => {
        console.log(data);
    })

    //將圖片push進recipeBean 容器中
    let res = await imgTest(imgDatas)
    let imgPaths = res.data
    console.log('imgPaths:  ');
    console.log(imgPaths);


    // 若[0]為"N"(資料有Exception) 或 "F"(沒找到圖片)則不執行
    if (imgPaths[0] !== "N" || imgPaths[0] !== "F") {
        //判斷是否有成品圖 找到[0]的-1則將 [1]中的資料放入
        //後續迴圈將步驟圖片放入
        if (imgPaths[0] === "-1") {
            data.pictureURL.push(imgPaths[1])
            for (let i = 2; i < imgPaths.length; i++) {
                const stepImg = imgPaths[i];
                data.recipeSteps.stepPicture.push(stepImg)
            }
        } else {
            //若沒有成品圖則直接迴圈取出步驟圖片
            imgPaths.forEach(stepImg => {
                data.recipeSteps.stepPicture.push(stepImg)
            })
        }
    }

    imgDatas.splice(0, imgDatas.length)  // }
}

const myForm = ref(null)
const handleSubmit = async () => {
    // const form = myForm.value

    const formDataObj = new FormData(myForm.value)
    const res = await addRecipe(formDataObj)
    if (res.data != null && res.data.length != 0) {
        console.log("新增成功");
    }
    formDataObj.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    })
}

</script>

<template>
    <div>

    </div>
    <h2>this is recipe create page</h2>

    <!-- <form @submit.prevent="handleSubmit" ref="myForm"> -->
    <div class="container">
        <div class="recipeContainer container">
            <div class="recipeTitleContainer container mt-3">
                <label for="recipeTitle" class="form-label">食譜名稱:</label><br>
                <input class="form-control" v-model="data.recipeTitle" type="text" id="recipeTitle" name="recipeTitle"
                    required="required">
            </div>
            <div class="recipeIntroductionContainer container mt-3">
                <label for="recipeIntroduction" class="form-label">食譜簡介:</label><br>
                <textarea class="recipeIntroduction form-control" style="resize: none;" v-model="data.recipeIntroduction"
                    id="recipeIntroduction" name="recipeIntroduction" required="required"></textarea>
                <br>

            </div>

            <h4>成品圖片:</h4>
            <div class="picContainer container ">
                <label for="pictureURL">
                    <div class="imageContainer ">
                        <img class="recipePic inputLabel custom-cursor-pointer " id="previewPic0" alt="成品圖片"
                            :src="recipePicPreviewImageUrl || 'https://fakeimg.pl/1180x310/?text=Image'">
                    </div>
                    <input @change="getRecipeImg" class="form-control visually-hidden pic" type="file" id="pictureURL"
                        name="pictureURL" accept="image/*"><br>
                </label><br><br>
            </div>
            <div class="container ml-3">
                <div class="ingredientContainer row justify-content-start">
                    <div class="ingredientQtyContainer col-4">
                        <p class="form-label">食材份量(人份)</p>
                        <select class="form-select" v-model="data.ingredientPersons" id="ingredientPersons">
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
                        <input class="form-control" v-model="data.cookingTime" type="text" id="cookingTime"
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
            <div class="newRecipeStepContainer d-grid">
                <button class="btn btn-light" @click="addNewStep">+ 增加步驟</button>
            </div>

            <br>
            <br>

        </div>
        <div class="crudbtn">
            <input type="submit" value="送出">
            <button class=" btn btn-light" @click="submitForm">發佈</button>
            <button class="btn btn-light">儲存</button>
            <button class="btn btn-light">取消</button>
            <button class="btn btn-light">刪除</button>

        </div>

    </div>
    <!-- </form> -->
</template>

<style scoped>
.recipeContainer {
    border: 2px solid black;
    border-radius: 5px;
}

.crudbtn {
    border: 2px solid black;
}

.recipePic {
    max-width: 1180px;
    max-height: 100%;
    /* object-fit: cover; */
}

.custom-cursor-pointer {
    cursor: pointer !important;
}
</style>