<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="类型名称" style="width: 300px;">
			<el-input v-model="form.typename"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">提交</el-button>
			<el-button @click="open">取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					typename: ''
				}
			}
		},
		methods: {
			onSubmit() {
				if(this.form.typename == "") {
					this.$emit("warning", "类型名称不能为空");
					return;
				}
				fetch("/api/test/addType?typename=" + this.form.typename).then(function(e) {
					return e.text();
				}).then(function(e) {
					if(e == "ok") {
						this.$emit("success", "添加成功")
					} else {
						this.$emit("err", "添加失败")
					}
					this.form.typename = "";
				}.bind(this))
			},
			open() {
				this.$router.push("/selectType");
			}
		}
	}
</script>

<style>
	.el-form-item {
		float: left;
	}
</style>