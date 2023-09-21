<script setup>
import { ref, computed, onMounted } from 'vue';
import { useChart } from '../../stores/Chart';
import { useRouter } from "vue-router"
import { NCard, NTabs, NTabPane, NNumberAnimation, NStatistic } from 'naive-ui'
import TodoList from './components/TodoList.vue'

const router = useRouter()

const store = useChart()

const totalVisitRef = ref(null)

//定義統計資料

const websiteVisit = computed(() => {
    return store.visitRecord.website + store.visitRecord.recipe + store.visitRecord.course + store.visitRecord.product
})

const targetCount = computed(() => {
    return store.targetCount.recipe + store.targetCount.product + store.targetCount.course
})

const saleRate = computed(() => {
    return store.targetCount.sale * 100 / websiteVisit.value
})

const todoCount = ref(0)

const onGetCount = (count) => {
    todoCount.value = count
}

const presonalData = ref([0, 3, 56, 0])

onMounted(() => {
    totalVisitRef.value.play()
    store.initChart()
})
</script>
<template>
    <div
        style="background-color: rgb(235, 234, 234);padding-top: 10px; display: flex;flex-direction: column;justify-content: center;align-items: center;width: 100%;height: 100%;">
        <div class="countDatas">
            <n-card style="border-radius: 20px;">
                <n-tabs type="line" animated>
                    <n-tab-pane name="網站統計" tab="網站統計">
                        <div class="visitContainer">
                            <div class="totalVisitContainer" @click="router.replace({ name: 'cmsChartVisit' })">
                                <n-statistic label="總訪問數" tabular-nums class="dataContainer">
                                    <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="websiteVisit" />
                                    <template #suffix>
                                        <span style="font-size: 12px;">次</span>
                                    </template>
                                </n-statistic>
                            </div>
                            <div class="totalVisitContainer">
                                <n-statistic label="可用教室" tabular-nums class="dataContainer">
                                    <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="4" />
                                    <template #suffix>
                                        <span style="font-size: 12px;">間</span>
                                    </template>
                                </n-statistic>
                            </div>
                            <div class="totalVisitContainer" @click="router.replace({ name: 'cmsChartCount' })">
                                <n-statistic label="項目總數" tabular-nums class="dataContainer">
                                    <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="targetCount" />
                                    <template #suffix>
                                        <span style="font-size: 12px;">篇</span>
                                    </template>
                                </n-statistic>
                            </div>
                            <div class="totalVisitContainer">
                                <n-statistic label="產品銷售率" tabular-nums class="dataContainer">
                                    <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="saleRate" />
                                    <template #suffix>
                                        <span style="font-size: 14px;">%</span>
                                    </template>
                                </n-statistic>
                            </div>
                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="個人統計" tab="個人統計">
                        <div class="visitContainer">
                            <div class="totalVisitContainer">
                                <n-statistic label="未結案件" tabular-nums class="dataContainer">
                                    <n-number-animation ref="totalVisitRef" show-separator :from="0"
                                        :to="presonalData[0]" />
                                    <template #suffix>
                                        <span style="font-size: 12px;">件</span>
                                    </template>
                                </n-statistic>
                            </div>
                            <div class="totalVisitContainer">
                                <n-statistic label="待確認請求" tabular-nums class="dataContainer">
                                    <n-number-animation ref="totalVisitRef" show-separator :from="0"
                                        :to="presonalData[1]" />
                                    <template #suffix>
                                        <span style="font-size: 12px;">件</span>
                                    </template>
                                </n-statistic>
                            </div>
                            <div class="totalVisitContainer">
                                <n-statistic label="特休剩餘" tabular-nums class="dataContainer">
                                    <n-number-animation ref="totalVisitRef" show-separator :from="0"
                                        :to="presonalData[2]" />
                                    <template #suffix>
                                        <span style="font-size: 12px;">/小時</span>
                                    </template>
                                </n-statistic>
                            </div>
                            <div class="totalVisitContainer">
                                <n-statistic label="待辦事項" tabular-nums class="dataContainer">
                                    <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="todoCount" />
                                    <template #suffix>
                                        <span style="font-size: 12px;">件</span>
                                    </template>
                                </n-statistic>
                            </div>
                        </div>
                    </n-tab-pane>
                </n-tabs>
            </n-card>
        </div>
        <div class="chartView">
            <router-view />
            <div class="listContainer">
                <TodoList @get-count="onGetCount" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.countDatas {
    width: 95%;
    margin: 10px;
    z-index: 2;
    flex-grow: 1;
    padding: 5px;
    overflow: hidden;
}

.visitContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.visitContainer>div {
    flex-grow: 1;
    cursor: pointer;
}

.visitContainer>div:hover {
    background-color: rgb(246, 245, 245);
}

.totalVisitContainer {
    margin: 0;
    padding: 0;
    height: 80px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.dataContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.chartView {
    padding-left: 10px;
    padding-right: 10px;
    flex-grow: 3;
    width: 95%;
    display: flex;
    justify-content: center;

}

.listContainer {
    height: 380px;
    margin-left: 10px;
    background-color: white;
    border-radius: 20px;
    width: 40%;
}
</style>