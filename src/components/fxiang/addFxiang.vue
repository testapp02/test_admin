<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="方向名称"  style="width: 300px;">
			<el-input v-model="form.fname"></el-input>
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
					fname: ''
				}
			}
		},
		methods: {
			onSubmit() {
				if(this.form.fname==""){
					this.$emit("warning","方向名称不能为空");
					return;
				}
				fetch("/api/fxiang/checkFname?fname="+this.form.fname).then(function(e){
					return e.text();
				}).then((e)=>{
					if(e=="ok"){
						fetch("/api/fxiang/add?fname="+this.form.fname).then(function(e){
							return e.text();
						}).then(function(e){
							if(e=="ok"){
								this.$emit("success","添加成功")
							}else{
								this.$emit("err","添加失败")
							}
							this.form.fname="";
						}.bind(this))
					}else{
						this.$emit("warning","该方向已存在!");
						this.form.fname="";
					}
				})
			},
			open(){
				this.form.fname="";
			}
		}
	}
</script>

<style>
	.el-form-item{
		float: left;
	}
</style>