<template>
    <div>

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <SlickCarousel :itemsList="item"></SlickCarousel>
                </div>
                <div class="col-md-6">
                    <p></p>
                    <h3>莓果奶酪</h3>
                    <p></p>
                    <!-- <h5>NT$ {{ price }}</h5> -->
                    <h4>NT$ 50</h4>
                    <!-- <p>請選擇規格</p>
                    <Speccard :specs="specs" :selectedSpec="selectedSpec" :priceMapping="priceMapping"
                        @update:selectedSpec="updateSelectedSpec" />
                    <p>價格: NT$ {{ priceMapping[selectedSpec] }}</p> -->
                    <p></p>
                    請選擇數量
                    <n-input-number v-model:value="value" clearable />
                    <p></p>
                    <div class="Cartandlike">
                        <Cartandlike></Cartandlike>
                    </div>

                </div>
            </div>
            <Tabs :tabsContent="tabsContent" :tabsConfig="tabsConfig" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import SlickCarousel from '@/components/SlickCarousel.vue';
import Speccard from '@/components/Speccard.vue';
import Cartandlike from '@/components/Cartandlike.vue';
import Tabs from '@/components/Tabs.vue';

import Bread from '@/assets/images/product/202211021609190aknhb_small.jpg';
import Cake from '@/assets/images/product/foodiesfeed.com_blackberry-cream-dessert.jpg';

const item = [
    { imageUrl: "/images/product/1/foodiesfeed.com_raspberry-cheesecake-desserts.jpg" },
    { imageUrl: "/images/product/新增資料夾/jp-valery-g-ubP7FnoQM-unsplash.jpg" },
    // { imageUrl: Bread },
    // { imageUrl: Cake },
    //{ imageUrl: "https://picsum.photos//500/400?random=3" },
    // { imageUrl: "https://picsum.photos//500/400?random=4" },
];

const specs = ["大", "中", "小"];
const selectedSpec = ref("大");
const value = ref(0);


const priceMapping = {
    大: 120,
    中: 140,
    小: 160
};

const price = ref(priceMapping[selectedSpec.value]);

//規格
const updateSelectedSpec = (newSpec) => {
    selectedSpec.value = newSpec;
    price.value = priceMapping[newSpec];
};

const tabsContent = {
    '1': '商品',
    '2': '123',

};

const tabsConfig = {
    '1': '商品描述',
    '2': '購物須知及運送方式',

};
</script>

<style scoped>
.Cartandlike {
    padding-top: 100px;
}
</style>