<template>
    <div>
        <h2>商品詳情</h2>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <SlickCarousel :itemsList="item"></SlickCarousel>
                </div>
                <div class="col-md-6">
                    <p></p>
                    <h3>Darbo 德寶70%果肉草莓果醬 200g</h3>
                    <p></p>
                    <h5>NT$ {{ price }}</h5>
                    <p>請選擇規格</p>
                    <Speccard :specs="specs" :selectedSpec="selectedSpec" :priceMapping="priceMapping"
                        @update:selectedSpec="updateSelectedSpec" />
                    <p>價格: NT$ {{ priceMapping[selectedSpec] }}</p>
                    <p></p>
                    請選擇數量
                    <n-input-number v-model:value="value" clearable />
                    <p></p>
                    <div class="Cartandlike">
                        <Cartandlike></Cartandlike>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import SlickCarousel from '@/components/SlickCarousel.vue';
import Speccard from '@/components/Speccard.vue';
import Cartandlike from '@/components/Cartandlike.vue';

import Bread from '@/assets/images/product/202211021609190aknhb_small.jpg';
import Cake from '@/assets/images/product/foodiesfeed.com_blackberry-cream-dessert.jpg';

const item = [
    { imageUrl: Bread },
    { imageUrl: Cake },
    { imageUrl: "https://picsum.photos//500/400?random=3" },
    { imageUrl: "https://picsum.photos//500/400?random=4" },
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
</script>

<style scoped>
.Cartandlike {
    padding-top: 100px;
}
</style>