<script setup>
import Bulletinboard from '../recipe/components/BulletinBoard.vue'
import Steps from '../recipe/components/Steps.vue'
import { NList, NListItem, NThing, NDescriptions, NDescriptionsItem, NGrid, NGi, NStatistic, NIcon, NAvatar, NCol, NRow, NButton } from 'naive-ui'
import { reactive, computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getRecipePicture, getRecipe, getStepPictures } from '@/api'

const route = useRoute()
const recipeId = computed(() => {
    console.log(route.query);
    return route.query.id
})

const items = reactive([
    { stepNumber: 1, stepPicture: "https://img-global.cpcdn.com/steps/799ffaddd2adc1a0/640x640sq70/photo.webp", stepContext: "牛奶、奶油、香草莢（取出香草籽跟果莢）一起加熱至微滾，熄火後，稍微放涼至溫溫的溫度。" },
    { stepNumber: 2, stepPicture: "https://img-global.cpcdn.com/steps/19756d92cb8004e9/640x640sq70/photo.webp", stepContext: "麵粉、糖、鹽攪拌均勻，加入全蛋、蛋黃拌勻" },
    { stepNumber: 3, stepPicture: "https://img-global.cpcdn.com/steps/3ccfa2a360741d10/640x640sq70/photo.webp", stepContext: "香草牛奶加入麵糊中拌勻" },
    { stepNumber: 4, stepPicture: "https://img-global.cpcdn.com/steps/b25596f39cac6310/640x640sq70/photo.webp", stepContext: "香草牛奶加入麵糊中拌勻" },
    { stepNumber: 5, stepPicture: "https://img-global.cpcdn.com/steps/f6a41e5807b8e659/640x640sq70/photo.webp", stepContext: "加入萊姆酒拌勻，密封冷藏隔夜" },
    { stepNumber: 6, stepPicture: "https://img-global.cpcdn.com/steps/2c50379883574547/640x640sq70/photo.webp", stepContext: "模具刷上適量奶油，預防脫模時沾黏。" },
    { stepNumber: 7, stepPicture: "https://img-global.cpcdn.com/steps/367cb28ec829bff3/640x640sq70/photo.webp", stepContext: "麵糊過篩後倒入模具中，約8-9分滿。" },
    { stepNumber: 8, stepPicture: "https://img-global.cpcdn.com/steps/76d29bfbafc2ad26/640x640sq70/photo.webp", stepContext: "烤箱預熱，先用200度烤15分鐘，再用180度烤30-35分鐘" },
])

const author = reactive({
    icon: "https://t1.tp88.net/uploads/allimg/2003/co20030H20647-3.jpg",
    name: "黃小明",
    context: "一位專注於創作精緻甜點的專業廚師和作家。從小就對烘焙甜品有著無比的熱愛，我將這份熱情轉化為了我的職業。自從十年前出版了我的第一本甜點食譜書後，我便致力於透過文字和美食分享這份熱情。"
})

const quantity = ref(12)
const time = ref(90)

const ingredients = reactive([
    { label: '牛奶', text: 550, unit: 'ml' },
    { label: '無鹽奶油', text: 50, unit: 'g' },
    { label: '砂糖', text: 220, unit: 'g' },
    { label: '鹽', text: '', unit: '少許' },
    { label: '高筋麵粉', text: '110', unit: 'g' },
    { label: '全蛋', text: '2', unit: '顆' },
    { label: '蛋黃', text: '2', unit: '顆' },
    { label: '蘭姆酒', text: '50', unit: 'ml' },
    { label: '香草莢', text: '1', unit: '支' },
],)

const introduction = ref("外型小巧可愛的可麗露也被稱為天使的鈴鐺，傳統的做法中需要用到蜂蠟和銅模，因此試做的難度比較高，這次分享的配方及做法盡量簡化成一般在家裡就能做的版本")


/*----------------------﹀﹀﹀﹀﹀﹀﹀﹀前端接收圖片範例﹀﹀﹀﹀﹀﹀﹀﹀--------------------------*/
const img = ref(null)
const getImg = async (id) => {
    let res = await getRecipePicture(id)
    const body = res.data
    const header = res.headers['content-type']

    console.log(body);
    console.log(header);

    img.value = `data:${header};base64,${body}`

}
/*----------------------﹀﹀﹀﹀﹀﹀﹀﹀前端接收圖片範例﹀﹀﹀﹀﹀﹀﹀﹀--------------------------*/

const recipeData = ref({
    recipeTitle: "",
    recipeIntroduction: "",
    pictureUrl: "",
    ingredientPersons: Number,
    cookingTime: Number,
    recipeAthor: {},
    ingredients: [
        //     {
        //     // label: '牛奶', 
        //     // text: 550, 
        //     // unit: 'ml'
        // }
    ],
    stpes: [
        //     {
        //     // stepNumber: Number,
        //     // stepPicture: `data:${header};base64,${body}`,
        //     // stepContext: String
        // }
    ],
})

onMounted(async () => {
    console.log("recipeId");
    console.log(recipeId.value);
    //處理成品圖片
    let mainPic = await getRecipePicture(recipeId.value)
    let mainPicBody = mainPic.data
    let mainPicHeader = mainPic.headers['content-type']
    recipeData.value.pictureUrl = `data:${mainPicHeader};base64,${mainPicBody}`

    //處理步驟圖片
    let stepPic = await getStepPictures(recipeId.value)
    let headers = []
    let bodies = []
    let stepPics = stepPic.data
    for (let i = 0; i < stepPics.length; i += 2) {
        if (i + 1 < stepPics.length) {
            headers.push(stepPics[i])
            bodies.push(stepPics[i + 1])
        }
    }

    let recipe = await getRecipe(recipeId.value)
    let datas = recipe.data

    recipeData.value.recipeTitle = datas.recipeTitle
    recipeData.value.recipeIntroduction = datas.recipeIntroduction
    recipeData.value.cookingTime = datas.cookingTime
    recipeData.value.ingredientPersons = datas.ingredientPersons
    recipeData.value.recipeAthor = datas.recipeAuthor.fullName

    //處理食譜步驟
    for (let i = 0; i < datas.recipeSteps.length; i++) {
        const stepHeader = headers[i];
        const stepBody = bodies[i];
        let step = {
            stepNumber: datas.recipeSteps[i].stepNumber,
            stepPicture: `data:${stepHeader};base64,${stepBody}`,
            stepContext: datas.recipeSteps[i].stepContext
        }
        recipeData.value.stpes.push(step)
    }
    console.log("steps");
    console.log(recipeData.value.stpes);
    //處理食材
    for (let i = 0; i < datas.ingredientList.length; i++) {
        let ingredient = {
            label: datas.ingredientList[i].ingredient.ingredientName,
            text: datas.ingredientList[i].ingredientQuantity,
            unit: datas.ingredientList[i].ingredientUnit

        }
        recipeData.value.ingredients.push(ingredient)
    }
    console.log("ingredients");
    console.log(recipeData.value.ingredients);


    console.log("recipeData");
    console.log(recipeData);


    console.log("response");
    console.log(datas);
})


</script>

<template>
    <!-- <button @click="getImg(55)">測試</button>
    <img :src="img" alt="">

    <button @click="getRecipeData(18)">測試取得食譜資料</button> -->



    <div class="container contextContainer">
        <!-- <h2>this is a recipe page{{ recipeId }}</h2> -->
        <div class="imgContainer ">
            <img :src="recipeData.pictureUrl" alt="" class="img-fluid rounded">
        </div>

        <div class="container border rounded mt-2">
            <!-- <div class="container border rounded mt-2"> -->
            <div class="title mt-3 mb-2 container">
                <h4>{{ recipeData.recipeTitle }}</h4>
            </div>
            <!-- </div> -->
            <hr>
            <div class="introduction container">
                <n-list class="mt-2">
                    <h5>食譜簡介</h5>
                    <hr>
                    <n-list-item>
                        <n-thing class="stepText">
                            {{ recipeData.recipeIntroduction }} <br>

                        </n-thing>
                    </n-list-item>
                </n-list>
            </div>
            <!-- <div class="container border rounded mt-2 pb-2"> -->
            <div class="ingredient container mt-2">
                <n-list>
                    <h5>食材份量</h5>
                    <hr>
                    <n-grid :cols="2">
                        <n-gi>
                            <n-statistic label="份量" :value="`${recipeData.ingredientPersons}人份`" />
                        </n-gi>
                        <n-gi>
                            <n-statistic label="時間" :value="`${recipeData.cookingTime} 分鐘`" />
                        </n-gi>
                    </n-grid>

                    <hr>
                    <n-descriptions label-placement="left" :column="2">
                        <n-descriptions-item v-for="ingredient in recipeData.ingredients" :label=ingredient.label>
                            {{ ingredient.text }}{{ ingredient.unit }}
                        </n-descriptions-item>
                    </n-descriptions>

                </n-list>
                <br>
            </div>
            <!-- </div> -->
        </div>

        <div class="stepContainer p-3 border rounded mt-3">
            <div class="container mt-1">
                <h5>料理步驟</h5>
            </div>
            <hr>
            <Steps v-for="item in recipeData.stpes" v-bind="item"></Steps>
        </div>

        <div class="container border rounded mt-3">
            <div class="container mt-3">
                <h5>作者</h5>

                <hr>
                <n-list>
                    <n-row gutter="12" class="authorContainer justify-content-center">
                        <n-col span="4" class="iconContainer">
                            <n-list-item>
                                <div class="icon-title-container">
                                    <a class="icon-container" href="">
                                        <n-icon size="80">
                                            <n-avatar round size="50" :src="author.icon"></n-avatar>
                                        </n-icon>
                                    </a>
                                </div>
                                <div class="content-with-line-breaks fs-4">{{ recipeData.recipeAthor }}</div>
                                <n-button>查看作者食譜</n-button>
                            </n-list-item>

                        </n-col>

                        <n-col span="18" class="border-start mb-3 px-4 mt-1">
                            <div class="content-with-line-breaks fs-4">作者簡介</div>
                            <p class="w-100 ">{{ author.context }}</p>
                        </n-col>
                    </n-row>
                </n-list>
            </div>
        </div>

        <hr>

        <!-- <Bulletinboard></Bulletinboard> -->
    </div>
</template>
<style scoped>
/* .imgContainer {
     width: 100vw; 
} */

.imgContainer img {
    width: 100%;
    max-height: 80vh;
    object-fit: cover;
    object-position: center;
}

.n-descriptions {
    font-size: 26px;
}

.n-page-header .n-page-header__title {
    margin-right: 16px;
    transition: color .3s var(--n-bezier);
    font-size: var(--n-title-font-size);
    font-weight: var(--n-title-font-weight);
    color: var(--n-title-text-color);
}

.contextContainer {
    width: 60.2vw;
}

.stepText {
    white-space: pre-line;
    font-size: 20px
}

@media (max-width: 1200px) {
    .authorContainer {
        flex-direction: column;
    }

}

@media (max-width: 1200px) {
    .iconContainer {
        width: auto;
        display: block;
    }
}
</style>