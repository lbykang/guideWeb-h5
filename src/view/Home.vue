<template>
  <div class="wrapper" :style="{
      backgroundImage: 'url(' + bodobj + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }">
    <div>
      <!--动态将图片轮播图的容器高度设置成与图片一致-->
      <el-carousel :height="bannerHeight + 'px'" style="width: 50%;margin: auto;">
        <!--遍历图片地址,动态生成轮播图-->
        <el-carousel-item v-for="item in img_list" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="margin:15px 3% 0px 8%;">
      <div style="background: #fffff7; border-radius: 30px;height: 60px;width: 15%;float:left;border: 1px solid #d7dae2;margin:15px 3% 0px 3%;" v-for="(item,i) in guideList" :key="i">
        <div @click="showLinkInfo(item.id)">
          <h2 style="
    text-align: center;
    line-height: 55px;">{{item.name}}</h2>
        </div>
      </div>
    </div>
    <el-dialog width="65%" style="min-height: 550px;" title="内容查看" :visible.sync="dialogFormVisibleCk">
      <div style="min-height: 100px;float: left;
    margin-left: 5%;text-align: center;">
        <h2>对象</h2>
        <div style="margin: 30px 10px 10px 63px;">
          <span>
            {{guideInfo.object}}
          </span>
        </div>
      </div>
      <div style="min-height: 100px;float: left;
    margin-left: 15%;text-align: center;">
        <h2>一次性告知清单</h2>
        <div style="margin: 30px 10px 10px 63px;">
          <span>
            {{guideInfo.Informlisting}}
          </span>
        </div>
      </div>

      <div style="min-height: 100px;float: left;
    margin-left: 15%;text-align: center;">
        <h2>工作人员及联系方式</h2>
        <div style="margin: 30px 10px 10px 63px;">
          <span>
            {{guideInfo.staff}}
          </span><br /><br />
          <span>
            {{guideInfo.contact}}
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
import { getLink } from "../net/api.js";
export default {
  props: {},
  data() {
    return {
      dialogFormVisibleCk: false,
      guideList: [
        { name: "法律援助", id: 1 },
        { name: "公证", id: 2 },
        { name: "司法鉴定", id: 3 },
        { name: "社区矫正", id: 4 },
        { name: "行政复议", id: 5 },
        { name: "人民调解", id: 6 },
        { name: "刑释人员安置帮教", id: 7 },
        { name: "法律服务", id: 8 },
      ],
      advertisingImg: [
        {
          imgUrl: "http://106.12.159.112:9000/picture/1574778084836.jpeg",
          path: "http://106.12.159.112:9000/picture/1574778084836.jpeg",
        },
        {
          imgUrl: "http://106.12.159.112:9000/picture/1574778008803.jpeg",
          path: "http://106.12.159.112:9000/picture/1574778008803.jpeg",
        },
        {
          imgUrl: "http://106.12.159.112:9000/picture/1574774120247.jpeg",
          path: "http://106.12.159.112:9000/picture/1574774120247.jpeg",
        },
        {
          imgUrl: "http://106.12.159.112:9000/picture/1574777485000.jpeg",
          path: "http://106.12.159.112:9000/picture/1574777485000.jpeg",
        },
      ],

      // 图片地址数组
      img_list: [
        "http://106.12.159.112:9000/picture/1574778084836.jpeg",
        "http://106.12.159.112:9000/picture/1574778008803.jpeg",
        "http://106.12.159.112:9000/picture/1574774120247.jpeg",
        "http://106.12.159.112:9000/picture/1574777485000.jpeg",
      ],
      // 图片父容器高度
      bannerHeight: 1000,
      // 浏览器宽度
      screenWidth: 0,
      guideInfo: {
        object: "援助对象",
        Informlisting: "一次性告知清单",
        staff: "陈步月",
        contact: "0411-15484451",
      },

      userName: "",
      loginSate: true, //true 未登录状态/false已登录状态
      mouserState: false,
      popup: false,
      register: false,
      tabPosition: "left",
      tapvalue: [],
      ip: "",
      area: "",
      brower: "",
      os: "",
      bodobj: "",
      active: "",
      background: [
        {
          img:
            "http://www.4kbizhi.com/d/file/2020/09/05/small16585880eMw1599296338.jpg",
        },
      ],
      sjs: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (400 / 1920) * this.screenWidth;
    },
    //查看引导信息
    showLinkInfo(id) {
      console.log(id);
      this.dialogFormVisibleCk = true;
      // axios.get("/auth/link/getLinkById?id=" + id).then((res) => {
      //   this.linkInfo = res.data;
      //   console.log(res.data);
      //   this.linkInfoImage.push(res.data.linkImage);
      // });
    },

    getLoginStae() {
      var ses = window.localStorage;
      var user = ses.getItem("token");
      var account = ses.getItem("account");
      if (user != null && user !== "") {
        this.loginSate = false;
        this.userName = account;
      } else {
        this.loginSate = true;
      }
    },
    go(path) {
      window.location.href = path;
    },
    loginOut() {
      var ses = window.localStorage;
      ses.removeItem("token");
      this.getLoginStae();
    },
    mouserIn() {
      this.mouserState = true;
    },
    mouserOut() {
      this.mouserState = false;
    },
    //打开登录页面
    showLoginPopup() {
      this.popup = true;
    },
    //打开注册页面
    showRegisterPopup() {
      this.popup = true;
      this.register = true;
    },
    //关闭活动规则页面
    closepopup() {
      this.popup = false;
      this.register = false;
    },
    async getLjxx() {
      // 为给定 ID 的 user 创建请求
      //var s = getLink().data;
      let s = (await getLink()).data;
      s.forEach((link) => {
        link.style = "";
      });
      this.tapvalue = s;
    },
    backgroundImg: function () {
      var sjsz = Math.ceil(Math.random() * this.background.length);
      if (this.sjs == sjsz) {
        if (sjsz > 1) {
          sjsz = sjsz - 1;
        } else {
          sjsz = sjsz + 1;
        }
      }
      this.sjs = sjsz;
      this.bodobj = this.background[sjsz - 1].img;
    },
    mouseOver: function (index1, index2) {
      let r, g, b;
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      this.tapvalue[index1].linkList[index2].style =
        "background-color:rgb(" +
        r +
        "," +
        g +
        "," +
        b +
        ");transform: scale(1);transition: all 0.5s linear;";
    },
    mouseLeave: function (index1, index2) {
      this.tapvalue[index1].linkList[index2].style = "";
    },
    bjxz: function () {
      $("#img5").rotate({
        angle: 0,
        animateTo: 360,
        callback: this.bjxz,
        easing: function (x, t, b, c, d) {
          // t: current time, b: begInnIng value, c: change In value, d: duration
          return c * (t / d) + b;
        },
      });
    },
    changebj: function () {
      this.backgroundImg();
    },
    openCenter(content, type) {
      this.$message({
        message: content,
        center: true,
        type: type,
      });
    },
  },
  created() {},
  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth;
    this.setSize();
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    };
    //this.getLjxx();
    this.backgroundImg();
  },
};
</script>
<style lang="less" scoped>
@import "../assets/css/rlstyle.css";
@import "../assets/css/sy.css";
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
span {
  font-size: 20px;
}
/deep/ .el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  min-height: 500px;
}
</style>
