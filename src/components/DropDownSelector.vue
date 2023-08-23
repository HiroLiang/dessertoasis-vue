<script lang="ts">

</script>
<template>
    <div class="dropDwonMenuWrap">
        <ul class="dropDownMenu">
            <li class="ListColor"><a href="#">全部食譜</a>
                <!-- <ul class="subMenu">
                    <li><a href="">分類1</a></li>
                    <li><a href="">分類2</a></li>
                    <li><a href="">分類3</a></li>
                    <li><a href="">分類4</a></li>
                </ul> -->
            </li>
            <li><a href="#">麵包&#129171</a>
                <ul class="subMenu">
                    <li><a href="">吐司</a></li>
                    <li><a href="">甜麵包</a></li>
                    <li><a href="">鹹麵包</a></li>
                    <li><a href="">免揉麵包</a></li>
                    <li><a href="">更多麵包</a></li>
                </ul>
            </li>
            <li><a href="#">甜點&#129171</a>
                <ul class="subMenu">
                    <li><a href="">蛋糕</a></li>
                    <li><a href="">餅乾</a></li>
                    <li><a href="">塔派類</a></li>
                    <li><a href="">免烤箱</a></li>
                    <li><a href="">更多甜點</a></li>
                </ul>
            </li>
            <li><a href="#">食材&#129171</a>
                <ul class="subMenu">
                    <li><a href="">檸檬</a></li>
                    <li><a href="">肉桂</a></li>
                    <li><a href="">巧克力</a></li>
                    <li><a href="">抹茶</a></li>
                    <li><a href="">更多食材</a></li>
                </ul>
            </li>
            <li><a href="#">難易度&#129171</a>
                <ul class="subMenu">
                    <li><a href="">簡單</a></li>
                    <li><a href="">中等</a></li>
                    <li><a href="">困難</a></li>
                </ul>
            </li>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="輸入搜尋食譜" aria-label="Search">
                <button class="btn btn-light" type="submit"><img src="../assets/images/recipeHP/magnifying-glass.png"
                        alt=""></button>
            </form>
        </ul>

    </div>
</template>
<style>
/*下拉式選單設定*/
.dropDwonMenuWrap {
    background-color: #e9e7e7;
    border-top: 2px solid #bebebe;
    border-bottom: 2px solid #bebebe;
    margin-bottom: 0px;
    padding: 0;
    list-style: none;
    /* 移除項目符號 */
    width: 100%;
}

.dropDwonMenuWrap ul {
    /* 取消ul預設的內縮及樣式 */
    height: 100%;
    list-style: none;
    text-align: center;
    justify-content: center;
    margin-bottom: 0px;
    display: flex;
    font-size: 28px;

}

.me-2 {
    margin-right: 0;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    /* font-size: 1rem; */
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--bs-body-bg);
    background-clip: padding-box;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

[type=search] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
}

.dropDwonMenuWrap ul form {
    height: 100%;
    list-style: none;
    text-align: center;
    justify-content: center;
    margin-top: 5px;
    margin-left: 25px;
    font-size: 24px;
}

.dropDwonMenuWrap ul form button>img {
    width: 26px;
    height: 26px;

}


.dropDwonMenuWrap ul li a {
    color: inherit;
    /* 移除超連結顏色 */
    display: block;
    /* 讓 <a> 填滿 <li> */
    /* font-size: 1.2rem; */
    padding: 10px;
    padding-left: 1.5em;
    padding-right: 1.5em;
    text-decoration: none;

    /* 移除超連結底線 */
}

.dropDwonMenuWrap ul li {
    position: relative;
    white-space: nowrap;
}

/*分類導覽列觸碰變色*/
.dropDwonMenuWrap ul li:hover>a {
    background-color: rgb(173, 172, 172);
    color: white;
    transition: .2s;
}

/*分類下拉選單背景色*/
.subMenu li {
    background-color: #ccc;
    padding-top: 0px;
    /* 调整顶部间距 */
    margin-top: -4px;
    /* 抵消顶部间距，以与父菜单项对齐 */
}

/*分類下拉選單背景觸碰變換顏色*/
.subMenu li:hover>a {
    background-color: rgb(115, 115, 115);
}


.dropDwonMenuWrap ul li>ul {
    position: absolute;
    display: none;
    bottom: -100%;
    width: 208px;
    height: 58px;
    margin-top: 0;
    /* box-shadow: 5px 5px 10px hsla(240, 40%, 15%, .6); */
    z-index: 99;

}

.dropDwonMenuWrap ul li:hover ul {
    display: block;
    left: -32px;
}
</style>
