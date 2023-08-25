<script setup>

</script>

<template>
    <form class="file-upload">
        <div class="row mb-5 gx-5">

            <div class="mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">更改密碼</h4>

                        <div class="col-md-6">
                            <label class="form-label">舊密碼</label>
                            <input type="password" class="form-control" value="">
                        </div>


                        <div class="col-md-6">
                            <label class="form-label">新密碼</label>
                            <input type="password" class="form-control" value="">
                        </div>


                        <div class="col-md-6">
                            <label class="form-label">再次輸入新密碼</label>
                            <input type="password" class="form-control" value="">
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

<style scoped>
button {
    margin: auto 15px;
}
</style>