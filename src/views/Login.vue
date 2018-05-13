<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">石家庄旅游产业发展大会管理后台</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" @keyup.enter.native="handleSubmit2"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" @keyup.enter.native="handleSubmit2"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from 'axios';
  
  // import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            axios.post(this.host.baseUrl + '/login', loginParams)
            .then(function (response) {
              console.log(response)
              let data = response.data;
              _this.logining = false;
              if(data.status === 'success'){
                sessionStorage.setItem('user', JSON.stringify(data.userinfo));
    
                localStorage.setItem('account', JSON.stringify(_this.ruleForm2.account));

                // _this.$store.commit('USERNAME',data.userinfo.name);
                // _this.$store.commit('USERAVATAR',data.userinfo.avatar);

                if(_this.checked){
                  localStorage.setItem('checkPass', JSON.stringify(_this.ruleForm2.checkPass));
                }else{
                  localStorage.setItem('checkPass', '');
                }
                
                _this.$router.push({ path: '/pageConfig' });
              }
            })
            .catch(function (error) {
              console.log(error)
              // console.log(arguments);
              // _this.$message.error('错了哦，这是一条错误消息');
              _this.$message({
                showClose: true,
                // message: error.response.data.message,
                message:'用户名或密码错误',
                type: 'error',
                duration:5000
              })
              _this.logining = false;
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSubmit3(ev) {
        console.log(this.$route)
        sessionStorage.setItem('user', JSON.stringify('123'));
        this.$router.push({ path: '/pageConfig'});
      }
    },
    mounted(){
      this.ruleForm2.account = JSON.parse(localStorage.getItem('account'));
      this.ruleForm2.checkPass = JSON.parse(localStorage.getItem('checkPass'));
      console.log();
      // console.log(localStorage.getItem('account'))
      // console.log(localStorage.getItem('checkPass'))
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>