<script setup>
import display from '../../components/Standard/Display.vue'
import { ref, reactive } from 'vue'

const products = reactive([

])

const searchOptions = reactive([
    { key: 'name', label: '食譜名稱', type: 'String' },
    { key: 'difficulty', label: '難易度', type: 'String' },
    { key: 'author', label: '作者名稱', type: 'String' },
])

const categoryId = reactive(3)
const pages = reactive([])





</script>

<template>
    <div>
        <display :searchOptions="searchOptions" :row="true" :block="true" :categoryId="categoryId" :pages="pages"></display>
    </div>
</template>

