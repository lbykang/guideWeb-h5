import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import echarts from "echarts";
import vant from "vant";
Vue.use(vant);
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
import FormMaking from "form-making";
import "form-making/dist/FormMaking.css";
Vue.use(FormMaking);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
