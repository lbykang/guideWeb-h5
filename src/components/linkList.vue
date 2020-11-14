<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="guideName" label="业务名称" width="120">
      </el-table-column>
      <el-table-column prop="object" label="对象信息" show-overflow-tooltip></el-table-column>
      <el-table-column prop="Informlisting" label="告知清单" show-overflow-tooltip></el-table-column>
      <el-table-column prop="staff" label="工作人员" show-overflow-tooltip></el-table-column>
      <el-table-column prop="contact" label="联系方式" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="showLinkInfo(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="getLinkInfo(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="delete scope.row.id">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[15, 20, 30]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="查看" :visible.sync="dialogFormVisibleCk">
      <el-form :model="linkInfo">
        <el-form-item label="业务名称" :label-width="formLabelWidth">
          <el-input disabled v-model="linkInfo.linkName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="对象信息" :label-width="formLabelWidth">
          <el-input disabled v-model="linkInfo.linkUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="告知清单" :label-width="formLabelWidth">
          <el-input-number v-model="linkInfo.linkOrder" :min="0" label="显示顺序" disabled></el-input-number>
        </el-form-item>
        <el-form-item label="工作人员" :label-width="formLabelWidth">
          <el-input disabled v-model="linkInfo.typeName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input disabled v-model="linkInfo.typeName"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="linkInfo">
        <el-form-item label="业务名称" :label-width="formLabelWidth">
          <el-input v-model="linkInfo.linkName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="对象信息" :label-width="formLabelWidth">
          <el-input v-model="linkInfo.linkUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="告知清单" :label-width="formLabelWidth">
          <el-input v-model="linkInfo.linkOrder" label="显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="工作人员" :label-width="formLabelWidth">
          <el-input v-model="linkInfo.linkOrder" label="显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="linkInfo.linkOrder" label="显示顺序"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-button :plain="true" @click="hello">错误</el-button>
  </div>
</template>
<script>
import headTop from "../view/headTop";
import axios from "axios";
import { getLink, addOrEditLink } from "../net/api.js";

export default {
  data() {
    return {
      tableData: [
        {
          guideName: "法律援助",
          object: "援助对象",
          Informlisting: "一次性告知清单",
          staff: "不约",
          contact: "0514-4844484",
        },
        {
          guideName: "法律援助",
          object: "援助对象",
          Informlisting: "一次性告知清单",
          staff: "帅康",
          contact: "0514-4844484",
        },
        {
          guideName: "法律援助",
          object: "援助对象",
          Informlisting: "一次性告知清单",
          staff: "刘烨",
          contact: "0514-4844484",
        },
        {
          guideName: "法律援助",
          object: "援助对象",
          Informlisting: "一次性告知清单",
          staff: "璐璐",
          contact: "0514-4844484",
        },
      ],

      currentRow: null,
      offset: 0, //当前也
      limit: 20, //
      count: 0,
      total: 60, //总条数
      currentPage: 1,
      isChoose: false,
      countData: [],
      images: [],
      linkInfoImage: [],
      linkInfo: "",
      currentPage4: 4,
      dialogFormVisible: false,
      dialogFormVisibleCk: false,
      imageUrl: "",
      imagePath: "",
      link: {
        name: "",
        region: "",
        order: 0,
        state: "",
        type: "",
        pcFile: "",
      },
      formLabelWidth: "120px",
    };
  },
  components: {
    headTop,
  },
  created() {
    //this.getLinks();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imagePath = res;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async submit() {
      this.linkInfo.linkImage = this.imagePath;
      await addOrEditLink(this.linkInfo);
      console.log(this.linkInfo);
      this.getLinks();
      this.dialogFormVisible = false;
    },

    handleChange(value) {
      console.log(value);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    delete(id) {
      console.log(id);
    },
    showLinkInfo(id) {
      this.dialogFormVisibleCk = true;
      axios.get("/auth/link/getLinkById?id=" + id).then((res) => {
        this.linkInfo = res.data;
        console.log(res.data);
        this.linkInfoImage.push(res.data.linkImage);
      });
    },
      hello() {
      axios.get("/auth/api/hello").then((res) => {
        console.log(res.data);
        this.$message.success(res.data);
      });
    },
    getLinkInfo(id) {
      this.dialogFormVisible = true;
      axios.get("/auth/link/getLinkById?id=" + id).then((res) => {
        this.imageUrl = res.data.linkImage;
        this.linkInfo = res.data;
        this.linkInfo.id = id;
        console.log(res.data);
      });
    },
    photoList() {
      let final = [];
      for (let photo of this.photos) {
        final.push(photo.src);
      }
      let nowIndex = final.findIndex((photo) => photo === this.now);
      if (nowIndex > -1) {
        let start = final.slice(0, nowIndex);
        let end = final.slice(nowIndex);
        final = [...end, ...start];
      }
      return final;
    },
    handleSelectionChange() {},
    handleClick(row) {
      console.log(row);
    },
    imgScc: function () {
      this.isChoose = !this.isChoose;
    },
    async getLinks() {
      var _this = this;
      _this.images = [];
      _this.tableData = [];
      (await getLink()).data.forEach((item) => {
        var linkList = item.linkList;
        linkList.forEach((link) => {
          var table = {};
          table.typeName = item.typeName;
          table.id = link.id;
          table.linkName = link.linkName;
          table.linkUrl = link.linkUrl;
          table.linkImage = link.linkImage;
          table.linkType = link.linkType;
          table.state = link.state;
          _this.images.push(link.linkImage);
          _this.tableData.push(table);
        });
      });
    },
  },
};
</script>

<style lang="less">
@import "../assets/css/mixin";
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  height: 10%;
  float: right;
  margin: 20px;
}
td.el-table_1_column_6 {
  padding: 0px;
}
.table_container {
  padding: 20px;
}
.vueBox {
  text-align: center;
  margin-left: 300px;
  position: relative;
}

img {
  transform: scale(1); /*图片原始大小1倍*/
  transition: all ease 0.5s;
} /*图片放大所用时间*/

img.active {
  transform: scale(4); /*图片需要放大3倍*/
  position: fixed; /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
  z-index: 100;
}
</style>
