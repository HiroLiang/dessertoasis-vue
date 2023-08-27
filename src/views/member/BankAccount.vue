<template>
    <form class="file-upload">
        <div class="row mb-5 gx-5">

            <div class="mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">銀行帳戶資料</h4>

                        <div class="col-md-6">
                            <label class="form-label" for="bankName">銀行名稱</label>
                            <input type="password" class="form-control" id="bankName" value="">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="branchName">分行名稱</label>
                            <input type="password" class="form-control" id="branchName" value="">
                        </div>

                        <div class="">
                            <label class="form-label" for="accountNumber">銀行帳戶帳號</label>
                            <input type="password" class="form-control" id="accountNumber" value="">
                        </div>




                        <div class="text-center">
                            <button type="button" class="btn btn-primary btn-lg mt-5">Update profile</button>
                            <button type="button" class="btn btn-danger btn-lg mt-5">Delete profile</button>
                        </div>








                    </div>
                </div>
            </div>

        </div>
    </form>
</template>


<script setup>

</script>


<style scoped>
button {
    margin: auto 15px;
}
</style>