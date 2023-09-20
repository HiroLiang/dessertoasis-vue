<template>
    <div>

        <div class="container">
            <div class="row">
                <div class="col-md-6">

                    <SlickCarousel :itemsList="item"></SlickCarousel>
                </div>
                <div class="col-md-6">
                    <p></p>
                    <h3>{{ formData.prodName }}</h3>
                    <p></p>
                    <!-- <h5>NT$ {{ price }}</h5> -->
                    <h4>NT${{ formData.prodPrice }}</h4>
                    <!-- <p>請選擇規格</p>
                    <Speccard :specs="specs" :selectedSpec="selectedSpec" :priceMapping="priceMapping"
                        @update:selectedSpec="updateSelectedSpec" />
                    <p>價格: NT$ {{ priceMapping[selectedSpec] }}</p> -->
                    <p></p>
                    請選擇數量
                    <n-input-number v-model:value="value" clearable />
                    <p></p>
                    <div class="like">
                        <Cartandlike></Cartandlike>
                    </div>
                    <div class="Cart">
                        <AddToCartButton></AddToCartButton>
                    </div>
                </div>
            </div>
            <Tabs :tabsContent="tabsContent" :tabsConfig="tabsConfig" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, watch, onMounted } from 'vue';
import SlickCarousel from '@/components/SlickCarousel.vue';
import Speccard from '@/components/Speccard.vue';
import Cartandlike from '@/components/Cartandlike.vue';
import Tabs from '@/components/Tabs.vue';
import { useRoute } from 'vue-router';
import { EditProduct, UploadProdImage, reqGetCategory, getProdById, getAllProductImage } from '@/api/index.js';
import AddToCartButton from '@/components/AddToCartButton.vue';

import Bread from '@/assets/images/product/202211021609190aknhb_small.jpg';
import Cake from '@/assets/images/product/foodiesfeed.com_blackberry-cream-dessert.jpg';
const route = useRoute();
const formData = ref({
    prodName: "",
    categoryId: 1,
    prodPrice: 0,
    prodStock: 0,
    prodRemark: "",
    updateTime: Date.now(),
    prodDescription: '',
});
// const item = [
// { imageUrl: "/images/product/1/foodiesfeed.com_raspberry-cheesecake-desserts.jpg" },
// { imageUrl: "/images/product/新增資料夾/jp-valery-g-ubP7FnoQM-unsplash.jpg" },
// { imageUrl: Bread },
// { imageUrl: Cake },
//{ imageUrl: "https://picsum.photos//500/400?random=3" },
// { imageUrl: "https://picsum.photos//500/400?random=4" },
// ];
const item = ref([]);
const specs = ["大", "中", "小"];
const selectedSpec = ref("大");
const value = ref(0);


// const priceMapping = {
//     大: 120,
//     中: 140,
//     小: 160
// };

// const price = ref(priceMapping[selectedSpec.value]);

// //規格
// const updateSelectedSpec = (newSpec) => {
//     selectedSpec.value = newSpec;
//     price.value = priceMapping[newSpec];
// };

const tabsContent = {
    '1': "",
    '2': `
    <h2><strong>如何購買</strong></h2>
    <p></p>
        <h4>選擇商品</h4>
        <p>在購物前，請仔細選擇您感興趣的商品。您可以瀏覽我們的網站並將所需商品加入購物車中。</p>
        
        <h4>查看購物車</h4>
        <p>在結帳之前，請檢查您的購物車，確保您已選擇了正確的商品和數量。</p>
        
        <h4>結帳</h4>
        <p>點擊“結帳”按鈕，您將被引導到付款頁面。請提供正確的收貨地址和聯絡方式。</p>
        
        <h4>付款</h4>
        <p>我們接受信用卡付款方式。請按照付款頁面的指示進行支付。</p>
        
        <h4>訂單確認</h4>
        <p>完成付款後，您可在訂單頁面查看訂單資訊。</p>
        <h2><strong>運送方式</strong></h2>
        <p></p>
        <h4>運送時間</h4>
        <p>我們會盡快為您安排運送，通常在訂單確認後的 1 到 3 個工作日內發貨。實際運送時間可能會因您的位置和選擇的運送方式而有所不同。</p>
        
        <h4>運費</h4>
        <p>運費根據您的訂單內容、收貨地址和選擇的運送方式而有所不同。在結帳過程中，您將看到確切的運費金額。</p>
        
        <h4>追蹤訂單</h4>
        <p>一旦訂單發貨，您可在訂單頁面查看訂單運送資訊，以便隨時跟蹤您的訂單運送情況。</p>
        
        <h4>收貨</h4>
        <p>請確保有人在預計送達日期時在家，以接收訂單。如有任何疑問或特殊要求，請在訂單備註中提前通知我們。</p>
        <h2><strong>退貨方式</strong></h2>
        <p></p>
        <h4>退貨政策</h4>
        <p>我們接受未經使用和未損壞的商品退貨。如果您對所收到的商品不滿意，請在收到商品後的 14 天內聯絡我們。</p>
        
        <h4>退貨申請</h4>
        <p>請通過我們的客服電子郵件提出退貨請求。請提供訂單號碼和詳細的退貨原因。一旦我們收到您的退貨請求，我們將審核您的請求。我們將盡快聯繫您並通知您是否批准退貨。</p>
        
        <h4>退款或換貨</h4>
        <p>一旦退貨批准，您可以選擇退款或換貨。我們將在收到退回商品後進行退款或換貨處理。</p>
    
    `,

};

const tabsConfig = {
    '1': '商品描述',
    '2': '購物須知及運送方式',

};


const productId = ref(null); // 用于存储产品ID
const productData = ref(null);
const fetchProductData = async () => {
    try {
        if (productId.value !== null) {
            const response = await getProdById(productId.value);
            productData.value = response.data;
            console.log("productData:", productData)
            // 使用 await 等待 Proxy 對象的解析
            await productData.value;

            formData.value.prodName = productData.value.product.prodName;
            formData.value.prodPrice = productData.value.product.prodPrice;
            formData.value.prodStock = productData.value.product.prodStock;
            formData.value.prodRemark = productData.value.product.prodRemark;

            //打印日期時間值以檢查
            console.log("productData.value.product.updateTime", productData.value.product.updateTime);
            formData.value.updateTime = new Date(productData.value.product.updateTime).toISOString();
            console.log("formData.value.updateTime", formData.value.updateTime);

            formData.value.prodDescription = productData.value.product.prodDescription;
            console.log("formData.value.prodDescription", formData.value.prodDescription);
            tabsContent['1'] = formData.value.prodDescription;
            console.log("productData", productData.value);
            formData.value.categoryId = productData.value.category.id;
            console.log("productData.value.category.id", productData.value.category.id);
        }
    } catch (error) {
        // 處理錯誤
        console.error('Error fetching product data:', error);
    }
};

onMounted(() => {
    productId.value = route.params.id;
    fetchProductData();
});

onMounted(async () => {
    const response = await getAllProductImage(productId.value);
    const imagePaths = response.data[1];

    item.value = imagePaths.map(path => ({
        imageUrl: path,

    }));
    console.log("item", item);
});


</script>

<style scoped>
.like {
    padding-top: 70px;
}
</style>