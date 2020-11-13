<template>
  <div>
    <head-top></head-top>
    <el-table :data="tableData" style="margin: 50px 0 0 13%;width: 70%;" border>
      <el-table-column type="index" width="50" label="序号">
      </el-table-column>
      <el-table-column prop="account" label="账号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="pwd" label="密码">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="showLinkInfo(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="getLinkInfo(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="delete scope.row.id">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import headTop from "../view/headTop";
export default {
  data() {
    return {
      tableData: [
        {
          account: "wxh",
          name: "王小虎",
          pwd: "123456",
        },
        {
          account: "zs",
          name: "张三",
          pwd: "24234234",
        },
        {
          account: "xw",
          name: "小王",
          pwd: "423423423",
        },
      ],
    };
  },
  components: {
    headTop,
  },
};
</script>

<style lang="less">
@import "../assets/css/mixin";
.table_container {
  padding: 20px;
}
</style>