<template>
	<section class="living-room">
		<el-form label-width="100px">
			<div class="living-room-item">
				<el-form-item label="直播间名称">
					<el-input style="width:400px;"></el-input>
					<el-button type="danger" icon="el-icon-delete" circle style="margin-left:10px;"></el-button>
				</el-form-item>
				<el-form-item label="链接地址">
					<el-input style="width:400px;"></el-input>
				</el-form-item>
			</div>
			
			<el-button type="primary">添加直播间入口</el-button>
			<el-button type="primary">保存</el-button>
		</el-form>
	</section>
</template>

<script>

	export default {
		data() {
			return {

			}
		},
		methods:{

		}
	}

</script>

<style lang="scss">
.living-room{
	position: relative;
	&-list{
		position: relative;
		list-style: none;
	}
}
</style>