<script setup>

</script>
<template>
    <div class="countDatas">
        <h1>資料統計(訪問數量、文章數、課程數、商品數)</h1>
    </div>
    <div class="business">
        <div class="mainBusiness">
            <div class="productSale">
                <h2>商品銷售圖表</h2>
            </div>
            <div class="commendCount">
                <h2>評論統計</h2>
            </div>
        </div>
        <div class="staffArea">
            <div class="calendar">
                <h2>日曆</h2>
            </div>
            <div class="schedule">
                <h2>代辦事項</h2>
            </div>
        </div>
    </div>
</template>
<style scoped>
.countDatas {
    height: 200px;
    padding: 5px;
    background-color: blueviolet;
}

.business {
    display: flex;
    height: 580px;
    background-color: azure;
}

.business>div {
    padding: 5px;
}

.business>div>div {
    padding: 5px;
}

.mainBusiness {
    height: 100%;
    width: 60%;
    background-color: beige;
}

.productSale {
    height: 70%;
    background-color: aquamarine;
}

.commendCount {
    height: 30%;
    background-color: cadetblue;
}

.staffArea {
    width: 40%;
    height: 100%;
    background-color: blue;
}

.calendar {
    height: 60%;
    background-color: yellowgreen;
}

.schedule {
    height: 40%;
    background-color: violet;
}
</style>