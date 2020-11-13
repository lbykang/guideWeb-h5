<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%; background-color: #324057">
        <el-menu :default-active="defaultActive" style="min-height: 100%" background-color="#324157" text-color="#bfcbd9" router>
          <el-menu-item index="menu"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
            <el-menu-item index="linkList">业务信息管理</el-menu-item>
            <el-menu-item index="user">用戶管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="about"><i class="el-icon-warning"></i>说明</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function () {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/mixin";
.manage_page {
}
</style>
