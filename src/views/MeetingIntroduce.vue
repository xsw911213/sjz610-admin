<template>
  <section style="position:relative;">
    <div class="phone">
      <div class="header">
        <p>会议介绍示例</p>
      </div>
      <div v-if="img" class="img-demo">
        <img :src="img" alt>
      </div>
      <el-upload
        v-else
        class="avatar-uploader"
        action="//up.qbox.me/"
        :show-file-list="false"
        :data="uploadform"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="btns">
      图片大小限制为
      <el-input v-model="maxSize" size="small"></el-input>M
      <el-button type="primary" @click="reset">重新上传</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      maxSize: 3,
      dataid: "",
      img: "",
      uploadform: {
        key: "",
        token: ""
      }
    };
  },
  methods: {
    init() {
      let _this = this;
      let succ = res => {
        if (res.data) {
          _this.img = res.data.imgurl;
          _this.dataid = res.data._id;
        }
      };

      let error = err => {
        console.log(err);
      };

      let reqConfig = {
        method: "get",
        path: _this.host.baseUrl + "/meetingintroduce"
      };
      _this.ajax.http(reqConfig.method, reqConfig.path, {}, succ, error);
    },
    handleAvatarSuccess(response, file, fileList) {
      this.img = `${this.host.imgBaseUrl}${response.key}`;
    },
    beforeAvatarUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < this.maxSize;
      let _this = this;

      if (!isLt2M) {
        _this.$message.error("上传图片大小不能超过 " + this.maxSize + "MB!");
      } else {
        let params = {
          fileName: file.name
        };

        return axios
          .get(_this.host.baseUrl + "/uploadimg", { params })
          .then(res => {
            if (res.data.code === "1") {
              _this.uploadform = {
                key: res.data.result.fileName,
                token: res.data.result.uploadToken
              };
            } else {
              _this.$message.error("上传图片失败");
            }
          })
          .catch(() => {
            _this.$message.error("上传图片失败");
          });
      }

      return isLt2M;
    },
    reset() {
      this.img = "";
    },
    save() {
      let _this = this;
      let succ = res => {
        this.$notify({
          title: "保存成功",
          message: "图片保存成功",
          type: "success"
        });
      };

      let error = err => {
        console.log(err);
      };

      let reqConfig = {
        method: _this.dataid === "" ? "post" : "put",
        path: _this.host.baseUrl + "/meetingintroduce"
      };
      let body = {};
      if (reqConfig.method === "post") {
        body.imgurl = _this.img;
      } else if (reqConfig.method === "put") {
        body._id = _this.dataid;
        body.imgurl = _this.img;
      }
      _this.ajax.http(reqConfig.method, reqConfig.path, body, succ, error);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
$rate: 0.9;
$w: 375px * $rate;
$h: 600px * $rate;
$header: 50px * $rate;

.phone {
  position: relative;
  box-sizing: border-box;
  width: $w;
  padding-top: $header;
  background-color: rgb(82, 82, 82);
  .header {
    position: absolute;
    height: $header;
    width: $w;
    top: 0;
    p {
      position: absolute;
      height: $header;
      line-height: $header;
      width: $w;
      top: 0;
      margin: 0;
      font-size: 18px;
      text-align: center;
      color: #fff;
    }
  }
  .img-demo {
    box-sizing: border-box;
    position: relative;
    width: $w;
    height: $h;
    background-color: #fff;
    border: 1px solid rgb(82, 82, 82);
    overflow: auto;
    img {
      display: block;
      width: 100%;
    }
  }
}

.btns {
  position: absolute;
  width: 200px;
  left: $w + 30px;
  top: 50px;
  .el-input {
    width: 40px;
    .el-input__inner {
      padding: 0 10px;
      text-align: center;
    }
  }
  button {
    width: 100px;
    margin-top: 40px;
    margin-left: 25px !important;
  }

  .avatar-uploader {
    width: $w;
    height: $h;
    background-color: #fff;
  }

  .avatar-uploader-icon {
    box-sizing: border-box;
    font-size: 28px;
    color: #8c939d;
    width: $w;
    height: $h;
    line-height: $h;
    text-align: center;
    border: 1px solid rgb(82, 82, 82);
  }
  .el-upload {
    width: $w;
    height: $h;
  }
  .avatar {
    width: $w;
    height: $h;
    object-fit: contain;
  }
}
</style>