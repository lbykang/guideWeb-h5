<template>
  <div class="about">
    <head-top></head-top>
    <h1>This is an about page</h1>
    <img src="http://localhost:8882/auth/image/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201113102226.jpg" alt="">
  </div>
</template>
<script>
import headTop from "../view/headTop";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      localimg: "F:/其他文件/微信图片_20200825160233.jpg",
      img:
        "file:///F:/%E5%85%B6%E4%BB%96%E6%96%87%E4%BB%B6/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200825160233.jpg",
    };
  },
  components: {
    headTop,
  },
  created() {},
  methods: {
    getFileUrl(sourceId) {
      var url;
      if (navigator.userAgent.indexOf("MSIE") >= 1) {
        // IE
        url = document.getElementById(sourceId).value;
      } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        // Firefox
        url = window.URL.createObjectURL(
          document.getElementById(sourceId).files.item(0)
        );
      } else if (navigator.userAgent.indexOf("Chrome") > 0) {
        // Chrome
        url = window.URL.createObjectURL(
          document.getElementById(sourceId).files.item(0)
        );
      }
      return url;
    },
    preImg(localimg) {
      var url = this.getFileUrl(localimg);
      this.img = url;
    },
  },
};
</script>

<style lang="less">
@import "../assets/css/mixin";
.table_container {
  padding: 20px;
}
</style>