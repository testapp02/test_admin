<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="姓名"  style="width: 300px;">
			<el-input v-model="form.tname"></el-input>
		</el-form-item>
		<el-form-item label="班级">
			<el-select v-model="form.cid" placeholder="请选择班级">
				<el-option :label="item.cname" :value="item.cid" v-for="item in sdatas" :key="item.cid"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="方向">
			<el-select v-model="form.fid" placeholder="请选择班级">
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
					tname:this.$route.query.tname,
					cid:this.$route.query.cname,
					tid:this.$route.query.tid,
					fid:this.$route.query.fname
				},
				sdatas:[],
				fdatas:[]
			}
		},
		methods:{
			onsubmit(){
				if(this.form.tname==""){
					this.$emit("warning","请输入老师姓名");
					return;
				}else if(this.form.cid==""){
					this.$emit("warning","请选择班级");
					return;
				}
				if(this.form.cid==this.$route.query.cname){
					this.form.cid=this.$route.query.cid;
				}
				if(this.form.fid==this.$route.query.fname){
					this.form.fid=this.$route.query.fid;
				}
				fetch("/api/te/update?tname="+this.form.tname+"&cid="+this.form.cid+"&tid="+this.form.tid+"&fid="+this.form.fid).then(function(e){
					return e.text();
				}).then((e)=>{
					if(e=="ok"){
						this.$emit("success","修改成功");
						this.$router.push("/teSelect");
					}else{
						this.$emit("err","修改失败");
					}
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