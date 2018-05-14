<template>
	<section>
		<h3>页面展示模块</h3>
		<div class="modules" style="width:1050px;">
			<div class="module" v-for="(item,index) in modules" :key="index">
				<span>{{item.name}}</span>
				<el-switch v-model="item.show"></el-switch>
			</div>
		</div>
		<el-button type="primary" style="margin-top:30px;width:100px;" @click="submit">保存</el-button>
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
			submit(){
				let data = {
					dataid:this.dataid,
					modules:this.modules
				}
				// console.log(data);
				this.ajax.http('put',this.host.baseUrl+'/modules',data,this.getModules,this.error)
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
		width: 80px;
	}
}
</style>