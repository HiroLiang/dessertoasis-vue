<script setup>

</script>
<template>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active headerpic" data-bs-interval="10000">
                <img src="../assets/images/headerShow/toa-heftiba-1o_FCxY-VH8-unsplash.jpg" class="d-block w-100" alt="#">
            </div>
            <div class="carousel-item headerpic" data-bs-interval="2000">
                <img src="../assets/images/headerShow/michal-parzuchowski-pMsvOrnIF3Y-unsplash.jpg" class="d-block w-100"
                    alt="#">
            </div>
            <div class="carousel-item headerpic" data-bs-interval="2000">
                <img src="../assets/images/headerShow/nick-karvounis-jN_M0McVNeI-unsplash.jpg" class="d-block w-100"
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
.headerpic {
    opacity: 0.8;
    background-size: cover;
    background-position: center;
    height: 480px;
    width: 100%;
}
</style>