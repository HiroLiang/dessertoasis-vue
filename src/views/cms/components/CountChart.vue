<script setup>
import { ref } from 'vue'
import { useChart } from '../../../stores/Chart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { NCard, NTabs, NTabPane } from 'naive-ui'

const store = useChart()

ChartJS.register(ArcElement, Tooltip, Legend)

const data = ref({
    labels: ['recipe', 'product', 'course'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [store.targetCount.recipe, store.targetCount.product, store.targetCount.course]
        }
    ]
})

const options = ref({
    responsive: true,
    maintainAspectRatio: false
})

</script>
<template>
    <n-card style="border-radius: 20px;">
        <n-tabs type="line" animated>
            <n-tab-pane name="項目" tab="項目">
                <Doughnut :data="data" :options="options" />
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>