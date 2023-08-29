<template>
    <div class="cascader">
        <n-space>
            <n-cascader v-model:value="modelValue" :options="customOptions" :max-tag-count="maxTagCount"
                :expand-trigger="expandTrigger" :filterable="isFilterable"
                :clear-filter-after-select="isClearFilterAfterSelect" @update:value="handleUpdateValue" />
        </n-space>

    </div>
</template>
  
<script setup>
import { ref, defineProps } from "vue";
import { NCascader } from "naive-ui";

const props = defineProps({
    options: Array,
    hoverTrigger: Boolean, // 是否使用 hover 
    value: [null, Array],
    filterable: Boolean, // 是否可搜尋
    clearFilterAfterSelect: Boolean // 是否在選中後清除搜尋內容
});

const modelValue = ref(props.value); // 使用 v-model

const customOptions = props.options;
const maxTagCount = props.hoverTrigger ? 'responsive' : undefined;
const expandTrigger = props.hoverTrigger ? 'hover' : 'click';
const isFilterable = props.filterable;
const isClearFilterAfterSelect = props.clearFilterAfterSelect;

const handleUpdateValue = (value, options) => {
    modelValue.value = value; // 更新 v-model
    console.log(value, options);
};
</script>

<style scoped></style>