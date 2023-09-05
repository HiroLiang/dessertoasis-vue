<script setup>
import Search from './Search.vue'
import DisplayRow from './display/RowType.vue'
</script>
<template>
    <div class="displayContainer">
        <Search />
        <DisplayRow />
        <DisplayRow />
        <DisplayRow />
        <DisplayRow />
    </div>
</template>
<style scoped>
.displayContainer {
    margin: 0 auto;
    padding: 10px;
    width: 90%;
    border: 3px double rgb(219, 186, 186);
}
</style>