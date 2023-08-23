<template>
  <div class="col-12 col-md-3 mb-4">
    <div class="card">
      <div class="card-img">
        <img
          src="../assets/images/course/cupcake.jpg"
          class="card-img-top"
          alt=""
        />
      </div>
      <div class="card-body">
        <h5 class="card-title">杯子蛋糕</h5>
        <p class="card-text">滿足你的甜蜜渴望，一個杯子，一份幸福。</p>
        <a href="#" class="btn btn-primary">了解更多</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts"></script>
<style scoped>
.card-img {
  overflow: hidden;
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
.card img:hover {
  transform: scale(1.1);
  transition: all ease 1s;
  opacity: 0.8;
  /* border-radius: 5px 5px 0 0; */
}
</style>
