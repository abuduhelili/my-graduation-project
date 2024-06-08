const express = require('express');
const axios = require('axios');
const fs = require('fs');
// const path = require('path');
// cors
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
// 配置中间件
app.use(express.json());
// 添加 JSON 解析器
app.use(bodyParser.json());
// 或者添加 URL 编码数据解析器（如果需要）
app.use(bodyParser.urlencoded({ extended: true }));

// // 配置 cors 这个中间件
// const corsOptions = {
//   origin: 'http://localhost:8080/',
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

const port = 8081;

// 测试ID:
// '018ec1b3-3880-7b62-8edc-5fa1f92b1dc8'
// '018ec1f7-66ad-7b64-b38c-11ff1ea7d00c'

// 测试API Key:
// API密钥:msy_1nptHfPSX74UiF5sHM65Z8hAXNoDpRfaTYje

// const APIKey = 'msy_1nptHfPSX74UiF5sHM65Z8hAXNoDpRfaTYje';
// const headers = { Authorization: `Bearer ${APIKey}` };

// 预览任务：获取ID
async function getPreviewTaskId(payload, headers) {
  try {
    const response = await axios.post('https://api.meshy.ai/v2/text-to-3d', payload, { headers });
    return response.data.result;
  } catch (error) {
    return error;
  }
}
// 细化任务：获取ID
async function getRefineTaskId(previewTaskId, headers) {
  try {
    const response = await axios.post(
      'https://api.meshy.ai/v2/text-to-3d',
      {
        mode: 'refine',
        preview_task_id: previewTaskId,
      },
      {
        headers,
      }
    );
    return response.data.result;
  } catch (error) {
    return error;
  }
}
// 获取ModelInfo
async function getModelInfo(taskId, headers) {
  try {
    const response = await axios.get(`https://api.meshy.ai/v2/text-to-3d/${taskId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

// 下载文件并保存到指定路径
async function downloadFile(fileUrl, filePath) {
  const response = await axios.get(fileUrl, { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(filePath));
  await new Promise((resolve, reject) => {
    response.data.on('end', resolve);
    response.data.on('error', reject);
  });
}
// app.get('', (req, res) => {
//   res.send({
//     code: 0,
//     msg: 'success',
//     msg2: 'test成功',
//   });
// });
app.post('/test', async (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    msg2: 'test成功',
    body: req.body,
  });
});

// 获取模型
app.post('/get-model', async (req, res) => {
  const API_KEY = req.body.key;
  const payload = req.body.payload;
  const headers = { Authorization: `Bearer ${API_KEY}` };
  // 获取预览taskId
  const previewTaskId = await getPreviewTaskId(payload, headers);
  // 车
  // const previewTaskId = '018fa4bd-b9a1-75f3-b772-9a98daa93d22';
  // 海洋贝壳
  // const previewTaskId = '018fa670-f4ea-7014-bae2-9316f38708a5';
  // 黄色的条形贝壳
  //
  // 获取细化taskId
  // const refineTaskId = await getRefineTaskId(previewTaskId, headers);
  // 获取ModelInfo，请求直到modelInfo.progress === 100
  const firstModelInfo = await getModelInfo(previewTaskId, headers);
  // modelInfo.progress !== 100 时，重新请求，直到modelInfo.progress === 100
  while (firstModelInfo.progress !== 100) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    var modelInfo = await getModelInfo(previewTaskId, headers);
    firstModelInfo.progress = modelInfo.progress;
  }

  if (modelInfo.model_urls) {
    // 成功：返回文件信息
    res.send({
      code: 0,
      API_KEY,
      msg: '模型生成成功，可以下载',
      previewTaskId,
      modelInfo,
    });
  } else {
    // 错误：返回错误信息
    res.send({
      code: 1,
      API_KEY,
      msg: '模型生成失败，刷新后重试',
      previewTaskId,
      modelInfo,
    });
  }
});

app.listen(port, () => {
  console.log(` 服务器启动成功，端口号：${port}`);
});

// const previewTaskId = '018f631e-d6f6-75b1-a9f4-10a021bb4dab';
// test
// const taskId = '018ec1f7-66ad-7b64-b38c-11ff1ea7d00c';
// console.log('taskId:', taskId);
// 保存文件
// const fileUrl = modelInfo.model_urls;

// const fileName = 'glb-100.glb';
// const filePath = path.join(__dirname, 'public', 'threeFile', 'glb', fileName);
// 下载文件
// await downloadFile(fileUrl, filePath);
// 返回文件下载情况
