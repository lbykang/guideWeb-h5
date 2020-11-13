import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const index = (r) =>
  require.ensure([], () => r(require("@/view/Home.vue")), "index");
const linkList = (r) =>
  require.ensure([], () => r(require("@/components/linkList")), "linkList");
const menu = (r) =>
  require.ensure([], () => r(require("@/view/menu")), "menu");
const about = (r) =>
  require.ensure([], () => r(require("@/components/About.vue")), "about");
const menuindex = (r) =>
  require.ensure([], () => r(require("@/components/menuIndex.vue")), "menuindex");
const login = (r) =>
  require.ensure([], () => r(require("@/view/login")), "login");
const user = (r) =>
  require.ensure([], () => r(require("@/components/user")), "user");
const routes = [{
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },

  {
    path: "/menu",
    component: menu,
    name: "",
    children: [{
        path: "",
        component: menuindex,
        meta: [],
      },
      {
        path: "/about",
        component: about,
        name: "about",
      },
      {
        path: "/linkList",
        name: "linkList",
        component: linkList,
      },
      {
        path: "/menuindex",
        name: "menuindex",
        component: menuindex,
      },
      {
        path: "/user",
        name: "user",
        component: user,
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;