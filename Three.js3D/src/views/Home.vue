<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// import type { Payload } from '@/api/type';
import { ElMessage } from 'element-plus';

// 导入store
import { useModel } from '@/store/model';
const model = useModel();

// key状态
const tag = ref(false); // key是否输入
onMounted(async () => {
  // 判断key是否输入
  if (localStorage.getItem('APIKey')) {
    tag.value = true;
  }
});
const notice = computed(() => {
  if (tag.value) {
    return 'API密钥 已输入';
  } else {
    return 'API密钥 未输入';
  }
});

// 点击-API密钥
const apiButton = () => {
  // 输入：如果未输入，弹出弹窗
  if (!tag.value) {
    keyFormVisible.value = true;
  }
  // 退出：如果已经输入，清楚key
  if (tag.value) {
    localStorage.removeItem('APIKey');
    tag.value = false;
    // 提示
    ElMessage({
      message: 'API密钥已清除',
      type: 'warning',
    });
    console.log(`APIKey 已清除:${localStorage.getItem('APIKey')}`);
  }
};

// 输入-请求参数
const payload = reactive({
  mode: 'preview',
  prompt: '',
  art_style: 'realistic',
  negative_prompt: '',
});

// 点击-下一步
const goToShow = async () => {
  if (tag.value) {
    // 保存数据到store
    model.createModel(payload);
    // 跳转到Show页面
    router.push('/show');
  } else {
    ElMessage({
      message: '请先输入API密钥',
      type: 'warning',
    });
  }
};

// Key输入表单
const apiKey = ref('');
const keyFormVisible = ref(false);
// 密码隐藏
const isPasswordHidden = ref(true);
function togglePasswordVisibility() {
  isPasswordHidden.value = !isPasswordHidden.value;
}
// 取消-按钮
function cancel() {
  console.log('取消');
  // 1.清空输入框
  // 2.关闭弹窗
  apiKey.value = '';
  keyFormVisible.value = false;
}
// 确定-按钮
function confirm() {
  localStorage.removeItem('APIKey');
  console.log('点击确定');
  // 校验APIKey：不能为空且'msy_'开头
  if (apiKey.value && apiKey.value.startsWith('msy_')) {
    // 保存APIKey
    // key.setAPIKey(apiKey.value);
    localStorage.setItem('APIKey', apiKey.value);
    // 关闭弹窗
    tag.value = true;
    keyFormVisible.value = false;
    apiKey.value = '';
    // 提示
    ElMessage({
      message: 'API密钥输入成功',
      type: 'success',
    });
  }
  console.log(localStorage.getItem('APIKey'));
}
</script>

<template>
  <div
    class="flex flex-col w-full h-full items-center bg-gradient-to-t from-lime-500 to-white relative">
    <!-- 顶部 -->
    <div class="fixed flex items-center justify-between w-full h-[80px] px-4">
      <img class="w-auto h-[50px]" src="@/assets/logo/logo-removebg.png" alt="logo" />
      <div class="flex items-center">
        <!-- 提示 -->
        <p class="mr-4 text-sm">{{ notice }}</p>
        <!-- Button -->
        <button
          @click="apiButton()"
          className="px-4 py-2 text-sm text-white duration-100 bg-lime-500 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-lime-500 focus:ring-2">
          {{ tag ? '退出' : '输入密钥' }}
        </button>
      </div>
    </div>
    <!-- 页面标题 -->
    <div
      class="w-full min-h-[300px] mt-[80px] flex flex-col items-center justify-center text-yellow-900 font-sans">
      <h1
        class="w-full max-w-6xl text-center text-5xl font-bold"
        style="opacity: 1; transform: none">
        贝壳三维模型生成工具
      </h1>
      <h1
        class="w-full mt-4 max-w-6xl text-center text-4xl font-bold"
        style="opacity: 1; transform: none">
        Text-to-3D
      </h1>
      <p class="flex mt-8 font-semibold">输入文本获取三维模型，支持多种风格和效果</p>
    </div>
    <!-- 输入 prompt -->
    <div class="h-10 w-[650px] flex justify-center items-center py-8 px-1 gap-4">
      <!-- 输入框 -->
      <input
        class="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        type="text"
        v-model="payload.prompt"
        placeholder="请输入提示词..." />
      <!-- 按钮 -->
      <button
        @click="goToShow"
        class="inline-flex items-center justify-center whitespace-nowrap font-medium transition duration-100 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-base)] active:opacity-70 h-10 rounded-xl gap-2 text-base bg-gradient-to-r from-[#C5F955] to-[#FF97C2] text-accent-label hover:from-[#B6FF19] hover:to-[#FF6FAA] focus-visible:ring-accent-base cursor-pointer px-5">
        <div class="flex items-center h-6 w-6">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6">
            <path
              d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Zm9-3a.75.75 0 0 1 .728.568l.258 1.036a2.63 2.63 0 0 0 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258a2.63 2.63 0 0 0-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.624 2.624 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395a1.5 1.5 0 0 0-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395a1.5 1.5 0 0 0 .948-.948l.395-1.183a.75.75 0 0 1 .71-.513Z"
              fill="currentColor"></path>
          </svg>
        </div>
        Start with AI
      </button>
    </div>
    <!-- 风格选择 -->
    <div
      class="h-10 w-[640px] mt-5 bg-white/[90] flex justify-between items-center py-3 pl-5 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent overflow-hidden">
      <label for="model_art_style" class="mr-10 text-gray-500 text-base">模型艺术风格：</label>
      <el-radio-group
        class="flex-1 justify-between"
        id="model_art_style"
        v-model="payload.art_style"
        text-color="black"
        fill="#a3e635"
        size="large">
        <el-radio-button label="写实风格" value="realistic" />
        <el-radio-button label="卡通风格" value="cartoon" />
        <el-radio-button label="低聚风格" value="low-poly" />
      </el-radio-group>
    </div>
    <!-- 输入 negative-propmt -->
    <div class="h-10 w-[650px] flex justify-start items-center py-8 px-1 gap-4">
      <!-- 输入框 -->
      <input
        class="flex-1 w-[400px] border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        type="text"
        v-model="payload.negative_prompt"
        placeholder="(可选) 排除 提示词" />
    </div>
    <!-- key输入表单 -->
    <div
      v-if="keyFormVisible"
      class="border-2 rounded-xl px-5 pt-7 pb-4 w-[500px] absolute mt-[40vh] bg-white">
      <div class="text-gray-600">API 密钥：</div>
      <div class="relative max-w-lg mt-2">
        <button
          @click="togglePasswordVisibility"
          class="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600">
          <template v-if="isPasswordHidden">
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              :stroke-width="1.5"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </template>
          <template v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              :stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          </template>
        </button>
        <input
          v-model="apiKey"
          :type="isPasswordHidden ? 'password' : 'text'"
          placeholder="请输入你的API密钥"
          class="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-slate-300 focus:border-lime-500 shadow-sm rounded-lg" />
      </div>
      <div class="flex justify-end items-center mt-3">
        <el-button @click="cancel()" type="success" round>取消</el-button>
        <el-button @click="confirm()" type="success" round>确定</el-button>
      </div>
    </div>
    <!-- Test -->
  </div>
</template>

<style scoped></style>
