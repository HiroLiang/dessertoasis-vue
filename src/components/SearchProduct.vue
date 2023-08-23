<template>
    <div class=search-container>
        <div class="search-select">
            <select>
                <option value="">所有商品</option>
                <option value="1">職人手做甜點&麵包</option>
                <option value="2">烘焙器具</option>
                <option value="3">烘焙食材</option>
                <option value="4">包裝材料</option>
            </select>
        </div>
        <div class="search-input">
            <input type="text" placeholder="搜尋">
            <div class="search-btn">
                <button class="search-button" type="submit"><img
                        src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTUuOTcgMTcuMDMxYy0xLjQ3OSAxLjIzOC0zLjM4NCAxLjk4NS01LjQ2MSAxLjk4NS00LjY5NyAwLTguNTA5LTMuODEyLTguNTA5LTguNTA4czMuODEyLTguNTA4IDguNTA5LTguNTA4YzQuNjk1IDAgOC41MDggMy44MTIgOC41MDggOC41MDggMCAyLjA3OC0uNzQ3IDMuOTg0LTEuOTg1IDUuNDYxbDQuNzQ5IDQuNzVjLjE0Ni4xNDYuMjE5LjMzOC4yMTkuNTMxIDAgLjU4Ny0uNTM3Ljc1LS43NS43NS0uMTkyIDAtLjM4NC0uMDczLS41MzEtLjIyem0tNS40NjEtMTMuNTNjLTMuODY4IDAtNy4wMDcgMy4xNC03LjAwNyA3LjAwN3MzLjEzOSA3LjAwNyA3LjAwNyA3LjAwN2MzLjg2NiAwIDcuMDA3LTMuMTQgNy4wMDctNy4wMDdzLTMuMTQxLTcuMDA3LTcuMDA3LTcuMDA3eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"></button>
                <!--<button><i class="lni lni-search-alt"></i></button>-->
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const name = 'SearchProduct';
</script>

<style scoped>
.search-container {
    display: flex;
    align-items: center;
    margin-left: 15px;
    position: relative;
    z-index: 10;


}

.search-input {
    display: flex;
    align-items: center;
    border: 1px solid #000000;
    border-radius: 4px;
    padding: 4px;

}

.search-select select {

    width: 150px;
    height: 40px;
    font-size: 12px;
    border-radius: 4px;
    margin: 0;
    padding: 5px 5px;

}


.search-input input {
    width: 150px;
    height: 30px;
    font-size: 12px;
    margin: 0;
    border: none;
    outline: none;
}

.search-button {
    margin: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.search-button img {
    width: 20px;
    height: 30px;
}
</style>