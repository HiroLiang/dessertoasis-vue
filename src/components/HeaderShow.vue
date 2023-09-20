<script setup>

</script>
<template>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active headerpic" data-bs-interval="2000">
                <div class="carousel-caption d-flex justify-content-begin carouselText">
                    <h3>開始你的第一堂烘焙課吧</h3>
                </div>
                <img src="../../public/images/headerShow/sandi-benedicta-2KEo2FL1n9o-unsplash.jpg" class="d-block w-100"
                    alt="#">
            </div>
            <div class="carousel-item headerpic" data-bs-interval="2000">
                <div class="carousel-caption d-flex justify-content-start carouselText">
                    <h3>尋找適合你的食譜</h3>
                </div>
                <img src="../../public/images/headerShow/anshu-a-E5xgkSFan84-unsplash.jpg" class="d-block w-100" alt="#">
            </div>
            <div class="carousel-item headerpic" data-bs-interval="2000">
                <div class="carousel-caption d-flex justify-content-start carouselText">
                    <h3>趕快來瞧瞧我們的商品</h3>
                </div>
                <img src="../../public/images/headerShow/nick-karvounis-jN_M0McVNeI-unsplash.jpg" class="d-block w-100"
                    alt="#">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>
<style scoped>
.carousel-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.263);
}

.carouselText {
    top: 150px
}

.headerpic {
    opacity: 1;
    background-size: cover;
    background-position: center;
    height: 480px;
    width: 100%;
}
</style>