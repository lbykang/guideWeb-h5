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
        meta: {
          requireAuth: true // 配置此条，进入页面前判断是否需要登陆
        },
      },
      {
        path: "/about",
        component: about,
        name: "about",
        meta: {
          requireAuth: true // 配置此条，进入页面前判断是否需要登陆
        },
      },
      {
        path: "/linkList",
        name: "linkList",
        component: linkList,
        meta: {
          requireAuth: true // 配置此条，进入页面前判断是否需要登陆
        },
      },
      {
        path: "/menuindex",
        name: "menuindex",
        component: menuindex,
        meta: {
          requireAuth: true // 配置此条，进入页面前判断是否需要登陆
        },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (localStorage.getItem('Authorization')) { // 查询本地存储信息是否已经登陆
      next();
    } else {
      next({
        path: '/login', // 未登录则跳转至login页面
        query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
        });
    }
  } else {
    next();
  }
});

export default router;