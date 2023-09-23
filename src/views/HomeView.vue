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
  <hr>
  <section class="section my-md-9">
    <div class="bg-light">
      <div class="container mt-3">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-8 col-xl-6">
            <img src="../../public/images/display/homeview/maranda-vandergriff-fZBwUGlKbO8-unsplash.jpg
" alt="" style="width: 486px;height: 300px;">
          </div>
          <div class="col-md-8  col-xl-6">
            <h5>美味的糕點，食材到食譜一應俱全</h5>
            <br>
            <p>歡迎來到 Dessert Oasis，我們將引領您進入烘焙的奇妙世界 <br>
              無論您在尋找專業的課程、熱愛烘焙的廚藝愛好者，或者只是享受美食<br>
              我們都為您提供一應俱全的選項。</p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <section>
      <div class="hot-product container-fluid py-3 px-4">
        <h4>熱門集錦</h4>
        <hr class="mt-1">
        <div style="display: flex;justify-content: space-evenly;align-items: center;">
          <transition-group name="hotProd">
            <div v-for="prod in prodDisplayList" :key="prod.id">
              <StandardBlockType :product="prod" />
            </div>
          </transition-group>
        </div>
      </div>
    </section>
    <hr>
    <div class="bg-light">
      <div class="container mt-3">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-8  col-xl-6">
            <h5>不需動手做，精心挑選、宅配到家</h5>
            <br>
            <p>不管您是甜點愛好者還是烘焙熱愛者<br>
              我們提供高品質的食材和美味的甜點<br>
              一起探索美味的世界，讓烘焙變得更加便利！</p>
          </div>
          <div class="col-md-8  col-xl-6">
            <img src="../../public/images/display/homeview/kira-auf-der-heide-IPx7J1n_xUc-unsplash.jpg" alt=""
              style="width: 486px;height: 300px;">
          </div>
        </div>
      </div>
    </div>
    <hr>
    <section>
      <div class="hot-product container-fluid py-3 px-4">
        <h4>精選商品</h4>
        <hr class="mt-1">
        <div style="display: flex;justify-content: space-evenly;align-items: center;">
          <transition-group name="hotProd">
            <div v-for="prod in prodDisplayList" :key="prod.id">
              <StandardBlockType :product="prod" />
            </div>
          </transition-group>
        </div>
      </div>
    </section>
    <hr>
    <div class="bg-light">
      <div class="container mt-3">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-8  col-xl-6">
            <img src="../../public/images/display/homeview/jamie-_olWQEwP-2w-unsplash.jpg" alt=""
              style="width: 486px;height: 300px;">
          </div>
          <div class="col-md-8  col-xl-6">
            <h5>從入門到進階的私房烘焙課</h5>
            <br>
            <p>加入我們的甜點課程！我們提供了多樣化的甜點課程<br>
              學習從基礎到高級的烘焙技巧，掌握製作美味點心的秘訣。<br>
              我們經驗豐富的烘焙師傅將親自指導您。
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <section>
      <div class="hot-product container-fluid py-3 px-4">
        <h4>精選課程</h4>
        <hr class="mt-1">
        <div style="display: flex;justify-content: space-evenly;align-items: center;">
          <transition-group name="hotProd">
            <div v-for="prod in prodDisplayList" :key="prod.id">
              <StandardBlockType :product="prod" />
            </div>
          </transition-group>
        </div>
      </div>
    </section>
  </section>
  <section>
    <hr>
    <div class="bg-light">
      <div class="container mt-3">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-8  col-xl-6">
            <h5>分享無數美味的甜點食譜</h5>
            <br>
            <p>我們歡迎各種美食愛好者<br>
              無論您是新手還是希望與我們一同分享烘焙秘訣的廚藝大師。<br>
              這裡都會是您發揮創造力的好地方。</p>
          </div>
          <div class="col-md-8  col-xl-6">
            <img src="../../public/images/display/homeview/nordwood-themes-yngPm-Jwc4I-unsplash.jpg" alt=""
              style="width: 486px;height: 300px;">
          </div>
        </div>
      </div>
    </div>
    <hr>
    <section>
      <div class="hot-product container-fluid py-3 px-4">
        <h4>精選食譜</h4>
        <hr class="mt-1">
        <div style="display: flex;justify-content: space-evenly;align-items: center;">
          <transition-group name="hotProd">
            <div v-for="prod in prodDisplayList" :key="prod.id">
              <StandardBlockType :product="prod" />
            </div>
          </transition-group>
        </div>
      </div>
    </section>

    <!-- <div class="carousel-container">
      <SatandardCarousel :link="prodCarousel.link" :title="prodCarousel.title" :items-list="prodCarousel.itemsList" />
    </div> -->
  </section>


  <FooterVue />
</template>
<style scoped>
.hotProd-move,
.hotProd-leave-active,
.hotProd-enter-active {
  transition: all 0.5s ease-in-out;
}

.picContainer {
  width: 30px;
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

/* .about-us {
  margin: 20px auto;
  background-color: rgb(250, 247, 243);
  border-radius: 20px;
  width: 85%;
  height: 420px;
} */

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
