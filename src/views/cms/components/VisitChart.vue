<script setup>
import { ref, onMounted } from 'vue'
import { useChart } from '../../../stores/Chart';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { NCard, NTabs, NTabPane } from 'naive-ui'

const store = useChart()

const chartOptions = ref({ responsive: true })
const chartData = ref({
    labels: ['網頁', '食譜', '課程', '商品'],
    datasets: [{
        label: '訪問統計',
        data: [store.visitRecord.website, store.visitRecord.recipe, store.visitRecord.course, store.visitRecord.product]
    }]
})
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

onMounted(() => {
    store.initChart()
})

</script>
<template>
    <div>
        <n-card style="border-radius: 20px;">
            <n-tabs type="line" animated>
                <n-tab-pane name="項目" tab="項目">
                    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
                </n-tab-pane>
                <n-tab-pane name="月份" tab="月份">
                    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>