<template>
  <n-config-provider
    :theme="darkTheme"
    :hljs="hljsTheme"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="overridesTheme"
  >
    <go-app-provider>
      <I18n></I18n>
      <router-view></router-view>
    </go-app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { GoAppProvider } from '@/components/GoAppProvider'
import { I18n } from '@/components/I18n'
import { useSystemInit, useDarkThemeHook, useThemeOverridesHook, useCode, useLang } from '@/hooks'

// 暗黑主题
const darkTheme = useDarkThemeHook()

// 主题配置
const overridesTheme = useThemeOverridesHook()

// 代码主题
const hljsTheme = useCode()

// 系统全局数据初始化
// useSystemInit()

// 全局语言
const { locale, dateLocale } = useLang()

//测试提交

// import {onMounted, ref} from "vue";
// let myToken = ref('')
// onMounted(() => {
//   //向父项目传值
//   // window.parent.postMessage("hello，我即将传给父项目", "*");
//   //绑定事件接收父项目传来的值
//   debugger
//   window.addEventListener("message", handleMessage);
// });
// const handleMessage = (event: any) => {
//   debugger
//   console.log("这里是父项目传来的值", event.data);
//   const data = event.data;
//   switch (data.iframeClick) {
//     case 'getParams':
//       debugger
//       myToken.value = data.params.key; // 这样就拿到了vue传过来的params
//       console.log(myToken);
//       localStorage.setItem('token', myToken.value);
//   }
// };
</script>