import Vue from 'vue'
import './plugins/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from "~/router";
import Viewer from "v-viewer";
import 'viewerjs/dist/viewer.css'
Vue.use(ElementUI)
Vue.use(Viewer, {
  defaultOptions: {
    //inline:true,//启动inline模式
    zIndex: 9999,
    title:true,//    显示当前图片的标题
    scalable:true,//图片是否可翻转
    rotatable:true,//图片是否可旋转
    tooltip:true,//显示缩放百分比
    navbar:false,//显示缩略图导航
    loop:true,
    loading:true

  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
