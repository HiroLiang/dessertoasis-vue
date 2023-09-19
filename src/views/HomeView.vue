<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import HeaderShow from '@/components/HeaderShow.vue';
import FooterVue from '../components/Footer.vue';
import SatandardCarousel from '../components/Carousel.vue'
import StandardBlockType from '../components/Standard/display/BlockType.vue'

//#region 商品推薦
const prodCarousel = ref({
  link: '/producthome',
  title: '商品推薦',
  itemsList: []
})
const prodCarouselList = ref([
  { imageUrl: "https://picsum.photos//500/400?random=1", text: "拼盤", toUrl: "/" },
  { imageUrl: "https://picsum.photos//500/400?random=2", text: "烤紙", toUrl: "/" },
  { imageUrl: "https://picsum.photos//500/400?random=3", text: "篩網", toUrl: "/" },
  { imageUrl: "https://picsum.photos//500/400?random=4", text: "隔熱套", toUrl: "/" },
  { imageUrl: "https://picsum.photos//500/400?random=5", text: "桿麵棍", toUrl: "/" },
])
const prodCarouselMove = () => {
  let list = prodCarouselList.value.splice(0, 4)
  prodCarousel.value.itemsList = list
  setInterval(() => {
    fillProdCarousel()
  }, 10000);
}
prodCarouselMove()
const fillProdCarousel = () => {
  prodCarouselList.value.unshift(prodCarousel.value.itemsList.shift())
  prodCarousel.value.itemsList.push(prodCarouselList.value.pop())
}
//#endregion 

const hotProds = ref([
  {
    id: 1,
    picture: '/images/display/product/prod.jpg',
    // difficulty: 'Super Hard',
    teacher: '怪醫秦博士',
    // author: '鬼塚治虫',
    name: '鐵臂阿童木',
    description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
    price: 1120
  },
  {
    id: 2,
    picture: '/images/display/product/michal-parzuchowski-pMsvOrnIF3Y-unsplash.jpg',
    difficulty: 'Super Hard',
    // teacher: '怪醫秦博士',
    author: '鬼塚治K不二雄',
    name: '鐵舌阿童木',
    description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
    // price: 3240
  },
  {
    id: 3,
    picture: '/images/display/product/prod.jpg',
    // difficulty: 'Super Hard',
    teacher: '怪醫秦博士',
    // author: '鬼塚治虫',
    name: '鐵指阿童木',
    description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
    price: 3240
  },
  {
    id: 4,
    picture: '/images/display/product/michal-parzuchowski-pMsvOrnIF3Y-unsplash.jpg',
    difficulty: 'Super Hard',
    // teacher: '怪醫秦博士',
    author: '鬼塚治貓',
    name: '鐵腿阿童木',
    description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
    // price: 3240
  },
  {
    id: 5,
    picture: '/images/display/product/prod.jpg',
    // difficulty: 'Super Hard',
    teacher: '怪醫秦博士',
    // author: '鬼塚治虫',
    name: '鐵頭阿童木',
    description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
    price: 320
  },
])
const prodDisplayList = ref([])
const hotProdsMove = () => {
  prodDisplayList.value.push(hotProds.value.shift(0))
  prodDisplayList.value.push(hotProds.value.shift(0))
  prodDisplayList.value.push(hotProds.value.shift(0))
  setInterval(() => {
    fillhotProds()
  }, 3000);
}
hotProdsMove()
const fillhotProds = () => {
  prodDisplayList.value.push(hotProds.value.pop())
  hotProds.value.unshift(prodDisplayList.value.shift())
}

</script>

<template>
  <NavBar />
  <HeaderShow />
  <section>
    <div class="searchBar">

    </div>
  </section>
  <section>
    <div class="about-us">
      <h2>About Us</h2>
    </div>
  </section>
  <section>
    <div class="carousel-container">
      <SatandardCarousel :link="prodCarousel.link" :title="prodCarousel.title" :items-list="prodCarousel.itemsList" />
    </div>
  </section>
  <section>
    <div class="hot-product">
      <h2>熱門集錦</h2>
      <div style="display: flex;justify-content: space-evenly;align-items: center;">
        <transition-group name="hotProd" mode="out-in">
          <div v-for="prod in prodDisplayList" :key="prod.id">
            <StandardBlockType :product="prod" />
          </div>
        </transition-group>
      </div>
    </div>
  </section>
  <FooterVue />
</template>
<style scoped>
.hotProd-move,
.hotProd-leave-active,
.hotProd-enter-active {
  transition: all 0.5s ease-in-out;
}

.hotProd-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.hotProd-enter-to,
.hotProd-leave-from {
  opacity: 1;
}

.hotProd-leave-to {
  opacity: 0;
}

.hotProd-leave-active {
  position: absolute;
  left: 0;
}

.about-us {
  margin: 20px auto;
  background-color: rgb(250, 247, 243);
  border-radius: 20px;
  width: 85%;
  height: 420px;
}

.carousel-container {
  margin: 20px auto;
  height: auto;
}

.hot-product {
  margin: 20px auto;
  background-color: rgb(250, 247, 243);
  border-radius: 20px;
  width: 85%;
  height: 420px;
}
</style>
