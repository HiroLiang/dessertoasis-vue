<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import IngredientInput from '@/views/recipe/components/IngredientInput.vue'
import StepInput from '@/views/recipe/components/StepInput.vue'
import { getRecipe, deleteRecipe, updateRecipe, imgTest, republishRecipe } from '@/api'
import { useDialog, useNotification } from 'naive-ui';

const notification = useNotification()
const dialog = useDialog()
const route = useRoute()
const router = useRouter()
const recipeId = route.query.id

const steps = reactive([])
const stepImgs = reactive([])
const stepCounter = ref(0)

const ingredients = reactive([])
const ingredientCounter = ref(0)


//recipeBean物件
const recipe = ref([null])

const backToCms = () => {
    router.push("/cms/recipe")
}

const addNewIngredient = () => {
    ingredients.push({
        id: Number, ikey: ingredientCounter.value,
        ingredient: { id: Number, ingredientName: null },
        ingredientQuantity: null, ingredientUnit: "毫升"
    })
    ingredientCounter.value++
    // console.log(JSON.stringify(ingredients));
}

//於建立頁新增一個步驟
const addNewStep = () => {
    steps.push({
        id: null,
        skey: stepCounter.value,
        stepContext: null,
        stepNumber: stepCounter.value,
        stepPicture: null
    })
    stepImgs.push()
    // stepImgs.push()
    stepCounter.value++
    console.log(JSON.stringify(steps));
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

    if (recipe.value.recipeSteps) {
        recipe.value.recipeSteps.forEach(step => {
            steps.push({
                id: step.id,
                skey: stepCounter.value++,
                stepContext: step.stepContext,
                stepNumber: step.stepNumber,
                stepPicture: step.stepPicture
            })
        })
    }
    if (recipe.value.ingredientList) {
        recipe.value.ingredientList.forEach(ingredient => {
            ingredients.push({
                id: ingredient.id,
                ikey: ingredientCounter.value++,
                ingredient: { id: ingredient.ingredient.id, ingredientName: ingredient.ingredient.ingredientName },
                ingredientQuantity: ingredient.ingredientQuantity,
                ingredientUnit: ingredient.ingredientUnit
            })
        })
    }

    console.log('response');
    console.log(res.data);
})

/*----------------------------------------------圖檔資料處理區塊-------------------------------------------------------*/
//取得圖片資料
const recipeJsonData = ref(null)
//產生預覽圖
const recipePicPreviewImageUrl = ref(null)
const getRecipeImg = (e) => {
    //利用change事件取得圖檔
    const recipeImgData = e.target.files[0]
    if (recipeImgData) {
        //FileReader會自動讀取input中上傳的檔案
        const reader = new FileReader();
        //將圖檔轉成base64編碼
        reader.readAsDataURL(recipeImgData);
        //FileReader讀取完成時觸發onload事件
        reader.onload = (e) => {
            //讀取完成後利用e.target.result取得圖檔的base64編碼數據, 
            //並將其進行字串處理取得split後的的第二個元素(資料中base64編碼所在位置)
            const base64Data = e.target.result.split(',')[1]
            //將字串利用物件建立兩個屬性放入對應數據(屬性名稱一定要為fileName: 以及  base64Content:)
            const jsonData = {
                fileName: recipeImgData.name, //用以儲存圖檔檔名(const recipeImgData = e.target.files[0]中的name屬性值)
                base64Content: base64Data  //用以儲存base64字串
            }
            //jsonData物件轉成JSON格式放入物件內,用以傳送給Server
            recipeJsonData.value = JSON.stringify(jsonData);
            //用以利用 onbind img標籤內的src產生預覽圖
            recipe.value.pictureURL = e.target.result
            // console.log('recipeJsonData');
            // console.log(recipeJsonData.value);
            // console.log('base64');
            // console.log(base64Data);
        }
    }
}
/*----------------------------------------------圖檔資料處理區塊-------------------------------------------------------*/

//刪除對應步驟
const handleDeleteStep = (deleteIndex) => {
    console.log(deleteIndex);
    steps.splice(deleteIndex - 1, 1)
    // stepImgs.splice(deleteIndex - 1, 1)
}
//刪除對應食材
const handleDeleteIngredient = (deleteIngredient) => {
    console.log(deleteIngredient);
    ingredients.splice(deleteIngredient - 1, 1)
    recipe.value.ingredientList.splice(deleteIngredient - 1, 1)
}

const handleStepData = (textIndex, textContent) => {
    steps[textIndex - 1].stepContext = textContent;

    // stepImgs[textIndex - 1] = steps[textIndex - 1].imgUrl//處理步驟圖片
}

const handleStepPic = (textIndex, imgData) => {
    steps[textIndex - 1].stepPicture = imgData;
    stepImgs[textIndex - 1] = steps[textIndex - 1].stepPicture
    console.log('imgData');
    console.log(imgData);
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

/*----------------------------------------------圖檔傳送給controller區塊-------------------------------------------------------*/
const imgDatas = reactive([])

const handleClickUpdateButton = async () => {

    imgDatas.push(recipeJsonData.value)//成品圖
    stepImgs.forEach(stepImg => {//步驟圖
        imgDatas.push(stepImg)
    })

    //送出ajax請求給controller將圖檔於特定位置儲存
    if (imgDatas != null) {
        let imgRes = await imgTest(imgDatas)
        let imgPaths = imgRes.data

        console.log('imgDatas');
        console.log(imgDatas);
        console.log('imgPaths');
        console.log(imgPaths);

        //將圖片push進recipeBean 物件中
        // 若[0]為"N"(資料有Exception) 或 "F"(沒找到圖片)則不執行
        if (imgPaths[0] !== "N" && imgPaths[0] !== "F") {
            //判斷是否有成品圖 找到[0]的-1則將 [1]中的資料放入
            //後續迴圈將步驟圖片放入
            if (imgPaths[0] == "-1") {
                recipe.value.pictureURL = imgPaths[1]
                for (let i = 2; i < imgPaths.length; i++) {
                    const stepImg = imgPaths[i];
                    steps[i - 2].stepPicture = stepImg
                }
            } else {
                //若沒有成品圖則直接迴圈取出步驟圖片
                for (let i = 0; i < imgPaths.length; i++) {
                    const stepPath = imgPaths[i];
                    if (steps[i]) {
                        console.log('yes');
                        steps[i].stepPicture = stepPath
                        console.log(recipe.value.recipeSteps[i]);
                    }
                    console.log('no');
                }
            }
        }
        // //清空成品圖與步驟圖的檔名及base64字串陣列
        imgDatas.splice(0, imgDatas.length)  // }
    }

    console.log(recipe.value);
    recipe.value.ingredientList = ingredients.map(ingredient => ({
        id: ingredient.id,
        ingredient: { id: ingredient.ingredient.id, ingredientName: ingredient.ingredient.ingredientName },
        ingredientQuantity: ingredient.ingredientQuantity,
        ingredientUnit: ingredient.ingredientUnit
    }));
    recipe.value.recipeSteps = steps.map(step => ({
        id: step.id,
        stepContext: step.stepContext,
        stepNumber: step.stepNumber,
        stepPicture: step.stepPicture
    })
    )

    await updateRecipe(recipe.value)
    notification.success(
        {
            description: "建立狀態",
            content: "成功更新食譜",
            duration: 3000
        }
    )
    router.replace({
        path: '/cms/recipe',
    })

}

const handleClickRepublish = async () => {
    await republishRecipe(recipeId)
    router.push("/cms/recipe")
}

const handleUpdate = () => {
    dialog.warning({
        title: "警告",
        content: "確定要更新這筆資料?",
        positiveText: "確定",
        negativeText: "取消",
        onPositiveClick: () => {
            handleClickUpdateButton()
        },
    })
}
const handleClickRepublishButton = () => {
    dialog.warning({
        title: "警告",
        content: "確定要重新啟用這筆資料?",
        positiveText: "確定",
        negativeText: "取消",
        onPositiveClick: () => {
            handleClickRepublish()
        },
    })
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
                    <StepInput v-for="(step, index) in steps" :key="step.skey" :stepIndex="index + 1"
                        :textContent="step.stepContext" :previewImageUrl="step.stepPicture" @delete-step="handleDeleteStep"
                        draggable="false" @dragstart="dragStart($event, index)" @drop="onDrop($event, index)"
                        @dragenter.prevent @dragover.prevent @get-step-data="handleStepData" @get-img-data="handleStepPic">
                    </StepInput>
                </div>
                <div class="newRecipeStepContainer d-grid mb-3 mt-2">
                    <button class="btn btn-light" @click="addNewStep">+ 增加步驟</button>
                </div>

            </div>
            <div class=" crudbtn col-md-1 align-self-start position-sticky" style="top: 100px;">
                <div class="btn row border border-second rounded px-2 pb-2">
                    <button class="btn btn-light mb-2" @click="handleUpdate">更新</button>
                    <button type="reset" class="btn btn-light mb-2" @click="backToCms">取消</button>
                    <button v-if="recipe.recipeStatus !== 2" class="btn btn-light mb-2"
                        @click="handleClickDeleteButton">刪除</button>
                    <button v-else class="btn btn-light mb-2" @click="handleClickRepublishButton">啟用</button>
                    <!-- {{ recipe.recipeStatus }} -->
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