<template>
	<section>
		<h3>会议/活动</h3>
		<el-select v-model="meeting" placeholder="请选择" style="width:400px;">
			<el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="index">
			</el-option>
		</el-select>
		<h3>现场图片（为了保证页面加载速度，图片请不要超过1M）</h3>
		<el-upload class="avatar-uploader" action="//up.qbox.me/" :show-file-list="false" :data="uploadform" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
			<img v-if="img" :src="img" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<h3>文字</h3>
		<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="text" style="width:600px;"></el-input>
		<br>
		<el-button type="primary" style="margin-top:30px;width:100px;" @click="submit">{{isPublish ? '发布' : '保存'}}</el-button>

		<el-button type="primary" style="margin-top:30px;width:200px;" @click="getGridData">修改已经发布的内容</el-button>

		<el-dialog :title="`${options[meeting - 0].label} 已经发布的内容`" :visible.sync="dialogTableVisible">
			<el-table :data="gridData">
				<el-table-column property="img" label="图片" width="200">
					<template slot-scope="scope">
						<div style="width:150px;height:120px;">
							<img :src="scope.row.img" style="width:100%;height:100%;object-fit: contain;" alt="">
						</div>
					</template>
				</el-table-column>
				<el-table-column property="text" label="文字"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="putClick(scope.row)" type="text" size="small">修改</el-button>
						<el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</section>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				options: [
					{
						label: '2018中国（石家庄）“互联网+旅游”特色小镇峰会'
					}, {
						label: '第二届石家庄市旅游产业发展大会开幕式'
					}, {
						label: '大型实景演出'
					}, {
						label: '旅游项目线路观摩'
					}, {
						label: '石家庄市创建全域旅游示范市工作推进会'
					}, {
						label: '第五届石家庄旅游交易会'
					}, {
						label: '《全民导游》颁奖典礼'
					}
				],
				gridData: [],
        meeting: 0,
				img:'',
				text:'',
				isPublish: true,
				putDataId:'',
				dialogTableVisible:false,
				uploadform: {
					key:'',
					token: ''
				}
			};
		},
		methods:{
			handleAvatarSuccess(response, file, fileList) {
        this.img = `${this.host.imgBaseUrl}${response.key}`;
			},
			beforeAvatarUpload(file) {
				let isLt2M = file.size / 1024 / 1024 < 1;
				let _this = this;

				if (!isLt2M) {
					_this.$message.error("上传图片大小不能超过 1MB!");
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
			succ(res){
				this.$message({
          message: '操作成功！',
          type: 'success'
				});
				
				this.img = '';
				this.text = '';
				this.putDataId = '';
				this.isPublish = true;
			},
			error(res){
				console.log(res)
			},
			submit(){
				if(this.img.length !=0 || this.text != 0){

					let data = {
						meeting: this.meeting,
						img: this.img,
						text: this.text
					}
					if(this.isPublish){
						this.ajax.http('post',this.host.baseUrl+'/livingmsg',data,this.succ,this.error)
					}else{
						data._id = this.putDataId;
						this.ajax.http('put',this.host.baseUrl+'/livingmsg',data,this.succ,this.error)
					}
					
				}else{
					this.$message({
						message: '请至少上传图片或者填写文字',
						type: 'error'
					});
				}
				
			},
			getGridData(){
				this.getMsg();
			},
			getMsg(){
				let _this = this;
				function succ(res){
					_this.gridData = res.data;
					_this.dialogTableVisible = true;
				}

				this.ajax.http('get',this.host.baseUrl+'/livingmsg',{meeting:this.meeting},succ,this.error)
			},
			putClick(item){
				this.img = item.img;
				this.text = item.text;
				this.putDataId = item._id;
				this.isPublish = false;
				this.dialogTableVisible = false;
			},
			deleteClick(item){
				this.ajax.http('delete',this.host.baseUrl+'/livingmsg',{_id:item._id},this.getMsg,this.error)
			}
		}
	}

</script>

<style>
.avatar-uploader{
	width: 300px;
	height: 200px;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 300px;
	height: 200px;
	line-height: 200px;
	text-align: center;
	border: 1px dashed #8c939d;
}
.el-upload{
	width: 300px;
	height: 200px;
}
.avatar {
	width: 300px;
	height: 200px;
	object-fit: contain;
}
</style>