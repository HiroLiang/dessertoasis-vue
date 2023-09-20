<script setup>
import { ref, onMounted } from 'vue';
import { NCard, NTabs, NTabPane, NNumberAnimation, NStatistic } from 'naive-ui'

const totalVisitRef = ref(null)

//定義統計資料
const totalVisit = ref([9980, 12, 23, 3])

const presonalSum = ref([1203400, 123, 56, 0])



onMounted(() => {
    totalVisitRef.value.play()
})
</script>
<template>
    <div class="countDatas">
        <n-card style="border-radius: 20px;">
            <n-tabs type="line" animated>
                <n-tab-pane name="網站統計" tab="網站統計">
                    <div class="visitContainer">
                        <div class="totalVisitContainer">
                            <n-statistic label="月訪問數" tabular-nums class="dataContainer">
                                <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="totalVisit[0]" />
                                <template #suffix>
                                    <span style="font-size: 12px;">次</span>
                                </template>
                            </n-statistic>
                        </div>
                        <div class="totalVisitContainer">
                            <n-statistic label="可用教室" tabular-nums class="dataContainer">
                                <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="totalVisit[3]" />
                                <template #suffix>
                                    <span style="font-size: 12px;">間</span>
                                </template>
                            </n-statistic>
                        </div>
                        <div class="totalVisitContainer">
                            <n-statistic label="項目總數" tabular-nums class="dataContainer">
                                <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="totalVisit[1]" />
                                <template #suffix>
                                    <span style="font-size: 12px;">篇</span>
                                </template>
                            </n-statistic>
                        </div>
                        <div class="totalVisitContainer">
                            <n-statistic label="產品銷售率" tabular-nums class="dataContainer">
                                <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="totalVisit[2]" />
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
                            <n-statistic label="月營收" tabular-nums class="dataContainer">
                                <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="presonalSum[0]" />
                                <template #suffix>
                                    <span style="font-size: 16px;">$</span>
                                </template>
                            </n-statistic>
                        </div>
                        <div class="totalVisitContainer">
                            <n-statistic label="商品數量" tabular-nums class="dataContainer">
                                <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="presonalSum[1]" />
                                <template #suffix>
                                    <span style="font-size: 16px;">$</span>
                                </template>
                            </n-statistic>
                        </div>
                        <div class="totalVisitContainer">
                            <n-statistic label="特休剩餘" tabular-nums class="dataContainer">
                                <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="presonalSum[2]" />
                                <template #suffix>
                                    <span style="font-size: 12px;">/小時</span>
                                </template>
                            </n-statistic>
                        </div>
                        <div class="totalVisitContainer">
                            <n-statistic label="待辦事項" tabular-nums class="dataContainer">
                                <n-number-animation ref="totalVisitRef" show-separator :from="0" :to="presonalSum[3]" />
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
    <div class="business">
        <div class="mainBusiness">
            <div class="productSale">
                <h2>商品銷售圖表</h2>
            </div>
            <div class="commendCount">
                <h2>評論統計</h2>
            </div>
        </div>
        <div class="staffArea">
            <div class="calendar">
                <h2>日曆</h2>
            </div>
            <div class="schedule">
                <h2>代辦事項</h2>
            </div>
        </div>
    </div>
</template>
<style scoped>
.countDatas {
    margin: 10px;
    z-index: 2;
    height: 200px;
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
    background-color: rgb(241, 241, 241);
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

.business {
    display: flex;
    height: 580px;
    background-color: azure;
}

.business>div {
    padding: 5px;
}

.business>div>div {
    padding: 5px;
}

.mainBusiness {
    height: 100%;
    width: 60%;
    background-color: beige;
}

.productSale {
    height: 70%;
    background-color: aquamarine;
}

.commendCount {
    height: 30%;
    background-color: cadetblue;
}

.staffArea {
    width: 40%;
    height: 100%;
    background-color: blue;
}

.calendar {
    height: 60%;
    background-color: yellowgreen;
}

.schedule {
    height: 40%;
    background-color: violet;
}
</style>