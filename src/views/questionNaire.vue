<template>
	<section>
		
	</section>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		mounted(){
			let _this = this;
			function getSucc(res){
				_this.makedata(res.data);
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