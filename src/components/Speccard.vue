<template>
    <div>

        <n-message-provider>
            <n-tabs :value="selectedSpec" @update:value="handleTabClick" type="card">
                <n-tab-pane v-for="spec in specs" :key="spec" :name="spec">
                    {{ spec }}
                </n-tab-pane>
            </n-tabs>
        </n-message-provider>
    </div>
</template>
  
<script setup>
import { defineProps, getCurrentInstance } from 'vue';

const { specs, selectedSpec } = defineProps(['specs', 'selectedSpec']);
const instance = getCurrentInstance();
const emit = instance.emit;

const handleTabClick = (newSpec) => {
    emit('update:selectedSpec', newSpec);
};
</script>
