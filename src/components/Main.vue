<template>
	<el-container>
  <el-header>欢迎来到考试系统</el-header>
  <el-container class="box">
    <el-aside width="250px">
    	<Meu></Meu>
    </el-aside>
    <el-main style="text-align: left;padding: 10px;">
    	<router-view :name="a" @warning="warning" @success="success" @err="err" @info="info" @sure="sure"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
	import Meu from "@/components/Meu";
	export default{
		name:"mains",
		components:{
			Meu	
		},
		data(){
			return {
				a:"Welcome"
			}
		},
		watch:{
			$route(to,from){
				this.a=to.params.flag
			}
		},
		beforeRouteEnter (to, from, next) {
			next(function(mains){
				if(to.path=="/"){
					mains.a="Welcome";
					return;
				}
				mains.a=to.params.flag;
			});
		},
		methods:{
			warning(info){
				this.$emit("warning",info);
			},
			success(info){
				this.$emit("success",info)
			},
			info(info){
				this.$emit("info",info);
			},
			err(info){
				this.$emit("err",info)
			},
			sure(info,callback){
				this.$emit("sure",info,callback);
			}
		}
	}
</script>

<style scoped="scoped">
	.box{
		height: 90vh;
	}
	.el-header{
    background-color: #B3C0D1;
    color: #333;
    height: 10vh !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>