<script setup>
import { ref } from 'vue';
import { NInput, NButton, NInputGroup } from 'naive-ui'

const emit = defineEmits(['get-input-value'])
const getSInputValue = (value) => {
    emit('get-input-value', value)
}

const searchValue = ref('')

const props = defineProps({
    searchSize: {
        type: Number,
        default: 200
    }
})

</script>
<template>
    <n-input-group style="width: auto;">
        <n-input v-model:value="searchValue" :style="{ width: searchSize + 'px' }" />
        <n-button type="tertiary" ghost @click="getSInputValue(searchValue)">
            搜索
        </n-button>
    </n-input-group>
</template>