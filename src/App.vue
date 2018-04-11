<template>
  <div id="app">
    <router-view @err="err" @success="success" @warning="warning" @info="info" @sure="sure"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
  	err(info){
  		this.$notify.error({
         title: '错误',
         message: info
       });
  	},
  	success(info){
  		this.$notify({
          title: '成功',
          message: info,
          type: 'success'
        });
  	},
  	warning(info){
  		 this.$notify({
          title: '警告',
          message: info,
          type: 'warning'
        });
  	},
  	info(info){
  		 this.$notify.info({
          title: '消息',
          message: info
        });
  	},
  	sure(info,callback){
  		var info1="";
  		if(info=="del"){
  			info1="此信息将被永久删除!";
  		}else if(info==""){
  			return;
  		}else{
  			info1=info;
  		}
  		this.$confirm(info1, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	callback(function(info="success",infoStr="删除"){
        		var str="";
        		if(info=="success"){
        			str=infoStr+"成功!";
		          this.$message({
		        		type: "success",
	    	      	message: str
	      	    });
        		}else{
        			str=infoStr+"失败!";
		          this.$message.error(str);
        		}
        	}.bind(this));
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  	}
  }
}
</script>

<style>
	*{
		margin: 0;padding: 0;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
	}
</style>
