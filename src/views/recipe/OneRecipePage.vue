<script setup>
import Bulletinboard from '../recipe/components/BulletinBoard.vue'
import Steps from '../recipe/components/Steps.vue'
import { NList, NListItem, NThing, NDescriptions, NDescriptionsItem, NGrid, NGi, NStatistic, NIcon, NAvatar, NCol, NRow, NButton } from 'naive-ui'
import { reactive, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getRecipePicture, getRecipe } from '@/api'

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
const getRecipeData = async () => {
    console.log(recipeId.value);

    let res = await getRecipe(recipeId.value)
    console.log("recipeId");

    console.log("response");
    console.log(res.data);
}


</script>

<template>
    <button @click="getImg(19)">測試</button>
    <img :src="img" alt="">

    <button @click="getRecipeData(recipeId)">測試取得食譜資料</button>

    <div class="container contextContainer">
        <h2>this is a recipe page{{ recipeId }}</h2>
        <div class="imgContainer ">
            <img src="https://img-global.cpcdn.com/recipes/41750248e9f7fc9b/1360x964cq70/%E5%8F%AF%E9%BA%97%E9%9C%B29%E5%B7%B75%E5%BC%84-%E9%A3%9F%E8%AD%9C%E6%88%90%E5%93%81%E7%85%A7%E7%89%87.webp"
                alt="" class="img-fluid rounded">
        </div>

        <div class="container border rounded mt-2">
            <!-- <div class="container border rounded mt-2"> -->
            <div class="title mt-2 mb-2 container">
                <h4>經典可麗露</h4>
            </div>
            <!-- </div> -->
            <hr>
            <div class="introduction container">
                <n-list class="mt-2">
                    <h5>食譜簡介</h5>
                    <hr>
                    <n-list-item>
                        <n-thing class="stepText">
                            {{ introduction }} <br>

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
                            <n-statistic label="份量" :value="`${quantity}人份`" />
                        </n-gi>
                        <n-gi>
                            <n-statistic label="時間" :value="`${time} 分鐘`" />
                        </n-gi>
                    </n-grid>

                    <hr>
                    <n-descriptions label-placement="left" :column="2">
                        <n-descriptions-item v-for="ingredient in ingredients" :label=ingredient.label>
                            {{ ingredient.text }}{{ ingredient.unit }}
                        </n-descriptions-item>
                    </n-descriptions>

                </n-list>
                <br>
            </div>
            <!-- </div> -->
        </div>

        <div class="stepContainer container border rounded mt-3">
            <div class="container mt-3">
                <h5>料理步驟</h5>
            </div>
            <hr>
            <Steps v-for="item in items" v-bind="item"></Steps>
        </div>

        <div class="container border rounded mt-3">
            <div class="container mt-3">
                <h5>作者</h5>

                <hr>
                <n-list>
                    <n-row gutter="12" class="authorContainer justify-content-center">
                        <n-col span="4">
                            <n-list-item>
                                <div class="icon-title-container">
                                    <a class="icon-container" href="">
                                        <n-icon size="80">
                                            <n-avatar round size="50" :src="author.icon"></n-avatar>
                                        </n-icon>
                                    </a>
                                </div>
                                <div class="content-with-line-breaks fs-4">{{ author.name }}</div>
                                <n-button>查看作者食譜</n-button>
                            </n-list-item>

                        </n-col>

                        <n-col span="18">
                            <div class="content-with-line-breaks fs-4">作者簡介</div>
                            <p class="w-100">{{ author.context }}</p>
                        </n-col>
                    </n-row>
                </n-list>
            </div>
        </div>

        <hr>

        <!-- <Bulletinboard></Bulletinboard> -->
        <h2>what the hell</h2>
    </div>
</template>
<style scoped>
.imgContainer {
    /* width: 58vw; */
}

.imgContainer img {
    max-width: 100%;
    max-height: 60%;
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
</style>