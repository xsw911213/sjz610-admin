<template>
  <section class="editor">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item v-if="$route.params.from === 'news'" label="头图：" prop="headImg">
        <el-upload class="avatar-uploader" action="//up.qbox.me/" :show-file-list="false" :data="uploadform" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img class="ava-img" v-if="ruleForm.headImg" :src="ruleForm.headImg" alt="">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="ruleForm.title" style="width:600px;"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="richText">
        <div id="wangEditor" style="width:600px"></div>
      </el-form-item>
      <el-form-item label prop>
        <el-button type="primary" @click="submit('ruleForm')">保存</el-button>
				<el-button v-if="$route.params.id !== 'add'" type="danger" @click="deleteArticle($route.params.id)">删除</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import axios from "axios";
import E from "wangeditor";

export default {
  data() {
    return {
      maxSize: 2,
      uploadform: {
        key: "",
        token: ""
      },
      ruleForm: {
        headImg: '',
        title: "",
        richText: ""
      },
      rules: {
        headImg: [{ required: this.$route.params.from === 'news'}],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        richText: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
			wangEditor: null,
			apiPath:''
    };
  },
  methods: {
    handleAvatarSuccess(response, file, fileList) {
      this.ruleForm.headImg = `${this.host.imgBaseUrl}${response.key}`;
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
		getArticle (id) {
			let _this = this
      let succ = (res) => {
				let data = res.data[0]
				_this.ruleForm.title = data.title
        _this.ruleForm.richText = data.richText
        if(data.headImg){
          _this.ruleForm.headImg = data.headImg
        }
				this.wangEditor.txt.html(data.richText)
      }

      let error = (err) => {
        console.log(err)
			}

      let reqConfig = {
        method: 'get',
        path: _this.host.baseUrl + _this.apiPath
			}
      _this.ajax.http(reqConfig.method, reqConfig.path, {_id:id}, succ, error)
		},
		deleteArticle (id) {
			let _this = this

      let error = (err) => {
        console.log(err)
			}

      let reqConfig = {
        method: 'delete',
        path: _this.host.baseUrl + _this.apiPath
      }
      _this.ajax.http(reqConfig.method, reqConfig.path, {_id:id}, _this.succ, error)
		},
    createEditor() {
      let editor = new E("#wangEditor");
      editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        // "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        // 'image',  // 插入图片
        // 'table',  // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      editor.customConfig.onchange = (html) => {
      	this.ruleForm.richText = html
      }
      editor.customConfig.uploadImgShowBase64 = true
      
			editor.create()
			this.wangEditor = editor;
		},
		succ (res) {
			this.$router.back(-1)
		},
		error (err) {
		},
    submit(formName) {
			let _this = this
      this.$refs[formName].validate((valid) => {
				if (valid) {
					let routerParams = _this.$route.params
					let reqConfig = {
						method: routerParams.id === 'add' ? 'post' : 'put',
						path: _this.host.baseUrl + _this.apiPath
					}
					if(reqConfig.method === 'put'){
						_this.ruleForm._id = routerParams.id
          }
          _this.ruleForm.text = this.wangEditor.txt.text()
					_this.ajax.http(reqConfig.method,reqConfig.path,_this.ruleForm,_this.succ,_this.error)
				} else {
					console.log('error submit!!');
					return false;
				}
			});
    }
  },
  mounted() {
		this.createEditor();
		if(this.$route.params.from === 'meetingNotice'){
			this.apiPath = '/meetingnotice'
		}else if (this.$route.params.from === 'news'){
			this.apiPath = '/news'
		}
		if (this.$route.params.id !== 'add'){
			this.getArticle(this.$route.params.id)
		}
  }
};
</script>

<style lang="scss">
$w: 150px;
$h: 150px;
.editor{
  .avatar-uploader {
    position: relative;
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
    border: 1px dashed rgb(82, 82, 82);
  }
  .ava-img{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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