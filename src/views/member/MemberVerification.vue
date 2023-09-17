<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = router.query.email;
const otp = router.query.otp;
const verificationResult = ref('');

onMounted(async () => {
    try {
        const response = await fetchVerificationResult(email, otp);

        if (response === '驗證成功') {
            verificationResult.value = '驗證成功';
        } else {
            verificationResult.value = '驗證失敗，請重新嘗試';
        }
    } catch (error) {
        console.error('驗證失敗，請重新嘗試', error);
        verificationResult.value = '驗證失敗，請重新嘗試';
    }
});

async function fetchVerificationResult(email, otp) {
    try {
        const response = await axios.put(`http://localhost:8080/verify-account?email=${email}&otp=${otp}`);
        return response.data;
    } catch (error) {
        console.error('请求失败', error);
        throw error;
    }
}
</script>

<template>
    <div>
        <p>{{ verificationResult }}</p>
    </div>
</template>
