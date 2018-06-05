<template>
	<section>
		<el-table :data="tableData" height="600" max-height="600" border style="width: 800px">
			<el-table-column prop="title" label="标题"></el-table-column>
			<el-table-column prop="msg" label="内容"></el-table-column>
    </el-table>
	</section>
</template>

<script>
	export default {
		data(){
			return {
				tableData:[]
			}
		},
		mounted(){
			
			let _this = this;
			function getSucc(res){
				console.log(res);
				// _this.makedata(res.data);
				_this.tableData = res.data;
			}
			function error(res){
				console.log(res);
			}
			this.ajax.http('get',this.host.baseUrl+'/msg',{},getSucc,error)
		}
	}

</script>

<style>

</style>