<script setup>

</script>




<template>
    <form class="file-upload">
        <div class="row mb-5 gx-5">

            <div class=" col-xxl-8 mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">詳細資料</h4>

                        <div class="col-md-6">
                            <label class="form-label">廠商名稱</label>
                            <input type="text" class="form-control" value="">
                        </div>


                        <div class="col-md-6">
                            <label class="form-label">統一編號</label>
                            <input type="text" class="form-control" value="">
                        </div>


                        <div class="col-md-6">
                            <label class="form-label">再次輸入新密碼</label>
                            <input type="text" class="form-control" value="">
                        </div>


                        <div class="col-xxl-4">
                            <div class="bg-secondary-soft px-4 py-5 rounded">
                                <div class="row g-3">
                                    <h4 class="mb-4 mt-0">上傳頭像圖片</h4>

                                    <div class="text-center">

                                        <div class="square position-relative display-2 mb-3">
                                            <font-awesome-icon :icon="['far', 'user']" />
                                        </div>

                                        <input type="file" id="customFile" name="file" hidden>
                                        <label class="btn btn-outline-success" for="customFile">上傳</label>

                                        <button type="button" class="btn btn-outline-danger">移除</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="text-center">
                        <button type="button" class="btn btn-primary btn-lg mt-5">Update profile</button>
                        <button type="button" class="btn btn-danger btn-lg mt-5">Delete profile</button>
                    </div>








                </div>
            </div>
        </div>


    </form>
</template>




<style scoped>
button {
    margin: auto 15px;
}
</style>