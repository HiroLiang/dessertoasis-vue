<script setup>

</script>




<template>
    <form class="file-upload">
        <div class="row mb-5 gx-5">

            <!-- 廠商基本資料 -->
            <div class="col-xxl-8 mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">廠商基本資料</h4>

                        <div class="col-md-6">
                            <label class="form-label" for="companyInput">公司名稱
                            </label>
                            <input type="text" class="form-control" id="companyInput" value="">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="codeInput">統一編號
                            </label>
                            <input type="text" class="form-control" id="codeInput" value="">
                        </div>


                        <div>
                            <label for="companyTextarea" class="form-label">公司介紹</label>
                            <textarea class="form-control" id="companyTextarea" rows="3"></textarea>
                        </div>

                    </div>
                </div>
            </div>


            <!-- 上傳圖片 -->
            <div class="col-xxl-4">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">上傳公司圖片</h4>

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
            <button type="button" class="btn btn-primary btn-lg">Update profile</button>
            <button type="button" class="btn btn-danger btn-lg">Delete profile</button>
        </div>
    </form>
</template>




<style scoped>
button {
    margin: auto 15px;
}
</style>