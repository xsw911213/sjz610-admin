<template>
	<section>
		<h3>查找人员信息(推荐使用手机号进行查找)</h3>
		<div style="margin-top: 15px;width:600px;">
			<el-input placeholder="请输入内容" v-model="para.selectValue" class="input-with-select">
				<el-select v-model="para.selectOption" slot="prepend" placeholder="请选择" style="width:100px;">
					<el-option label="手机号" value="tel"></el-option>
					<!-- <el-option label="姓名" value="name"></el-option> -->
				</el-select>
				<el-button slot="append" icon="el-icon-search" @click="getPersonData(para.selectValue)"></el-button>
			</el-input>
		</div>
		<h3 style="margin-top:20px;">查找结果</h3>
		<el-form :model="reslult" :rules="rules" ref="ruleForm" label-width="100px" style="width:500px;margin-top:20px;">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="reslult.name"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="tel">
				<el-input v-model="reslult.tel"></el-input>
			</el-form-item>
			<el-form-item label="部门">
				<el-input v-model="reslult.part"></el-input>
			</el-form-item>
			<el-form-item label="个人日程">
				<el-input type="textarea" v-model="reslult.remark"></el-input>
				<p style="font-size:14px;color:#999;margin:0;padding:0;">请按照约定格式输入</p>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="putPersonData">修改</el-button>
			</el-form-item>
		</el-form>

	</section>
</template>

<script>
export default {
  data() {
    return {
      para: {
        selectOption: "tel",
        selectValue: ""
      },
      reslult: {
        name: "",
        tel: "",
        part: "",
        remark: ""
			},
			rules: {
				name: [
					{ required: true, message: '请输人员姓名', trigger: 'blur' },
				],
				tel: [
					{ required: true, message: '请输入人员手机号', trigger: 'change' }
				]
			}

    };
  },
	methods:{
		getSucc(res){
			console.log(res);
			let data = res.data[0];
			if(data){
				this.reslult = data;
			}else{
				this.$message({
					message: '请输入正确的手机号',
					type: 'error'
				});
			}
			
		},
		putSucc(res){
			console.log(res);
			this.$message({
				message: '修改成功',
				type: 'success'
			});
		},
		error(res){
			console.log(res)
		},
		getPersonData(tel){
			this.ajax.http('get',this.host.baseUrl+'/persondata',{tel},this.getSucc,this.error)
		},
		putPersonData(){
			this.ajax.http('put',this.host.baseUrl+'/persondata',this.reslult,this.putSucc,this.error)
		},
	}
};
</script>

<style>

</style>