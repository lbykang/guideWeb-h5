<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/menu' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" plain @click="logout">退出登录</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    ...mapActions(["getAdminData"]),
    logout() {
      localStorage.removeItem("Authorization");
      this.$message.success({ message: "退出登录成功", center: true });
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less">
@import "../assets/css/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
