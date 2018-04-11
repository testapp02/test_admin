<template>
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="学生姓名"  style="width: 300px;">
			<el-input v-model="form.sname"></el-input>
		</el-form-item>
		<el-form-item label="班级类型">
			<el-select v-model="form.cid" placeholder="请选择班级">
				<el-option :label="item.cname" :value="item.cid" v-for="item in sdatas" :key="item.cid"></el-option>
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
					sname:this.$route.query.sname,
					cid:this.$route.query.cname,
					sid:this.$route.query.sid
				},
				sdatas:[]
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
				if(this.form.cid==this.$route.query.cname){
					this.form.cid=this.$route.query.cid;
				}
				fetch("/api/stu/update?sname="+this.form.sname+"&cid="+this.form.cid+"&sid="+this.form.sid).then(function(e){
					return e.text();
				}).then((e)=>{
					if(e=="ok"){
						this.$emit("success","修改成功");
						this.$router.push("/stuSelect");
					}else{
						this.$emit("err","修改失败");
					}
				});
				
			},
			open(){
				this.$router.push("/stuSelect");
			}
		},
		mounted(){
			fetch("/api/classes/select").then(function(e){
				return e.json();
			}).then(function(e){
				this.sdatas=e;
			}.bind(this));
		}
	}
</script>

<style>
</style>