import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import i18n from '@/i18n/index'
import { setupStore } from '@/store'
import { setupNaive, setupDirectives, setupCustomComponents, initFunction } from '@/plugins'
import { GoAppProvider } from '@/components/GoAppProvider/index'
import { setHtmlTheme } from '@/utils'
import { addCollection } from 'iconify-icon'
import uimIcons from '@iconify/json/json/uim.json'
import lineMdIcons from '@iconify/json/json/line-md.json'
import wiIcons from '@iconify/json/json/wi.json'
import { useDesignStore } from '@/store/modules/designStore/designStore'

// 引入全局样式
import '@/styles/pages/index.scss'
// 引入动画
import 'animate.css/animate.min.css'
// 引入标尺
import 'vue3-sketch-ruler/lib/style.css'

const cus = import.meta.env.VITE_APP_CUSTOM;
let cus1 = '';
let cus2 = '';
let index = cus.lastIndexOf(':');
cus1 = cus.substring(0, index);
// console.log(cus1); //张三>李四
let index2 = cus1.lastIndexOf('//');
cus2 = cus1.substring(index2 + 2, cus1.length);
// console.log(cus2, '-------------=======---------------'); //王五
// document.domain = cus2;
// document.domain = '10.211.55.17';
// console.log('bbbbbbbbbbbb')


// 注册图标
addCollection(uimIcons)
addCollection(lineMdIcons)
addCollection(wiIcons)

async function appInit() {
  const goAppProvider = createApp(GoAppProvider)

  const app = createApp(App)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app)

  // 注册全局自定义指令
  setupDirectives(app)

  // 注册全局自定义组件
  setupCustomComponents(app)

  // 挂载状态管理
  setupStore(app)

  // 解决路由守卫，Axios中可使用，Dialog，Message 等全局组件
  goAppProvider.mount('#appProvider', true)

  // 挂载路由
  setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  // Store 准备就绪后处理主题色
  setHtmlTheme()

  // 语言注册
  app.use(i18n)

  // 挂载到页面
  app.mount('#app', true)

  // 挂载到 window
  window['$vue'] = app
}

appInit().then(() => {
  initFunction()
  // 监听 父页面传递的消息
  const designStore = useDesignStore()
  window.addEventListener('message', function(event) {
    const { type, data } = event.data;
    console.log(data, designStore.getDarkTheme, type);
    if (type === 'changeTheme') {
      if (typeof data === 'undefined') return
      if (data === designStore.getDarkTheme) return
      console.log('触发画布页面主题更改------------');
      designStore.changeTheme()
      setHtmlTheme()
    }
  });
})

