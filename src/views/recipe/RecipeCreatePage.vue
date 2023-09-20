<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'

import IngredientInput from '@/views/recipe/components/IngredientInput.vue'
import StepInput from '@/views/recipe/components/StepInput.vue'
import { addRecipe, imgTest, reqGetCategory } from '@/api'
import { useMessage, useNotification, NTreeSelect, useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'

const notification = useNotification()
const message = useMessage()
const dialog = useDialog()
const router = useRouter()

const ingredientCounter = ref(0)
const ingredients = reactive([])

//於建立頁新增一筆食材
const addNewIngredient = () => {
    ingredients.push({ id: ingredientCounter.value, ingredientName: '', ingredientQty: '', ingredientUnit: '' })
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
    // e.dataTransfer.effectAllowed = 'move'
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



const handleStepData = (textIndex, textContent) => {
    steps[textIndex - 1].text = textContent;


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

const handleStepPic = (textIndex, imgData) => {
    steps[textIndex - 1].imgUrl = imgData;
    stepImgs[textIndex - 1] = steps[textIndex - 1].imgUrl//處理步驟圖片
}

const handleIngredientData = (ingerdientIndex, ingerdientName, ingerdientQty, ingerdientUnit) => {
    ingredients[ingerdientIndex - 1].ingredientName = ingerdientName
    ingredients[ingerdientIndex - 1].ingredientQty = ingerdientQty
    ingredients[ingerdientIndex - 1].ingredientUnit = ingerdientUnit
    // console.log('ingerdientIndex:  ' + ingerdientIndex);
    // console.log('ingerdientName:  ' + ingerdientName);
    // console.log('ingerdientQty: ' + ingerdientQty);
    // console.log('ingredients:  ');
    // console.log(ingredients);
}

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
            recipePicPreviewImageUrl.value = e.target.result
            console.log('recipeJsonData');
            console.log(recipeJsonData.value);
            console.log('base64');
            console.log(base64Data);
        }
    }
}
/*----------------------------------------------圖檔資料處理區塊-------------------------------------------------------*/

//recipeBean物件
const data = reactive({
    recipe: {
        recipeTitle: '',
        recipeIntroduction: '',
        difficulty: '',
        pictureURL: '',
        ingredientPersons: Number,
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
const persons = ref(1)

//判斷有無鍵入資料
const isDataEmpty = () => {
    let errors = []

    if (data.recipe.recipeTitle.trim() === '') {
        errors.push('食譜標題不能空白')
    }
    if (data.recipe.recipeIntroduction.trim() === '') {
        errors.push('食譜簡介不能空白')
    }
    if (data.recipe.cookingTime <= 0) {
        errors.push('烹調時間不可小於0')
    }
    ingredients.forEach(ingredient => {
        if (ingredient.ingredientName.trim() === '') {
            errors.push('食材名稱不可空白')
        }
    })

    console.log('BEFORE IN');
    ingredients.forEach(ingredient => {
        console.log(ingredient.ingredientQty);
        if (parseInt(ingredient.ingredientQty) <= 0 || (ingredient.ingredientQty).trim() === '') {
            console.log(ingredient.ingredientQty);
            errors.push('食材份量不可小於0')
        }
        console.log('IN');
    })
    console.log('AFTER IN');

    steps.forEach(step => {
        if (step.text.trim() === '')
            errors.push('步驟內容不可空白')
    })
    if (errors.length > 0) {
        errors.forEach(error => {
            message.info(error); // 使用 message.error 顯示錯誤訊息
        });
        return false; // 返回 false 表示有錯誤

    }

    return true; // 沒有錯誤則返回 true
}


/*----------------------------------------------圖檔傳送給controller區塊-------------------------------------------------------*/
const imgDatas = reactive([])
//處理recipeBean要送出給server
const submitForm = async () => {

    //將成品圖與步驟圖的檔名及base64字串放入陣列
    imgDatas.push(recipeJsonData.value)//成品圖
    stepImgs.forEach(stepImg => {//步驟圖
        imgDatas.push(stepImg)
    })
    if (!isDataEmpty()) {
        return
    } else {
        ingredients.forEach(ingredient => {
            data.recipe.ingredientList.push({
                ingredientQuantity: ingredient.ingredientQty,
                ingredientUnit: ingredient.ingredientUnit
            })
        })
        ingredients.forEach(ingredient => {
            data.ingredients.push({
                ingredientName: ingredient.ingredientName
            })
            // console.log('ingredientName' + ingredient.ingredientName);
        })
        steps.forEach(step => {
            data.recipe.recipeSteps.push({
                stepNumber: data.recipe.recipeSteps.length + 1,
                stepPicture: '',
                stepContext: step.text
            })
            // console.log(step);
        })

        selectedItems.value.forEach(cate => {
            data.categories.push(
                {
                    id: cate
                }
            )
        })

        //判斷難易度字串
        if (selecteddif.value == 87) {
            data.recipe.difficulty = "簡單"
        } else if (selecteddif.value == 88) {
            data.recipe.difficulty = "中等"
        } else if (selecteddif.value == 89) {
            data.recipe.difficulty = "困難"
        }

        data.recipe.ingredientPersons = persons.value

        console.log('persons.value');
        console.log(persons.value);

        console.log('data.recipe.ingredientPersons');
        console.log(data.recipe.ingredientPersons);

        console.log('RecipeData');
        console.log(data);

        // console.log(formData);
        // console.log(imgDatas);

        // console.log("imgData:  ");

        // imgDatas.forEach(data => {
        //     console.log(data);
        // })

        //送出ajax請求給controller將圖檔於特定位置儲存
        let res = await imgTest(imgDatas)
        //接收controller回傳的儲存位置字串
        let imgPaths = res.data
        // console.log('imgPaths:  ');
        // console.log(imgPaths);

        //將圖片push進recipeBean 物件中
        // 若[0]為"N"(資料有Exception) 或 "F"(沒找到圖片)則不執行
        if (imgPaths[0] !== "N" && imgPaths[0] !== "F") {
            //判斷是否有成品圖 找到[0]的-1則將 [1]中的資料放入
            //後續迴圈將步驟圖片放入
            if (imgPaths[0] == "-1") {
                data.recipe.pictureURL = imgPaths[1]
                for (let i = 2; i < imgPaths.length; i++) {
                    const stepImg = imgPaths[i];
                    data.recipe.recipeSteps[i - 2].stepPicture = stepImg
                }
            } else {
                //若沒有成品圖則直接迴圈取出步驟圖片
                data.recipe.pictureURL = null
                imgPaths.forEach((stepImg, index) => {
                    if (data.recipe.recipeSteps[index]) {
                        data.recipe.recipeSteps[index].stepPicture = stepImg
                    }
                })
            }
        }
        //清空成品圖與步驟圖的檔名及base64字串陣列
        imgDatas.splice(0, imgDatas.length)  // }
        let recipeData = await addRecipe(data)
        router.replace({
            path: '/recipes/recipe',
            query: { id: recipeData.data }
        })
        console.log(recipeData);
    }
    notification.success(
        {
            description: "建立狀態",
            content: "成功發佈食譜",
            duration: 3000
        })

}

const cancelPost = () => {
    router.replace({
        path: '/recipes',
    })
}

const handelDeleteClick = () => {
    dialog.warning({
        title: "警告",
        content: "確定要刪除這筆資料?",
        positiveText: "確定",
        negativeText: "取消",
        onPositiveClick: () => {
            cancelPost()
        },
    })
}


const ajaxOptions = ref([
    // categoryName: "食譜"
    // children: 
    // 0: {id: 15, categoryName: '麵包', parentId: 3, parent: {…}, children: Array(5), …}
    // 1: {id: 16, categoryName: '甜點', parentId: 3, parent: {…}, children: Array(7), …}
    // 2: {id: 17, categoryName: '食材', parentId: 3, parent: {…}, children: Array(10), …}
    // 3:{id: 18, categoryName: '難易度', parentId: 3, parent: {…}, children: Array(3), …}
])
const options = reactive([
    // {
    //     label: "Rubber Soul",
    //     key: "Rubber Soul",
    //     children: [
    //         {
    //             label: "Everybody's Got Something to Hide Except Me and My Monkey",
    //             key: "Everybody's Got Something to Hide Except Me and My Monkey"
    //         },
    //     ]
    // },
    // {
    //     label: "Let It Be",
    //     key: "Let It Be Album",
    //     children: [
    //         {
    //             label: "Two Of Us",
    //             key: "Two Of Us"
    //         },

    //     ]
    // }
])

const difficultyOptions = reactive([])

onBeforeMount(async () => {
    let category = await reqGetCategory(3)
    ajaxOptions.value = category.data

    //處理食譜分類
    ajaxOptions.value.children.forEach((item, index) => {
        if (index < 3) {
            options.push({
                label: item.categoryName,
                key: item.id,
                children: item.children.map(child => ({
                    label: child.categoryName,
                    key: child.id
                }))
            })
        }

    })
    //處理食譜難易度
    ajaxOptions.value.children[3].children.forEach(dif => {
        difficultyOptions.push({
            label: dif.categoryName,
            key: dif.id,

        })
    })


    // console.log(ajaxOptions.value);

    // console.log(ajaxOptions.value.children[3]);
})

const selectedItems = ref([]);
const selecteddif = ref();

const handleUpdateValue = (value) => {
    // const specific15Childrens = [65, 66, 67, 68, 69];
    // const specific16Childrens = [70, 71, 72, 73, 74, 75, 76]
    // const specific18Childrens = [87, 88, 89]
    // const difficultyIndex = specific18Childrens.indexOf(value);

    // if (difficultyIndex !== -1) {
    //     value.splice(difficultyIndex, 1)
    // }

    // const parent15IsSelected = specific15Childrens.some(childrenKey => value.includes(childrenKey));
    // const parent16IsSelected = specific16Childrens.some(childrenKey => value.includes(childrenKey));



    // if (value.length === 0) {
    //     // 如果沒有選擇任何項目，取消禁用所有parent
    //     selectedParent.value = null;
    //     console.log('no limit');
    //     return;
    // }

    selectedItems.value = value
    // console.log('selectedItems------');
    // console.log(selectedItems.value);

    console.log(value);
    console.log('selectedItems');
    console.log(selectedItems.value);

    // console.log(data.recipe.difficulty);
}

const handledifValue = (dif) => {
    selecteddif.value = dif
    // console.log(selecteddif.value);
}

/*----------------------------------------------圖檔傳送給controller區塊-------------------------------------------------------*/

// const myForm = ref(null)
// const handleSubmit = async () => {
//     // const form = myForm.value

//     const formDataObj = new FormData(myForm.value)
//     const res = await addRecipe(formDataObj)
//     if (res.data != null && res.data.length != 0) {
//         console.log("新增成功");
//     }
//     formDataObj.forEach((value, key) => {
//         console.log(`${key}: ${value}`);
//     })
// }

</script>

<template>
    <!-- <form @submit.prevent="submitForm"> -->
    <div class="container">
        <div class="row ">
            <div class="recipeContainer container col-md-10 border rounded">
                <div class="recipeTitleContainer container mt-3">
                    <label for="recipeTitle" class="form-label">食譜名稱:</label><br>
                    <input class="form-control" v-model="data.recipe.recipeTitle" type="text" id="recipeTitle"
                        name="recipeTitle" required="required">
                </div>
                <div class="recipeIntroductionContainer container mt-3">
                    <label for="recipeIntroduction" class="form-label">食譜簡介:</label><br>
                    <textarea class="recipeIntroduction form-control" style="resize: none; rows=5;"
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
                    <n-tree-select class="selectTree" :multiple="true" checkable :options="options"
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
                            <select class="form-select" v-model="persons" id="ingredientPersons">
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
                        @drop="onDrop($event, index)" @dragenter.prevent @dragover.prevent @get-step-data="handleStepData"
                        @get-img-data="handleStepPic">
                    </StepInput>
                </div>
                <div class="newRecipeStepContainer d-grid mb-3 mt-2">
                    <button class="btn btn-light" @click="addNewStep">+ 增加步驟</button>
                </div>

            </div>
            <div class=" crudbtn col-md-1 align-self-start position-sticky" style="top: 100px;">
                <div class="btn row border rounded px-2 pb-2">

                    <button type="submit" class=" btn btn-light mb-2 mt-2" @click="submitForm">發佈</button>
                    <button class="btn btn-light mb-2">儲存</button>
                    <button type="reset" class="btn btn-light mb-2" @click="cancelPost">取消</button>
                    <button class="btn btn-light mb-2" @click="handelDeleteClick">刪除</button>

                </div>
            </div>
        </div>
    </div>
    <!-- </form> -->
</template>

<style scoped>
.recipePic {
    max-width: 100%;
    max-height: 100%;
    /* object-fit: cover; */
}

.recipeContainer {
    border-color: gray;
}

.custom-cursor-pointer {
    cursor: pointer !important;
}
</style>