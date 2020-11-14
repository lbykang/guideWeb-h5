<template>
  <div class="body">
    <div style="
    width: 100%;
    position: fixed;
    top: 40%;
    left: 63%;">
      <div style="width: 24%;
    box-shadow: 0px 0px 15px #2aa2a3;
    min-height: 250px;
    float: left;
    border: 1px solid #d7dae2;
    border-radius: 10px;background: aliceblue;">
        <ul id="option">
          <li class="login_left active">密码登录</li>
        </ul>
        <el-form style="width: 90%;
    margin-top: 45px;" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号：" prop="name">
            <div style="background: #ffffff;border: 1px solid #34D8DE;">
              <img style="height: 20px;margin: 0px 0px -6px 5px;" src="../assets/img/tubiao-07.png" alt="">
              <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </div>

          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <div style="background: #ffffff;border: 1px solid #34D8DE;">
              <img style="height: 20px;margin: 0px 0px -6px 5px;" src="../assets/img/tubiao-06.png" alt="">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </div>
          </el-form-item>
          <el-form-item style="margin-left: 10%;">
            <el-button class="login_button" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        name: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: checkAccount, trigger: "blur" }],
      },
    };
  },
  methods: {
     submitForm(formName) {
       console.log('ruleForm=>',this.ruleForm);   
      this.$refs[formName].validate((valid) => {
        if (valid) {
      axios.post('/auth/api/login?username='+this.ruleForm.name+"&password="+this.ruleForm.pass).then(res=>{
          console.log('res=>',res);
          if(res.data.code == '200'){
          localStorage.setItem("Authorization",res.data.data.token);
          this.$message.success({message:'登录成功',center: true});
          this.$router.push("/menu");
          }else if(res.data.code == '401'){
            this.$message.error({message:'用户名或密码错误',center: true});
          } else{
            this.$message.error({message:'登录错误',center: true});
          }          
      })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less">
@import "../assets/css/mixin";
.table_container {
  padding: 20px;
}
.el-button:focus,
.el-button:hover {
  color: #ffffff !important;
  border-color: #c6e2ff;
  background-color: #568cc7 !important;
}
.login_button:hover {
  background: linear-gradient(to left, #36bdbd, #4dbcc2);
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 84%;
}
.login_button {
  margin-top: 20px;
  width: 80%;
  border: 0px;
  height: 35px;
  font-size: 16px;
  color: white;
  background: linear-gradient(to left, #40E4E5, #28CCD6);
}
.el-input__inner {
  border: 0px solid #DCDFE6 !important;
}
.body {
  background: url(../assets/img/beijing1.png) no-repeat;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
  position: absolute;
}
#option {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  border: 1px solid #ceffff;
  margin-bottom: 40px;
}
#option li.active {
  margin: 16px 0 0 37%;
  background: linear-gradient(to left, #40E4E5, #28CCD6);
  color: white;
  border-radius: 20px;
}
#option li {
  float: left;
  text-align: center;
  width: 24%;
  /* background: white; */
  height: 38px;
  cursor: pointer;
  color: #4f4f4f;
  font-size: 16px;
  border-radius: 20px;
  font-weight: bold;
}
</style>