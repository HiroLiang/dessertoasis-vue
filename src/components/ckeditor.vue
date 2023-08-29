<template>
    <div>
        <div ref="editorRef"></div>
    </div>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorRef = ref(null);

onMounted(() => {
    ClassicEditor.create(editorRef.value)
        .then(editor => {
            // 编辑器已经创建
            console.log('Editor was initialized', editor);
        })
        .catch(error => {
            console.error(error);
        });
});
</script>
  