<template>
    <div class="container">
        <div class="txtwrap">
            <h2 class="titleTxt">{{ props.title }}</h2>
        </div>
        <div class="container border">
            <div class="container mt-3">
                <Carousel :items-to-show="itemToShow" :wrap-around="wrapAround" :autoplay="autoplay"
                    :pauseAutoplayOnHover="pauseAutoplayOnHover">
                    <Slide v-for="(item, index) in props.itemsList" :key="index">
                        <div class="card">
                            <img class="carousel__item slideImgs card-img-top" :src="item.imageUrl">
                            <div class="card-body">
                                <p class="card-text">{{ item.text }}</p>
                            </div>
                        </div>
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
    title: {
        default:
            "每月熱門"

    },
    itemsList: {
        default: [
            { imageUrl: "https://picsum.photos//500/400?random=1", text: "香草莓果拼盤" },
            { imageUrl: "https://picsum.photos//500/400?random=2", text: "巧克力焦糖布朗尼" },
            { imageUrl: "https://picsum.photos//500/400?random=3", text: "芒果慕斯蛋糕" },
            { imageUrl: "https://picsum.photos//500/400?random=4", text: "藍莓杏仁塔" },
            { imageUrl: "https://picsum.photos//500/400?random=5", text: "玫瑰草莓泡芙" },
            { imageUrl: "https://picsum.photos//500/400?random=1", text: "香蕉核桃蛋糕卷" },
            { imageUrl: "https://picsum.photos//500/400?random=2", text: "抹茶紅豆湯圓" },
            { imageUrl: "https://picsum.photos//500/400?random=3", text: "檸檬蛋糕塔" },
            { imageUrl: "https://picsum.photos//500/400?random=4", text: "經典提拉米蘇" },
            { imageUrl: "https://picsum.photos//500/400?random=5", text: "蘋果肉桂捲" },
            { imageUrl: "https://picsum.photos//500/400?random=1", text: "紅莓芝士蛋糕" },
            { imageUrl: "https://picsum.photos//500/400?random=2", text: "杏仁巧克力酥餅" },
            { imageUrl: "https://picsum.photos//500/400?random=3", text: "椰漿香蕉布丁" },
            { imageUrl: "https://picsum.photos//500/400?random=4", text: "蔓越莓橙子鬆餅" },
            { imageUrl: "https://picsum.photos//500/400?random=5", text: "士多啤梨奶油千層蛋糕" },
        ],
    },
})

</script>
<style>
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
</style>
