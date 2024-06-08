<script setup>
import { ref, onMounted } from 'vue';
// 导入store
import { useModel } from '@/store/model';
const model = useModel();
// test
console.log('Show 内容:', model.modelInfo);
// 模型地址

const glbURL = model.modelInfo?.model_urls.glb;
</script>

<template>
  <div ref="container" class="w-60 h-60"></div>
</template>

<style scoped></style>
