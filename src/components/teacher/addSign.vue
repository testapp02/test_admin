<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="老师姓名"  style="width: 300px;">
			<el-input v-model="form.tname"></el-input>
		</el-form-item>
		<el-form-item label="所在班级">
			<el-select v-model="form.cid" placeholder="请选择班级">
				<el-option :label="item.cname" :value="item.cid" v-for="item in sdatas" :key="item.cid"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="所带方向">
			<el-select v-model="form.fid" placeholder="请选择方向">
				<el-option :label="item.fname" :value="item.fid" v-for="item in fdatas" :key="item.fid"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onsubmit">提交</el-button>
			<el-button @click="open">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default{
		data(){
			return {
				form:{
					tname:"",
					cid:"",
					tid:""
				},
				sdatas:[],
				fdatas:[]
			}
		},
		methods:{
			onsubmit(){
				if(this.form.sname==""){
					this.$emit("warning","请输入学生姓名");
					return;
				}else if(this.form.cid==""){
					this.$emit("warning","请选择班级");
					return;
				}
				fetch("/api/te/addSingle?tname="+this.form.tname+"&cid="+this.form.cid+"&fid="+this.form.fid).then(function(e){
					return e.text();
				}).then((e)=>{
					if(e=="ok"){
						this.$emit("success","添加成功");
					}else{
						this.$emit("err","添加失败");
					}
					this.form.tname="";
					this.form.cid="";
					this.form.fid="";
				});
				
			},
			open(){
				this.$router.push("/teSelect");
			}
		},
		mounted(){
			fetch("/api/classes/select").then(function(e){
				return e.json();
			}).then(function(e){
				this.sdatas=e;
			}.bind(this));
			fetch("/api/fxiang/select").then(function(e){
				return e.json();
			}).then(function(e){
				this.fdatas=e;
			}.bind(this));
		}
	}
</script>

<style>
</style>