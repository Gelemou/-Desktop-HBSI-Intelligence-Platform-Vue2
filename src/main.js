import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 切换tabItem时将tabIndex从组件LeftMenu里传给selectHeader,用tabIndex来控制输入框是否显示
var Index = new Vue(); // 创建一个实例,用来传值
Vue.prototype.Index = Index; // 挂载到vue原型上

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
