<script setup>
import { ref } from 'vue';
import { NButton, NDropdown } from 'naive-ui'

const selectedOption = ref('搜索範圍')

const props = defineProps({
    searchOptions: {}
})
console.log(props.searchOptions);
const options = props.searchOptions

const handleSelect = (option) => {
    options.forEach(element => {
        if (element.key === option) {
            selectedOption.value = element.label
        }
    });
}
</script>

<template>
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <n-button class="dropdown-toggle">{{ selectedOption }}</n-button>
    </n-dropdown>
</template>