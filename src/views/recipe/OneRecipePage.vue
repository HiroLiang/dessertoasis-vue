<script setup>
import Bulletinboard from '../recipe/components/BulletinBoard.vue'
import Steps from '../recipe/components/Steps.vue'
import { NList, NListItem, NThing, NDescriptions, NDescriptionsItem, NGrid, NGi, NStatistic, NIcon, NAvatar, NCol, NRow, NButton } from 'naive-ui'
import { reactive } from 'vue';

const items = reactive([
    { stepNumber: 1, stepPicture: "https://picsum.photos//300/200?random=1", stepContext: "this is a step \nthis is a step \nthis is a step \n" },
    { stepNumber: 2, stepPicture: "https://picsum.photos//300/200?random=1", stepContext: "this is a step \nthis is a step \nthis is a step \n" },
    { stepNumber: 3, stepPicture: "https://picsum.photos//300/200?random=1", stepContext: "this is a step \nthis is a step \nthis is a step \n" }
])

const author = reactive({
    icon: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    name: "作者名稱測試",
    context: "test context test contexttest contexttest contexttest contexttest contexttest contexttest contexttest contexttest contexttest contexttest context"
})

const quantity = reactive(25)
const time = reactive(120)

const ingredients = reactive([
    { label: '蘋果', text: 1, unit: '顆' },
    { label: '橘子', text: 2, unit: '顆' },
    { label: '香蕉', text: 1, unit: '根' },
    { label: '葡萄', text: 1, unit: '串' },
],)

const introduction = reactive("Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu Biu")

</script>

<template>
    <div>
        <h2>this is a recipe page</h2>
        <div class="img container ">
            <img src="https://picsum.photos//500/400?random=1" alt="">
        </div>

        <div class="container border rounded mt-2">
            <div class="title mt-2 mb-2 container">
                <h1>食譜名稱</h1>
            </div>
        </div>
        <div class="container border rounded mt-2">

            <div class="introduction container">
                <n-list class="mt-2">
                    <h2>食譜簡介</h2>
                    <hr>
                    <n-list-item>
                        <n-thing>
                            {{ introduction }} <br>

                        </n-thing>
                    </n-list-item>
                </n-list>
            </div>
        </div>
        <div class="container border rounded mt-2 pb-2">
            <div class="ingredient container mt-2">
                <n-list class="mt-2">
                    <h2>食材份量</h2>
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
                    <n-descriptions label-placement="left" column="2">
                        <n-descriptions-item v-for="ingredient in ingredients" :label=ingredient.label>
                            {{ ingredient.text }}{{ ingredient.unit }}
                        </n-descriptions-item>
                    </n-descriptions>

                </n-list>
            </div>
        </div>

        <div class="container border rounded mt-3">
            <div class="container mt-3">
                <h2>料理步驟</h2>
            </div>
            <hr>
            <Steps v-for="item in items" v-bind="item"></Steps>
        </div>

        <div class="container border rounded mt-3">
            <div class="container mt-3">
                <h2>作者</h2>

                <hr>
                <n-list>
                    <n-row gutter="12">
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

                        <n-col span="12">
                            <div class="content-with-line-breaks fs-4">作者簡介</div>
                            <p>{{ author.context }}</p>
                        </n-col>
                    </n-row>
                </n-list>
            </div>
        </div>

        <hr>

        <Bulletinboard></Bulletinboard>
        <h2>what the hell</h2>
    </div>
</template>
<style scoped>
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
</style>