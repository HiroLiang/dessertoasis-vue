<script setup>
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { NCard, NTabs, NTabPane } from 'naive-ui'

const chartOptions = ref({ responsive: true })
const chartData = ref({ labels: ['網頁', '食譜', '課程', '商品'], datasets: [{ label: '訪問統計', data: [40, 20, 12, 12] }] })

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

</script>
<template>
    <div>
        <n-card style="border-radius: 20px;">
            <n-tabs type="line" :animated="true">
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