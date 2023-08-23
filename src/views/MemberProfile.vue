<script setup>

import NavBar from '@/components/NavBar.vue';
</script>




<template >
    <NavBar></NavBar>

    <div class="container">
        <div class="row">
            <div class="col-12">

                <div class="my-5">
                    <h3>我的會員資料</h3>
                    <hr>
                </div>

                <form class="file-upload">
                    <div class="row mb-5 gx-5">


                        <div class="col-xxl-8 mb-5 mb-xxl-0">
                            <div class="bg-secondary-soft px-4 py-5 rounded">
                                <div class="row g-3">
                                    <h4 class="mb-4 mt-0">基本資料</h4>

                                    <div class="col-md-6">
                                        <label class="form-label">姓名</label>
                                        <input type="text" class="form-control" value="">
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label">生日
                                        </label>
                                        <input type="text" class="form-control" value="">
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label">Email
                                        </label>
                                        <input type="text" class="form-control" value="">
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label">住址
                                        </label>
                                        <input type="text" class="form-control" value="">
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div class="col-xxl-4">
                            <div class="bg-secondary-soft px-4 py-5 rounded">
                                <div class="row g-3">
                                    <h4 class="mb-4 mt-0">上傳頭像圖片</h4>
                                </div>
                            </div>
                        </div>

                        <div class="text-center">

                            <div class="square position-relative display-2 mb-3">
                                test
                            </div>
                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
</template>





<style scoped></style>