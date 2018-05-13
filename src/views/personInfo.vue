<template>
	<section>
		<h3>查找人员信息(推荐使用手机号进行查找)</h3>
		<div style="margin-top: 15px;width:600px;">
			<el-input placeholder="请输入内容" v-model="para.selectValue" class="input-with-select">
				<el-select v-model="para.selectOption" slot="prepend" placeholder="请选择" style="width:100px;">
					<el-option label="手机号" value="phone"></el-option>
					<el-option label="姓名" value="name"></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<h3 style="margin-top:20px;">查找结果</h3>
		<el-form :model="reslult" :rules="rules" ref="ruleForm" label-width="100px" style="width:500px;margin-top:20px;">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="reslult.name"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="reslult.phone"></el-input>
			</el-form-item>
			<el-form-item label="部门">
				<el-input v-model="reslult.part"></el-input>
			</el-form-item>
			<el-form-item label="个人日程">
				<el-input v-model="reslult.remark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">保存</el-button>
			</el-form-item>
		</el-form>

	</section>
</template>

<script>
export default {
  data() {
    return {
      para: {
        selectOption: "phone",
        selectValue: ""
      },
      reslult: {
        name: "",
        phone: "",
        part: "",
        remark: ""
			},
			rules: {
				name: [
					{ required: true, message: '请输人员姓名', trigger: 'blur' },
				],
				phone: [
					{ required: true, message: '请输入人员手机号', trigger: 'change' }
				]
			}

    };
  }
};
</script>

<style>

</style>