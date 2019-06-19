<template>
	<section>
		<h3>展示模块</h3>
		<div class="modules" style="width:1050px;">
			<div class="module" v-for="(item,index) in modules" :key="index">
				<span>{{item.name}}</span>
				<el-switch v-model="item.show"></el-switch>
			</div>
		</div>
		<el-button type="primary" style="margin-top:30px;width:100px;" @click="submit">保存</el-button>
		<h3 style="margin-top:60px;">总体访问数据（截止6月30日）</h3>
		<p style="margin-top:40px;font-size:16px;">UV(访问人数) ：<span style="font-size:18px;color:red;">97693</span></p>
		<p style="margin-top:20px;font-size:16px;">PV(访问量) &nbsp;&nbsp;&nbsp;&nbsp;：<span style="font-size:18px;color:red;">175683</span></p>
	</section>
</template>

<script>
	export default {
		data (){
			return{
				modules:[],
				dataid:''
			}
		},
		methods:{
			succ(res){
				this.modules = res.data.modules;
				this.dataid = res.data.dataid
			},
			error(res){
				console.log(res)
			},
			getModules(){
				this.ajax.http('get',this.host.baseUrl+'/modules',{},this.succ,this.error)
			},
			subSucc (res){
				this.$notify({
					title: '保存成功',
					message: '保存成功',
					type: 'success'
				});
				this.getModules()
			},
			submit(){
				let data = {
					dataid:this.dataid,
					modules:this.modules
				}
				// console.log(data);
				this.ajax.http('put',this.host.baseUrl+'/modules',data,this.subSucc,this.error)
			}
		},
		mounted(){
			this.getModules();
		}
	}

</script>

<style lang='scss'>
.module{
	display: inline-block;
	width: 200px;
	margin-top: 20px;

	span{
		display: inline-block;
		width: 90px;
	}
}
</style>