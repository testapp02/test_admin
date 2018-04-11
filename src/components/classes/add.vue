<template>
	<div class="box">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="班级名称">
				<el-input v-model="form.cname"></el-input>
			</el-form-item>
			<el-form-item label="班级类型">
				<el-select v-model="form.fid" placeholder="请选择班级类型">
					<el-option :label="item.fname" :value="item.fid" v-for="item in fdatas" :key="item.fid"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button @click="open">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				form:{
					cname:"",
					fid:""
				},
				fdatas:[]
			}
		},
		mounted(){
			fetch("/api/fxiang/select").then(function(e){
				return e.json();
			}).then((e)=>{
				if(e.message!="err"){
					this.fdatas=e;
				}
			})
		},
		methods:{
			onSubmit(){
				if(this.form.cname==""){
					this.$emit("warning","班级名称未输入!");
					return;
				}else if(this.form.fid==""){
					this.$emit("warning","请选择方向!");
					return;
				}
				fetch("/api/classes/add?cname="+this.form.cname+"&fid="+this.form.fid).then(function(e){
					return e.text();
				}).then(function(e){
					if(e=="ok"){
						this.$emit("success","添加成功");
					}else{
						this.$emit("err","添加失败");
					}
					this.form.cname="";
					this.form.fid="";
				}.bind(this));
			},
			open(){
				this.form.cname="";
				this.form.fid="";
			}
		}
	}
</script>

<style scoped="scoped">
	.box {
		width: 300px;
	}
</style>