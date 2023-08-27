<template>
    <form class="file-upload">
        <div class="row mb-5 gx-5">

            <div class="mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">信用卡資料</h4>

                        <div class="col-md-6">
                            <label class="form-label" for="cardNumber">信用卡卡號</label>
                            <input type="password" class="form-control" id="cardNumber" value="">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="securityCode">安全碼</label>
                            <input type="password" class="form-control" id="securityCode" value="">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="expirationDate">到期日期</label>
                            <input type="password" class="form-control" id="expirationDate" value="">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="cardholderName">持卡者姓名</label>
                            <input type="password" class="form-control" id="cardholderName" value="">
                        </div>

                        <div class="">
                            <label class="form-label" for="billAddress">帳單地址</label>
                            <input type="password" class="form-control" id="billAddress" value="">
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