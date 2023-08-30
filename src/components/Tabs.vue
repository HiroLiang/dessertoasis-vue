<template>
    <n-tabs :bar-width="28" type="line" class="custom-tabs">
        <n-tab-pane name="1" :tab="tabsConfig['1']">
            {{ tabsContent['1'] }}
        </n-tab-pane>
        <n-tab-pane name="2" :tab="tabsConfig['2']">
            {{ tabsContent['2'] }}
        </n-tab-pane>

    </n-tabs>
</template>
  
<script setup>
import { ref } from 'vue';

const barColor = ref('var(--bar-color)');

const { tabsContent, tabsConfig } = defineProps(['tabsContent', 'tabsConfig']);
</script>
  
<style scoped>
.custom-tabs .n-tabs-bar {
    background-color: transparent !important;
}

.custom-tabs .n-tabs-bar::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: -2px;
    border-radius: 2px;
    background-color: var(--bar-color);
}
</style>
  