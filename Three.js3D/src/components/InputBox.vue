<template>
  <div class="input">
    <!-- 输入框 -->
    <el-input
      v-model="payload.prompt"
      @keyup.enter="submitPrompt"
      size="default"
      clearable="true"
      style="width: 600px"
      placeholder="请输入 提示词 ····" />
    <!-- 风格选择 -->
    <el-select v-model="payload.art_style" size="default" placeholder="风格" style="width: 110px">
      <el-option label="写实风格" value="realistic" />
      <el-option label="卡通风格" value="cartoon" />
      <el-option label="低多边形风格" value="low-poly" />
      <el-option label="雕塑风格" value="sculpture" />
    </el-select>
    <!-- 按钮 -->
    <el-button
      @click="submitPrompt"
      :disabled="disabled"
      type="success"
      size="default"
      icon="Search">
      AI 生成
    </el-button>
  </div>
</template>

<script setup>
import { compute } from 'three/examples/jsm/nodes/gpgpu/ComputeNode';
import { ref, reactive, computed } from 'vue';
import { createModel } from '@/api/index.js';
// import axios from 'axios';
// import ElMessage
import { ElMessage } from 'element-plus';
// key
// const key = ref('');
// 请求参数
const payload = reactive({
  mode: 'preview',
  prompt: '',
  art_style: 'realistic',
  negative_prompt: '',
});

// 当输入框prompt有值时，按钮才可用
const disabled = computed(() => {
  return payload.prompt.trim() === '';
});

// 输入-请求
function submitPrompt() {
  console.log('点击了按钮');
  console.log(payload);

  // const link = document.createElement('a'); // 创建链接标签，即a标签，并将dom命名为link
  // link.href =
  //   'https://assets.meshy.ai/email%7C661274648342c8c30ca89e73/tasks/018fa670-f4ea-7014-bae2-9316f38708a5/output/model.glb?Expires=4870108800&Signature=D9cfnBjU4jInXqy41lrqWPXwnaBX6SFCwBlM2X1KRNN2c7gznOQV5JWwSf8diWB~wYe-JI2OfTY7PdNcSw52hDe4Kgx4N1AqZ3Dz0uYJwO6bqQgYOEFazAItFq0i-VohTCq0pT81GliqaCHOQ9n-VAJOFEIwdklkSBjXPu8DTSj1oRJSNvXKOZ25-cqRsTDEZuYJHg2rzstdQFlHgVffUSJ56DesiFpyftVTOGuFTRplwx3auWzQZFfgGwjxaq1gG~7x~YMv3pU2iAGeim-4EyDPXADs1x9Lksce5juz03605pb3MJXGP3Q42yy3LVnAsKLIn7WV33~3TFbdeBrzzQ__&Key-Pair-Id=KL5I0C8H7HX83';
  // link.setAttribute('download', ''); // 为link设置下载属性
  // document.body.appendChild(link); // 把创建并配置好的link dom添加到页面文档中
  // link.click(); // 模拟dom的点击事件
  // document.body.removeChild(link); // 从文档中移出link节点

  createModel(payload)
    .then((res) => {
      console.log('111111111111');

      console.log(res);
      // const modelInfo = res.data.modelInfo.model_urls;
      const modelUrls = res.data.modelInfo.model_urls;
      const glbUrl = modelUrls.glb;
      console.log(glbUrl);

      const link = document.createElement('a'); // 创建链接标签，即a标签，并将dom命名为link
      link.href = glbUrl;
      link.setAttribute('download', ''); // 为link设置下载属性
      document.body.appendChild(link); // 把创建并配置好的link dom添加到页面文档中
      link.click(); // 模拟dom的点击事件
      document.body.removeChild(link); // 从文档中移出link节点
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
      // 出现弹窗
      ElMessage.error('出现错误，刷新后重新输入');
    });
}
</script>

<style scoped lang="scss">
.input {
  background: transparent;
}
</style>
