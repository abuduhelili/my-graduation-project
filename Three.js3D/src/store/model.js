import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getID, getModel } from '@/api';

export const useModel = defineStore(
  'model',
  () => {
    // 模型任务ID
    const ID = ref('');
    // 模型数据
    const modelInfo = ref();
    // 创建模型
    async function createModel(payload) {
      // 获取模型任务ID
      // const res = await getID(payload);
      // ID.value = res.data;
      // console.log(ID.value);

      // 获取模型数据
      const res2 = await getModel('018ec1f7-66ad-7b64-b38c-11ff1ea7d00c');
      modelInfo.value = res2.data;
      console.log('Model Store内容:', modelInfo.value);
    }

    return { createModel, ID, modelInfo };
  },
  { persist: true }
);
// 测试ID:
// '018ec1b3-3880-7b62-8edc-5fa1f92b1dc8'
// '018ec1f7-66ad-7b64-b38c-11ff1ea7d00c'

// 测试API Key:
// API密钥:msy_1nptHfPSX74UiF5sHM65Z8hAXNoDpRfaTYje
