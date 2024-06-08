import vueJsx from '@vitejs/plugin-vue-jsx';
export default function () {
  return {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // 定义vue的别名，如果使用其他的插件，可能会用到别名
    },
    plugins: [vueJsx()],
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       //这里的/api表示的意思是以/api开头的才生效 ->刷下面的重点
    //       target: 'http://localhost:8081/',
    //       changOrigin: true, //如果接口跨域这里就要这个参数配置
    //       pathRewrite: {
    //         '^/api': '/',
    //       },
    //     },
    //   },
    // },
  };
}
