<template>
    <div class="container">
        <div class="txtwrap">
            <router-link :to="props.link" class="custom-router-link">
                <h2 class="titleTxt ">
                    {{ props.title }}
                </h2>
            </router-link>
        </div>
        <div class="container border">
            <div class="container mt-3">
                <Carousel :items-to-show="itemToShow" :wrap-around="wrapAround" :autoplay="autoplay"
                    :pauseAutoplayOnHover="pauseAutoplayOnHover">
                    <Slide v-for="(item, index) in props.itemsList" :key="index">
                        <router-link :to="item.toUrl" class="custom-router-link">
                            <div class="card">
                                <img class="carousel__item slideImgs card-img-top" :src="item.imageUrl">
                                <div class="card-body">
                                    <p class="card-text">{{ item.text }}</p>
                                </div>
                            </div>
                        </router-link>
                    </Slide>

                    <template #addons>
                        <Navigation />
                        <Pagination />
                    </template>
                </Carousel>
            </div>

        </div>
    </div>
</template>
  

<script setup>
import { ref, reactive } from 'vue'
import { Navigation, Slide, Pagination, Carousel } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const itemToShow = 4 //輪播顯示數量
const wrapAround = true //循環模式
const autoplay = 5000 //自動循環時間(單位:毫秒)
const pauseAutoplayOnHover = true //游標懸浮暫停自動循環


//由父類傳值用(未填入則以default值)
//title需要型別字串  父類使用方法(<Carousel :title="變數" :itemsList = 變數 />)
//itemList需要型別物件陣列   
const props = defineProps({
    //link放標題需要連結的url
    link: {
        default:
            "/"
    },
    //title放標題需要文字
    title: {
        default:
            "每月熱門"
    },

    //itemsList放輪播圖片   imageUrl: 圖檔路徑 text: 圖檔標題  toUrl:圖檔連結頁面
    itemsList: {
        default: [
            { imageUrl: "https://picsum.photos//500/400?random=1", text: "香草莓果拼盤", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=2", text: "巧克力焦糖布朗尼", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=3", text: "芒果慕斯蛋糕", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=4", text: "藍莓杏仁塔", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=5", text: "玫瑰草莓泡芙", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=1", text: "香蕉核桃蛋糕卷", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=2", text: "抹茶紅豆湯圓", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=3", text: "檸檬蛋糕塔", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=4", text: "經典提拉米蘇", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=5", text: "蘋果肉桂捲", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=1", text: "紅莓芝士蛋糕", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=2", text: "杏仁巧克力酥餅", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=3", text: "椰漿香蕉布丁", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=4", text: "蔓越莓橙子鬆餅", toUrl: "/" },
            { imageUrl: "https://picsum.photos//500/400?random=5", text: "士多啤梨奶油千層蛋糕", toUrl: "/" },
        ],
    },
})

</script>
<style >
.carousel__next {
    right: -50px;
}

.carousel__prev {
    left: -50px;
}

.slideImgs {
    max-width: 300px;
    max-height: 200px;
}

.carousel__pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    line-height: 0;
    margin: 10px 0px 10px 0px;
}

/* 輪播外框調整 */
.txtwrap {
    max-width: 300px;
    display: block;
    align-items: center;
    text-align: center;
}

.border {
    border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
    padding: 10px 30px 0px 30px;
    border-radius: 0px 10px 10px 10px;
}

.titleTxt {
    display: block;
    border: 1px solid rgb(218, 215, 215);
    border-radius: 10px 10px 0px 0px;
    border-bottom: none;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 0px;
}

.custom-router-link {
    text-decoration: none;
    /* 去除底線 */
    color: inherit;
    /* 使用父元素的文字顏色 */
    /* 可根據需要添加其他樣式 */
}

.card-text {
    white-space: nowrap;
    /* 不換行 */
    overflow: hidden;
    /* 隱藏超出部分 */
    text-overflow: ellipsis;
    /* 顯示省略符號 */
    max-width: 200px;
    /* 設置輪播文字最大寬度 */
}
</style>
