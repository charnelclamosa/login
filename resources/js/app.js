require("./bootstrap");
import Vue from "vue";
import Vuetify from "vuetify";
import App from "./components/App.vue";
import Routes from "./router";
import VueRouter from "vue-router";
import store from "./store";
import VueIziToast from "vue-izitoast";
import "@mdi/font/css/materialdesignicons.css";
import "izitoast/dist/css/iziToast.css";
import "izitoast/dist/css/iziToast.min.css";

Vue.use(Vuetify, {
    icons: {
        iconfont: "mdi"
    }
});
Vue.use(VueRouter);
Vue.use(VueIziToast);

// Components
Vue.component("card-header", require("./components/base/Header.vue").default);

const app = new Vue({
    el: "#app",
    store,
    router: Routes,
    vuetify: new Vuetify(),
    render: h => h(App)
});

export default app;
