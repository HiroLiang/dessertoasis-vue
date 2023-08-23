<script setup>
import NavBar from '@/components/NavBar.vue';
</script>
<template lang="">
    <NavBar></NavBar>
    <div class="container p-4">
    <form action="#">
            <h2 class="mb-4">會員註冊</h2>

            <div class="d-flex flex-row align-items-center mb-4">
                <div class="flex-fill mb-0">
                    <input type="text"  class="form-control" placeholder="請輸入帳號"/>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
                <div class="flex-fill mb-0">
                    <input type="email"  class="form-control" placeholder="請輸入Email"/>
                </div>
            </div>


            <div class="d-flex flex-row align-items-center mb-4">
                <div class="flex-fill mb-0">
                    <input type="text"  class="form-control" placeholder="請輸入密碼"/>
                </div>
            </div>


            <div class="d-flex flex-row align-items-center mb-4">
                <div class="flex-fill mb-0">
                    <input type="text"  class="form-control" placeholder="再次輸入密碼"/>
                </div>
            </div>


            <div class="form-check d-flex justify-content-center mb-3">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3" >同意註冊 <a href="#" class="mb-0">合約</a></label>
                  </div>



                  <div class="row p-2">
                <button type="button" class="btn btn-primary btn-block mb-4">註冊</button>
            </div>



            <div class="text-center sign-link">
                <p>已經是會員 <router-link to="/signIn">登入</router-link> </p>
            </div>
     </form>
    </div>
</template>
<style scoped>
.container {
    padding: 10px;
    margin: 50px auto;
    width: 350px;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 2px 2px 2px gray;
}

a {
    text-decoration: none;
}

h2 {
    text-align: center;
}
</style>